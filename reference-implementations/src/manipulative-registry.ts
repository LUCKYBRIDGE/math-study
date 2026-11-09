export interface PointerLike {
  x: number;
  y: number;
}

export interface ManipulativeContext<S> {
  state: S;
  update(mutator: (draft: S) => void): void;
}

export interface ManipulativeDefinition<S> {
  type: string;
  createInitialState(): S;
  hitTest(state: S, point: PointerLike): string | null;
  pointerDown?(context: ManipulativeContext<S>, point: PointerLike): void;
  pointerMove?(context: ManipulativeContext<S>, point: PointerLike): void;
  pointerUp?(context: ManipulativeContext<S>, point: PointerLike): void;
  serialize(state: S): unknown;
  deserialize(data: unknown): S;
}

export class ManipulativeRegistry {
  private readonly definitions = new Map<string, ManipulativeDefinition<unknown>>();

  register<S>(definition: ManipulativeDefinition<S>): void {
    if (this.definitions.has(definition.type)) {
      throw new Error(`Manipulative already registered: ${definition.type}`);
    }
    this.definitions.set(definition.type, definition as ManipulativeDefinition<unknown>);
  }

  get<S>(type: string): ManipulativeDefinition<S> {
    const definition = this.definitions.get(type);
    if (!definition) throw new Error(`Unknown manipulative: ${type}`);
    return definition as ManipulativeDefinition<S>;
  }

  types(): string[] {
    return [...this.definitions.keys()];
  }
}

export interface FractionBarState {
  denominator: number;
  selectedParts: Set<number>;
}

export const fractionBarDefinition: ManipulativeDefinition<FractionBarState> = {
  type: "fraction-bar",
  createInitialState: () => ({ denominator: 4, selectedParts: new Set() }),
  hitTest: (state, point) => {
    if (point.x < 0 || point.x > 1 || point.y < 0 || point.y > 1) return null;
    return String(Math.min(state.denominator - 1, Math.floor(point.x * state.denominator)));
  },
  pointerDown: (context, point) => {
    const indexText = fractionBarDefinition.hitTest(context.state, point);
    if (indexText === null) return;
    const index = Number(indexText);
    context.update(state => {
      state.selectedParts.has(index)
        ? state.selectedParts.delete(index)
        : state.selectedParts.add(index);
    });
  },
  serialize: state => ({
    denominator: state.denominator,
    selectedParts: [...state.selectedParts]
  }),
  deserialize: data => {
    const value = data as { denominator: number; selectedParts: number[] };
    return {
      denominator: value.denominator,
      selectedParts: new Set(value.selectedParts)
    };
  }
};
