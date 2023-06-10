import {
    type Position,
    type Vector2D,
    add,
    scale,
    subtract,
    normalize
} from "../util/physics";

export class Camera {
    direction: Vector2D = [1, 0];

    constructor(public lerpRate = 4, public pos: Vector2D = [0, 0]) { }

    activate(ctx: CanvasRenderingContext2D) {
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.translate(...this.pos);
    }

    drawIndicator(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(...scale(this.direction, 100));
        ctx.stroke();
        ctx.restore();
    }

    center(dt: number, ...positions: Position[]) {
        const avgPos = scale(positions.reduce((p: Vector2D, { pos }) => add(p, pos), [0, 0]), -1 / positions.length);
        this.pos = add(this.pos, scale(subtract(avgPos, this.pos), dt * this.lerpRate));

        this.direction = scale(normalize(subtract(avgPos, this.pos)), -1);
    }
}
