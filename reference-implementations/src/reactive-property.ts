export type Unsubscribe = () => void;

export class Property<T> {
  private listeners = new Set<(value: T, previous: T) => void>();

  constructor(private current: T) {}

  get value(): T { return this.current; }

  set value(next: T) {
    if (Object.is(this.current, next)) return;
    const previous = this.current;
    this.current = next;
    for (const listener of this.listeners) listener(next, previous);
  }

  subscribe(listener: (value: T, previous: T) => void, emitCurrent = false): Unsubscribe {
    this.listeners.add(listener);
    if (emitCurrent) listener(this.current, this.current);
    return () => this.listeners.delete(listener);
  }
}

export class DerivedProperty<T> {
  private readonly internal: Property<T>;
  private readonly unsubs: Unsubscribe[];

  constructor(
    dependencies: readonly Property<unknown>[],
    private readonly compute: () => T
  ) {
    this.internal = new Property(compute());
    this.unsubs = dependencies.map(dep => dep.subscribe(() => {
      this.internal.value = this.compute();
    }));
  }

  get value(): T { return this.internal.value; }

  subscribe(listener: (value: T, previous: T) => void, emitCurrent = false): Unsubscribe {
    return this.internal.subscribe(listener, emitCurrent);
  }

  dispose(): void {
    for (const unsub of this.unsubs) unsub();
  }
}
