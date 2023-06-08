// src/render/rectangle.ts

import { Vector2D } from "../primitive/types";

export class Rectangle {
    constructor(
        public pos: Vector2D,
        public dims: Vector2D,
        public color: string | CanvasGradient | CanvasPattern,
        public rotation = 0
    ) {}

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.pos[0], this.pos[1]);
        ctx.rotate(this.rotation);
        ctx.scale(this.dims[0], this.dims[1]);
        ctx.fillRect(-0.5, -0.5, 1, 1);
        ctx.restore();
    }
}
