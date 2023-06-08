import './style.css';

import { initKeys } from './primitive/keys';
import { initFixedContext } from './primitive/graphics';
import { type Scene, SceneState, runGame } from './primitive/scene';
import { Rectangle } from './render/rectangle';
import { areColliding } from './util/physics';

export const [width, height] = [800, 800];
export const [keys, getKey] = initKeys();
const ctx = initFixedContext(width, height);

const rectangle1 = new Rectangle([60, 60], [100, 100], 'red');
const rectangle2 = new Rectangle([150, 150], [100, 100], 'blue');

const SCENES: Scene[] = [dt => {
    ctx.clearRect(0, 0, width, height);

    rectangle1.draw(ctx);
    rectangle1.rotation += dt;

    rectangle2.draw(ctx);
    rectangle2.rotation += dt;

    console.log(areColliding(rectangle1, rectangle2));

    return [SceneState.CONTINUE];
}];

window.onload = () => runGame(SCENES);
