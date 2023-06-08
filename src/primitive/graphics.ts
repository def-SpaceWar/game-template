// src/primitive/graphics.ts

export const initFixedContext = (w = 800, h = 800) => {
    const canvas = document.getElementById('app')!
        .appendChild(document.createElement('canvas')),
        ctx = canvas.getContext('2d');

    if (!ctx) throw new Error("i like dick");

    canvas.width = w;
    canvas.height = h;
    return ctx;
};

export const initFillWindowContext = () => {
    const canvas = document.getElementById('app')!
        .appendChild(document.createElement('canvas')),
        ctx = canvas.getContext('2d');

    if (!ctx) throw new Error("");

    addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return ctx;
};
