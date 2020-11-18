
const defaultState = {
    tokenInfo: {},
    userInfo: {}
}

export default function user (state = defaultState , action) {
    switch (action.type) {
    case 'setToken':
        return {...state, ...{ tokenInfo: action.value }}
    case 'setUserInfo':
        return {...state, ...{ userInfo: action.value }}
    default:
        return state;
    }
}
