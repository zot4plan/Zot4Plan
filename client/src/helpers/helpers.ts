export function importAll(r: __WebpackModuleApi.RequireContext) {
    return r.keys().map(r);
}

export function getDeptFromCourse(str: string) {
    const lastIndexOfSpace = str.lastIndexOf(' ');
    return (lastIndexOfSpace === -1)? str : str.substring(0, lastIndexOfSpace);
}

export function sessionStorageGetItem (key: string, type: string) {
    const item = sessionStorage.getItem(key);

    if(item) {
        if(type === 'object')
            return JSON.parse(item);
        else if (type === 'number')
            return Number(item);
        else if (type === 'boolean') {
            return item.toLowerCase() === 'true';
        }
    }

    return item;
}

export function sessionStorageSetItem (key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
}