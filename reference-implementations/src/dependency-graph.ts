export interface MathObject<T = unknown> {
  id: string;
  kind: string;
  value: T;
  revision: number;
}

export interface AlgorithmContext {
  read<T = unknown>(id: string): MathObject<T>;
}

export interface AlgorithmNode {
  id: string;
  inputs: readonly string[];
  outputs: readonly string[];
  compute(context: AlgorithmContext): Readonly<Record<string, unknown>>;
}

export class DependencyGraph {
  private readonly objects = new Map<string, MathObject>();
  private readonly algorithms = new Map<string, AlgorithmNode>();
  private readonly dependentAlgorithms = new Map<string, Set<string>>();

  addObject<T>(object: Omit<MathObject<T>, "revision"> & { revision?: number }): void {
    if (this.objects.has(object.id)) throw new Error(`Duplicate object: ${object.id}`);
    this.objects.set(object.id, { ...object, revision: object.revision ?? 0 });
  }

  addAlgorithm(algorithm: AlgorithmNode): void {
    if (this.algorithms.has(algorithm.id)) throw new Error(`Duplicate algorithm: ${algorithm.id}`);
    for (const id of [...algorithm.inputs, ...algorithm.outputs]) {
      if (!this.objects.has(id)) throw new Error(`Unknown object ${id} in ${algorithm.id}`);
    }
    this.algorithms.set(algorithm.id, algorithm);
    for (const input of algorithm.inputs) {
      let set = this.dependentAlgorithms.get(input);
      if (!set) this.dependentAlgorithms.set(input, set = new Set());
      set.add(algorithm.id);
    }
    this.recomputeAlgorithm(algorithm);
  }

  get<T = unknown>(id: string): MathObject<T> {
    const object = this.objects.get(id);
    if (!object) throw new Error(`Unknown object: ${id}`);
    return object as MathObject<T>;
  }

  update<T>(id: string, value: T): void {
    const object = this.get<T>(id);
    object.value = value;
    object.revision++;
    this.recomputeFrom([id]);
  }

  snapshot(): MathObject[] {
    return [...this.objects.values()].map(object => structuredClone(object));
  }

  private recomputeFrom(changedIds: readonly string[]): void {
    const queue: string[] = [];
    const queued = new Set<string>();

    for (const id of changedIds) {
      for (const algorithmId of this.dependentAlgorithms.get(id) ?? []) {
        queue.push(algorithmId);
        queued.add(algorithmId);
      }
    }

    let safety = 0;
    while (queue.length > 0) {
      if (++safety > 100_000) throw new Error("Dependency cycle or runaway recomputation");
      const algorithmId = queue.shift()!;
      queued.delete(algorithmId);
      const algorithm = this.algorithms.get(algorithmId)!;
      const changedOutputs = this.recomputeAlgorithm(algorithm);

      for (const outputId of changedOutputs) {
        for (const nextId of this.dependentAlgorithms.get(outputId) ?? []) {
          if (!queued.has(nextId)) {
            queue.push(nextId);
            queued.add(nextId);
          }
        }
      }
    }
  }

  private recomputeAlgorithm(algorithm: AlgorithmNode): string[] {
    const result = algorithm.compute({ read: <T>(id: string) => this.get<T>(id) });
    const changed: string[] = [];

    for (const outputId of algorithm.outputs) {
      if (!(outputId in result)) throw new Error(`${algorithm.id} did not compute ${outputId}`);
      const output = this.get(outputId);
      const next = result[outputId];
      if (!Object.is(output.value, next)) {
        output.value = next;
        output.revision++;
        changed.push(outputId);
      }
    }
    return changed;
  }
}

export interface Point2 {
  x: number;
  y: number;
}

export function midpointAlgorithm(
  id: string,
  aId: string,
  bId: string,
  midpointId: string
): AlgorithmNode {
  return {
    id,
    inputs: [aId, bId],
    outputs: [midpointId],
    compute: ({ read }) => {
      const a = read<Point2>(aId).value;
      const b = read<Point2>(bId).value;
      return {
        [midpointId]: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } satisfies Point2
      };
    }
  };
}
