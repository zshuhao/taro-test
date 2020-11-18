const defaultState = {
    search: {}
}

export default function user (state = defaultState , action) {
    switch (action.type) {
    case 'setSearch':
        return { ...state, ...{ search: action.value } }
    case 'clearSearch':
        return { ...defaultState }
    default:
        return state;
    }
}
