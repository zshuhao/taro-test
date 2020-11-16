
const defaultState = {
    code: '211221'
}

export default function user (state = defaultState , action) {
    switch (action.type) {
    case 'setCode':
        return {...state, ...{ code: action.value }}
    default:
        return state;
    }
}
