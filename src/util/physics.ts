// src/util/physics.ts

import { HITBOX_COLOR } from "../flags";

export type Vector2D = [number, number];
export type Scalar = number;

export const scale = (v: Vector2D, s: Scalar): Vector2D =>
    v.map(n => n * s) as Vector2D;

export const dot = (a: Vector2D, b: Vector2D): Scalar =>
    a.reduce((p, v, i) => p + v * b[i], 0);

export const magnitudeSquared = (v: Vector2D): Scalar =>
    dot(v, v);

export const magnitude = (v: Vector2D): Scalar =>
    Math.sqrt(magnitudeSquared(v));

export const normalize = (v: Vector2D): Vector2D =>
    (v[0] == 0 && v[1] == 0) ? normalize([Math.random(), Math.random()])
        : scale(v, 1 / magnitude(v));

export const add = (v1: Vector2D, v2: Vector2D): Vector2D =>
    [v1[0] + v2[0], v1[1] + v2[1]];

export const subtract = (v1: Vector2D, v2: Vector2D): Vector2D =>
    [v1[0] - v2[0], v1[1] - v2[1]];

export const rotate = (v: Vector2D, angle: number, origin: Vector2D = [0, 0]): Vector2D => {
    const difference = subtract(v, origin);
    return add([
        Math.cos(angle) * difference[0] - Math.sin(angle) * difference[1],
        Math.sin(angle) * difference[0] + Math.cos(angle) * difference[1]
    ], origin)
};

export type LineCollider = {
    point1: Vector2D;
    point2: Vector2D;
};

export const areIntersecting = (l1: LineCollider, l2: LineCollider): boolean => {
    const [a, b] = l1.point1,
        [c, d] = l1.point2,
        [p, q] = l2.point1,
        [r, s] = l2.point2;

    const det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) return false;

    const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
};

export const drawLine = (ctx: CanvasRenderingContext2D, l: LineCollider) => {
    ctx.save();
    ctx.strokeStyle = HITBOX_COLOR;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(...l.point1);
    ctx.lineTo(...l.point2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
};

export type RectCollider = {
    pos: Vector2D;
    dims: Vector2D;
    rotation: number;
};

export const getRectPoints = (r: RectCollider): Vector2D[] => {
    const points: Vector2D[] = [
        rotate(add(r.pos, scale(r.dims, 0.5)), r.rotation, r.pos),
        rotate(add(r.pos, scale([-r.dims[0], r.dims[1]], 0.5)), r.rotation, r.pos),
        rotate(add(r.pos, scale(r.dims, -0.5)), r.rotation, r.pos),
        rotate(add(r.pos, scale([r.dims[0], -r.dims[1]], 0.5)), r.rotation, r.pos)
    ];

    return points;
};

export const getRectLines = (r: RectCollider): LineCollider[] => {
    const points: Vector2D[] = getRectPoints(r);
    const lines: LineCollider[] = [];

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            lines.push({ point1: points[i], point2: points[j] });
        }
    }

    return lines;
};

export const areColliding = (r1: RectCollider, r2: RectCollider): boolean => {
    const ls1: LineCollider[] = getRectLines(r1),
        ls2: LineCollider[] = getRectLines(r2);

    for (let i = 0; i < ls1.length; i++) {
        for (let j = 0; j < ls2.length; j++) {
            if (areIntersecting(ls1[i], ls2[j])) return true;
        }
    }

    return false;
};

export const drawHitbox = (ctx: CanvasRenderingContext2D, r: RectCollider): void => {
    const lines: LineCollider[] = getRectLines(r);

    ctx.save();
    ctx.strokeStyle = HITBOX_COLOR;
    ctx.lineWidth = 4;
    for (let i = 0; i < lines.length; i++) {
        ctx.beginPath();
        ctx.moveTo(...lines[i].point1);
        ctx.lineTo(...lines[i].point2);
        ctx.closePath();
        ctx.stroke();
    }
    ctx.restore();
};

export type Position = {
    pos: Vector2D;
};
