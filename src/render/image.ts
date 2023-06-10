// src/render/image.ts

import { type Vector2D } from "../util/physics";

export class Image {
    srcPos: Vector2D;
    srcDims: Vector2D;

    constructor(
        public pos: Vector2D,
        public dims: Vector2D,
        public image: HTMLImageElement,
        srcPos?: Vector2D,
        srcDims?: Vector2D,
        public rotation = 0
    ) {
        this.srcPos = srcPos || [0, 0];
        this.srcDims = srcDims || [image.width, image.height];
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.pos[0], this.pos[1]);
        ctx.rotate(this.rotation);
        ctx.scale(this.dims[0], this.dims[1]);
        ctx.drawImage(this.image, ...this.srcPos, ...this.srcDims, -0.5, -0.5, 1, 1);
        ctx.restore();
    }
}
