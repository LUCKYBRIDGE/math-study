export type RendererKind = "dom" | "svg" | "canvas" | "webgl";

export interface Transform2D {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
}

export class SceneNode {
  readonly children: SceneNode[] = [];
  readonly parents = new Set<SceneNode>();
  visible = true;
  opacity = 1;
  renderer: RendererKind | "auto" = "auto";
  transform: Transform2D = { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0 };

  constructor(readonly id: string) {}

  addChild(child: SceneNode): void {
    if (child === this || child.hasDescendant(this)) {
      throw new Error("Scene graph cycles are not allowed");
    }
    if (!this.children.includes(child)) {
      this.children.push(child);
      child.parents.add(this);
    }
  }

  removeChild(child: SceneNode): void {
    const index = this.children.indexOf(child);
    if (index >= 0) {
      this.children.splice(index, 1);
      child.parents.delete(this);
    }
  }

  hasDescendant(candidate: SceneNode): boolean {
    const visited = new Set<SceneNode>();
    const stack = [...this.children];
    while (stack.length) {
      const node = stack.pop()!;
      if (node === candidate) return true;
      if (visited.has(node)) continue;
      visited.add(node);
      stack.push(...node.children);
    }
    return false;
  }
}
