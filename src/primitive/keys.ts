// src/primitives/keys.ts

export const initKeys = (): [string[], (k: string) => boolean] => {
    const keys: string[] = [];

    const getKey = (k: string) => {
        if (keys.indexOf(k) != -1) return true;
        return false;
    }

    document.addEventListener('keydown', e => {
        if (getKey(e.key)) return;
        keys.push(e.key);
    });

    document.addEventListener('keyup', (e) => {
        const i = keys.indexOf(e.key);
        if (i == -1) return;
        keys.splice(i, 1);
    });

    return [keys, getKey];
};
