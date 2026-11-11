export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export type Mat4 = readonly [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number
];

export interface Face {
  id: string;
  vertices: readonly Vec3[];
}

export interface Hinge {
  id: string;
  parentFaceId: string;
  childFaceId: string;
  axisStartInParent: Vec3;
  axisEndInParent: Vec3;
  flatChildToParent: Mat4;
  foldedAngleDeg: number;
}

export interface NetModel {
  rootFaceId: string;
  faces: Readonly<Record<string, Face>>;
  hinges: readonly Hinge[];
}

export const IDENTITY: Mat4 = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
];

export function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export function multiplyMat4(a: Mat4, b: Mat4): Mat4 {
  const out = new Array<number>(16).fill(0);
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 4; row++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) {
        sum += a[k * 4 + row]! * b[col * 4 + k]!;
      }
      out[col * 4 + row] = sum;
    }
  }
  return out as unknown as Mat4;
}

export function translation(v: Vec3): Mat4 {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    v.x, v.y, v.z, 1
  ];
}

export function rotationZ(angleRad: number): Mat4 {
  const c = Math.cos(angleRad);
  const s = Math.sin(angleRad);
  return [
    c, s, 0, 0,
    -s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
}

export function rotationAxis(axis: Vec3, angleRad: number): Mat4 {
  const length = Math.hypot(axis.x, axis.y, axis.z);
  if (length === 0) throw new Error('Rotation axis must have non-zero length');

  const x = axis.x / length;
  const y = axis.y / length;
  const z = axis.z / length;
  const c = Math.cos(angleRad);
  const s = Math.sin(angleRad);
  const t = 1 - c;

  return [
    t * x * x + c,      t * x * y + s * z,  t * x * z - s * y, 0,
    t * x * y - s * z,  t * y * y + c,      t * y * z + s * x, 0,
    t * x * z + s * y,  t * y * z - s * x,  t * z * z + c,     0,
    0,                  0,                  0,                  1
  ];
}

export function rotationAroundLine(start: Vec3, end: Vec3, angleRad: number): Mat4 {
  const axis = {
    x: end.x - start.x,
    y: end.y - start.y,
    z: end.z - start.z
  };
  return multiplyMat4(
    translation(start),
    multiplyMat4(
      rotationAxis(axis, angleRad),
      translation({ x: -start.x, y: -start.y, z: -start.z })
    )
  );
}

export function transformPoint(matrix: Mat4, point: Vec3): Vec3 {
  return {
    x: matrix[0] * point.x + matrix[4] * point.y + matrix[8] * point.z + matrix[12],
    y: matrix[1] * point.x + matrix[5] * point.y + matrix[9] * point.z + matrix[13],
    z: matrix[2] * point.x + matrix[6] * point.y + matrix[10] * point.z + matrix[14]
  };
}

/**
 * Creates a rigid 2D transform that maps fromA->fromB onto toA->toB.
 * All points are interpreted in the z=0 plane.
 */
export function alignEdge2D(fromA: Vec3, fromB: Vec3, toA: Vec3, toB: Vec3): Mat4 {
  const fromAngle = Math.atan2(fromB.y - fromA.y, fromB.x - fromA.x);
  const toAngle = Math.atan2(toB.y - toA.y, toB.x - toA.x);
  const r = rotationZ(toAngle - fromAngle);
  const rotatedFromA = transformPoint(r, fromA);
  return multiplyMat4(
    translation({
      x: toA.x - rotatedFromA.x,
      y: toA.y - rotatedFromA.y,
      z: toA.z - rotatedFromA.z
    }),
    r
  );
}

/**
 * Computes a world transform for every face.
 * foldProgress: 0 = fully flat net, 1 = fully folded solid.
 */
export function computeFaceTransforms(
  model: NetModel,
  foldProgress: number
): Readonly<Record<string, Mat4>> {
  if (!model.faces[model.rootFaceId]) {
    throw new Error('Unknown root face: ' + model.rootFaceId);
  }

  const progress = clamp01(foldProgress);
  const transforms: Record<string, Mat4> = {
    [model.rootFaceId]: IDENTITY
  };

  const childrenByParent = new Map<string, Hinge[]>();
  for (const hinge of model.hinges) {
    if (!model.faces[hinge.parentFaceId] || !model.faces[hinge.childFaceId]) {
      throw new Error('Hinge ' + hinge.id + ' references an unknown face');
    }
    const list = childrenByParent.get(hinge.parentFaceId) ?? [];
    list.push(hinge);
    childrenByParent.set(hinge.parentFaceId, list);
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();

  const visit = (faceId: string): void => {
    if (visiting.has(faceId)) throw new Error('Hinge graph contains a cycle');
    if (visited.has(faceId)) return;
    visiting.add(faceId);

    const parentWorld = transforms[faceId];
    if (!parentWorld) throw new Error('Missing transform for face ' + faceId);

    for (const hinge of childrenByParent.get(faceId) ?? []) {
      if (transforms[hinge.childFaceId]) {
        throw new Error('Face ' + hinge.childFaceId + ' has multiple hinge parents');
      }

      const hingeRotation = rotationAroundLine(
        hinge.axisStartInParent,
        hinge.axisEndInParent,
        hinge.foldedAngleDeg * progress * Math.PI / 180
      );

      transforms[hinge.childFaceId] = multiplyMat4(
        parentWorld,
        multiplyMat4(hingeRotation, hinge.flatChildToParent)
      );

      visit(hinge.childFaceId);
    }

    visiting.delete(faceId);
    visited.add(faceId);
  };

  visit(model.rootFaceId);

  if (Object.keys(transforms).length !== Object.keys(model.faces).length) {
    const missing = Object.keys(model.faces).filter(id => !transforms[id]);
    throw new Error('Disconnected faces: ' + missing.join(', '));
  }

  return transforms;
}

export function worldFaceVertices(
  model: NetModel,
  transforms: Readonly<Record<string, Mat4>>
): Readonly<Record<string, readonly Vec3[]>> {
  const result: Record<string, readonly Vec3[]> = {};
  for (const face of Object.values(model.faces)) {
    const transform = transforms[face.id];
    if (!transform) throw new Error('Missing transform for face ' + face.id);
    result[face.id] = face.vertices.map(vertex => transformPoint(transform, vertex));
  }
  return result;
}
