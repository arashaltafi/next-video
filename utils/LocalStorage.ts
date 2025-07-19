export const saveToLocalStorage = (key: string, value: any) => {
    if (typeof localStorage === 'undefined' || localStorage === null || typeof window === "undefined") return
    const getLocalStorage = getFromLocalStorage(key)
    if (getLocalStorage) {
        const newList = [...getLocalStorage, value]
        localStorage.setItem(key, JSON.stringify(newList))
    } else {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const deleteIdFromStorage = (key: string, id: number) => {
    const list = getFromLocalStorage(key)
    const newList = list?.filter((item: any) => item.id !== id)
    saveToLocalStorage(key, newList)
}

export const isHaveIdInStorage = (key: string, id: number): boolean => {
    const list = getFromLocalStorage(key)
    return list?.find((item: any) => item.id === id) ? true : false
}

export const getFromLocalStorage = (key: string) => {
    if (typeof localStorage === 'undefined' || localStorage === null || typeof window === "undefined") return
    const value = localStorage.getItem(key)
    if (value) {
        const parsedValue = JSON.parse(value);
        return Array.isArray(parsedValue) ? parsedValue : [parsedValue];
    }
}

export const deleteFromLocalStorage = (key: string) => {
    if (typeof localStorage === 'undefined' || localStorage === null || typeof window === "undefined") return
    localStorage.removeItem(key)
}

export const deleteAllLocalStorage = () => {
    if (typeof localStorage === 'undefined' || localStorage === null || typeof window === "undefined") return
    localStorage.clear()
}

export const LocalStorageRoutes = {
    MUSIC: 'music',
    MUSIC_VIDEO: 'music_video',
    SINGER: 'singer',
}