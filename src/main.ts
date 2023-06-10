import './style.css';

import { initFixedContext } from './primitive/graphics';
import { type Scene, SceneState, runGame } from './primitive/scene';
import { initKeys } from './primitive/keys';
import { Rectangle } from './render/rectangle';
import { Camera } from './render/camera';

const [_keys, getKey] = initKeys();
const ctx = initFixedContext(800, 800);

const myRect = new Rectangle([0, 0], [100, 100], 'red');
const myWall = new Rectangle([500, 0], [100, 1000], 'blue');
const camera = new Camera();

const SCENES: Scene[] = [dt => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.save();
    camera.activate(ctx);
    myWall.draw(ctx);
    myRect.draw(ctx);
    ctx.restore();

    camera.drawIndicator(ctx);

    camera.center(dt, myRect);
    if (getKey('a')) myRect.pos[0] -= 300 * dt;
    if (getKey('e')) myRect.pos[0] += 300 * dt;
    if (getKey(',')) myRect.pos[1] -= 300 * dt;
    if (getKey('o')) myRect.pos[1] += 300 * dt;

    return [SceneState.CONTINUE];
}];

window.onload = () => runGame(SCENES);
