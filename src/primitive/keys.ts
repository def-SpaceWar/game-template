// src/primitives/keys.ts

export const keys: string[] = [];
export const getKey = (k: string) => {
    if (keys.indexOf(k) != -1) return true;
    return false;
}


let hasInit = false;
export const initKeys = (): [string[], (k: string) => boolean] => {
    if (!hasInit) {
        document.addEventListener('keydown', e => {
            if (getKey(e.key)) return;
            keys.push(e.key);
        });

        document.addEventListener('keyup', (e) => {
            const i = keys.indexOf(e.key);
            if (i == -1) return;
            keys.splice(i, 1);
        });
    }

    return [keys, getKey];
};
