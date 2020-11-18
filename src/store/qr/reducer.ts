const defaultState = {
    mfQrInfo: {}
}

export default function user (state = defaultState , action) {
    switch (action.type) {
    case 'setMfQrInfo':
        return { ...state, ...{ mfQrInfo: action.value } }
    case 'clearMfQrInfo':
        return { ...defaultState }
    default:
        return state;
    }
}
