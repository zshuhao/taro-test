import {createStore, combineReducers } from 'redux'
import user from './user/reducer'
import search from './search/reducer'
// import thunk from 'redux-thunk'


const store = createStore(
    combineReducers({ user, search }),
//   applyMiddleware(thunk)
)

// 监听state变化
store.subscribe(() => {
    console.log(store.getState())
    console.log('store发生了变化');
})

export default store