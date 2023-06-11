import { DEBUG, HITBOX_COLOR } from "../flags";
import {
    type Position,
    type Vector2D,
    add,
    scale,
    subtract
} from "../util/physics";

export class Camera {
    direction: Vector2D = [1, 0];
    scale: Vector2D = [1, 1]; // TODO

    constructor(public lerpRate = 4, public pos: Vector2D = [0, 0]) { }

    activate(ctx: CanvasRenderingContext2D) {
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.scale(...this.scale);
        ctx.translate(...this.pos);
    }

    drawIndicator(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.strokeStyle = HITBOX_COLOR;
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(...this.direction);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    center(dt: number, ...positions: Position[]) {
        const avgPos = scale(positions.reduce((p: Vector2D, { pos }) => add(p, pos), [0, 0]), -1 / positions.length);
        this.pos = add(this.pos, scale(subtract(avgPos, this.pos), dt * this.lerpRate));

        if (DEBUG) this.direction = scale(subtract(avgPos, this.pos), -1);
    }
}
