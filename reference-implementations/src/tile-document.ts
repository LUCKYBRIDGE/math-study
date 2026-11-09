export interface Vec2 { x: number; y: number; }

export interface Tile {
  id: string;
  type: string;
  position: Vec2;
  rotation: number;
  flipped: boolean;
  layer: number;
  props: Readonly<Record<string, unknown>>;
}

export interface Stroke {
  id: string;
  points: readonly Vec2[];
  width: number;
  props: Readonly<Record<string, unknown>>;
}

export interface MathDocument {
  version: 1;
  tiles: Record<string, Tile>;
  strokes: Record<string, Stroke>;
  options: Readonly<Record<string, unknown>>;
}

export interface ViewportState {
  x: number;
  y: number;
  zoom: number;
}

export class TileDocumentStore {
  private state: MathDocument;
  private viewport: ViewportState = { x: 0, y: 0, zoom: 1 };

  constructor(initial?: MathDocument) {
    this.state = initial ? structuredClone(initial) : {
      version: 1,
      tiles: {},
      strokes: {},
      options: {}
    };
  }

  get document(): Readonly<MathDocument> { return this.state; }
  get view(): Readonly<ViewportState> { return this.viewport; }

  addTile(tile: Tile): void {
    if (this.state.tiles[tile.id]) throw new Error(`Duplicate tile: ${tile.id}`);
    this.state.tiles[tile.id] = structuredClone(tile);
  }

  updateTile(id: string, patch: Partial<Omit<Tile, "id" | "type">>): void {
    const current = this.state.tiles[id];
    if (!current) throw new Error(`Unknown tile: ${id}`);
    this.state.tiles[id] = { ...current, ...structuredClone(patch) };
  }

  removeTile(id: string): void {
    delete this.state.tiles[id];
  }

  addStroke(stroke: Stroke): void {
    this.state.strokes[stroke.id] = structuredClone(stroke);
  }

  setViewport(viewport: ViewportState): void {
    if (!(viewport.zoom > 0)) throw new Error("zoom must be positive");
    this.viewport = { ...viewport };
  }

  serializeDocument(): string {
    return JSON.stringify(this.state);
  }

  loadDocument(serialized: string): void {
    const parsed = JSON.parse(serialized) as Partial<MathDocument>;
    if (parsed.version !== 1 || !parsed.tiles || !parsed.strokes) {
      throw new Error("Unsupported or invalid document");
    }
    this.state = structuredClone(parsed as MathDocument);
  }
}
