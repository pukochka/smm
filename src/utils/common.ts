export function useParam(key: any, value: any, obj?: any) {
    return Object.defineProperty(obj ?? {}, key, {
        value: value,
        enumerable: true,
        writable: true,
        configurable: true,
    });
}