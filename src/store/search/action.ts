export const setSearch = (value) => {
    return {
        type: 'setSearch',
        value
    }
}

export const clearSearch = () => {
    return {
        type: 'clearSearch'
    }
}