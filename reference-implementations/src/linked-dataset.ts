export interface CaseRecord {
  id: string;
  values: Readonly<Record<string, string | number | boolean | null>>;
}

export type AttributeRole = "x" | "y" | "color" | "label";

export class LinkedDataSet {
  private cases = new Map<string, CaseRecord>();
  private selected = new Set<string>();
  private selectionListeners = new Set<(ids: ReadonlySet<string>) => void>();
  private roles = new Map<AttributeRole, string>();

  constructor(records: readonly CaseRecord[] = []) {
    for (const record of records) this.cases.set(record.id, structuredClone(record));
  }

  records(): CaseRecord[] {
    return [...this.cases.values()];
  }

  getSelection(): ReadonlySet<string> {
    return this.selected;
  }

  setSelection(ids: Iterable<string>): void {
    const next = new Set([...ids].filter(id => this.cases.has(id)));
    this.selected = next;
    this.emitSelection();
  }

  toggleSelection(id: string): void {
    if (!this.cases.has(id)) return;
    this.selected.has(id) ? this.selected.delete(id) : this.selected.add(id);
    this.emitSelection();
  }

  onSelection(listener: (ids: ReadonlySet<string>) => void): () => void {
    this.selectionListeners.add(listener);
    return () => this.selectionListeners.delete(listener);
  }

  assignRole(role: AttributeRole, attribute: string): void {
    const exists = this.records().some(record => attribute in record.values);
    if (!exists) throw new Error(`Unknown attribute: ${attribute}`);
    this.roles.set(role, attribute);
  }

  role(role: AttributeRole): string | undefined {
    return this.roles.get(role);
  }

  private emitSelection(): void {
    const readonlySelection = new Set(this.selected);
    for (const listener of this.selectionListeners) listener(readonlySelection);
  }
}
