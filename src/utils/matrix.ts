export type Matrix2D = [number, number, number, number]
export type Vector2D = [number, number]
export type Vector3D = [number, number, number]
export type TransformMatrix2D = [number, number, number, number, number, number]
export type Matrix3D = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
]

export const IdentityMatrix2D: Matrix2D = [1, 0, 0, 1]
export const IdentityTransformMatrix2D = [
  ...IdentityMatrix2D,
  0,
  0,
] as TransformMatrix2D

export const getIdentityTransformMatrix2D = () =>
  [...IdentityTransformMatrix2D] as TransformMatrix2D

/**
 * limited revert, only apply for transform 2D matrix
 * @param m
 */
export const revertMatrix = (m: TransformMatrix2D): TransformMatrix2D => [
  m[0],
  m[1],
  m[2],
  m[3],
  -m[4],
  -m[5],
]

export const multiplyMatrixVector = (
  m: TransformMatrix2D,
  v: Vector3D
): Vector2D => [
  m[0] * v[0] + m[2] * v[1] + m[4] * v[2],
  m[1] * v[0] + m[3] * v[1] + m[5] * v[2],
]

export const multiplyMatrices = (
  a: TransformMatrix2D,
  b: TransformMatrix2D
): TransformMatrix2D => [
  ...multiplyMatrixVector(a, [b[0], b[1], 0]),
  ...multiplyMatrixVector(a, [b[2], b[3], 0]),
  ...multiplyMatrixVector(a, [b[4], b[5], 1]),
]

// transform: `matrix3d(${matrix[0]},${matrix[1]},0,0,${matrix[2]},${matrix[3]},0,0,0,0,1,0,${matrix[4]},${matrix[5]},0,1)`,
export const convertTransformMatrix2D3D = (
  matrix: TransformMatrix2D
): Matrix3D => [
  matrix[0],
  matrix[1],
  0,
  0,
  matrix[2],
  matrix[3],
  0,
  0,
  0,
  0,
  1,
  0,
  matrix[4],
  matrix[5],
  0,
  1,
]

// 二维向量叉积
export const dotProduct2D = (v1: Vector2D, v2: Vector2D) =>
  v1[0] * v2[0] + v1[1] * v2[1]

// 向量长度
const vectorLength = (v: Vector2D) => Math.sqrt(v[0] * v[0] + v[1] * v[1])

/**
 * cos theta
 * @param v1
 * @param v2
 * debug: `[v1:${v1}][v2:${v2}][dot:${dot}][l1:${l1.toFixed()}][l2:${l2.toFixed()}][theta:${result}]`
 */
export const cosTheta = (v1: Vector2D, v2: Vector2D) =>
  dotProduct2D(v1, v2) / vectorLength(v1) / vectorLength(v2)

// export const crossProduct2D = () => void 0;

// const multiply = (a: TransformMatrix2D, b: TransformMatrix2D) => {
//   const [a0, a1, a2, a3, a4, a5] = a;
//   const [b0, b1, b2, b3, b4, b5] = b;
//   return [
//     a0 * b0 + a2 * b1,
//     a1 * b0 + a3 * b1,
//     a0 * b2 + a2 * b3,
//     a1 * b2 + a3 * b3,
//     a0 * b4 + a2 * b5 + a4,
//     a1 * b4 + a3 * b5 + a5,
//   ] as TransformMatrix2D;
// };
