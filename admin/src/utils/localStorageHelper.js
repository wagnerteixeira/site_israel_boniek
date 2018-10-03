export function set(id, data) {
    return localStorage.setItem(id, JSON.stringify(data));
}

export function get(id) {
    return JSON.parse(localStorage.getItem(id));
}