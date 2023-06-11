import './style.css';

import { initFixedContext } from './primitive/graphics';
import { type Scene, SceneState, runGame } from './primitive/scene';
import { initKeys } from './primitive/keys';
import { Rectangle } from './render/rectangle';
import { Camera } from './render/camera';
import { DEBUG } from './flags';
import { drawHitbox } from './util/physics';

const [_keys, getKey] = initKeys();
const ctx = initFixedContext(800, 800);

const myRect = new Rectangle([0, 0], [100, 100], 'red');
const myWall = new Rectangle([500, 0], [100, 1000], 'green');
const camera = new Camera();

const SCENES: Scene[] = [dt => {
    // drawing
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    camera.activate(ctx);
    myWall.draw(ctx);
    myRect.draw(ctx);
    if (DEBUG) {
        drawHitbox(ctx, myWall);
        drawHitbox(ctx, myRect);
    }
    ctx.restore();
    if (DEBUG) {
        camera.drawIndicator(ctx);
    }

    // updating
    camera.center(dt, myRect, myWall);
    if (getKey('a')) myRect.pos[0] -= 300 * dt;
    if (getKey('e') || getKey('d')) myRect.pos[0] += 300 * dt;
    if (getKey(',') || getKey('w')) myRect.pos[1] -= 300 * dt;
    if (getKey('o') || getKey('s')) myRect.pos[1] += 300 * dt;
    return [SceneState.CONTINUE];
}];

window.onload = () => runGame(SCENES);
