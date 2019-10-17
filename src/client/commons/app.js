import { connectRouter, routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { combineReducers, compose, applyMiddleware, createStore } from 'redux'
import { createPromise } from 'redux-promise-middleware'
import logger from 'redux-logger'
import { fork } from 'redux-saga/effects'
import commonReducer from '@/commons/reducer'
import * as commonSagas from '@/commons/saga'

let appSagaMiddleware = null
let appStore = null
let appHistory = null

function getReducers() {
    // Use require.context to require reducers automatically
    // Ref: https://webpack.github.io/docs/context.html
    const context = require.context('../pages', true, /reducer\.js$/)
    const keys = context.keys()
    const reducers = keys.reduce((memo, key) => {
        const reducerKey = /\/(.*)\/reducer\.js$/.exec(key)[1]
        memo[`pages/${reducerKey}`] = context(key).default
        return memo
    }, {})
    reducers.commons = commonReducer
    return reducers
}

function getSagaRoot() {
    const context = require.context('../pages', true, /saga\.js$/)
    const keys = context.keys()
    const commonSagasKeys = Object.keys(commonSagas)

    return function* root() {
        for (let i = 0; i < keys.length; i += 1) {
            const resource = context(keys[i])
            const propList = Object.keys(resource)

            for (let j = 0; j < propList.length; j += 1) {
                yield fork(resource[propList[j]])
            }
        }

        // for common sagas
        for (let k = 0; k < commonSagasKeys.length; k += 1) {
            yield fork(commonSagas[commonSagasKeys[k]])
        }
    }
}

class App {
    init() {
        appHistory = createBrowserHistory()
        appSagaMiddleware = createSagaMiddleware()
        const middlewares = [
            createPromise({ promiseTypeSuffixes: ['REQUESTED', 'SUCCEEDED', 'FAILED'] }),
            appSagaMiddleware,
        ]

        middlewares.push(routerMiddleware(appHistory))

        // redux logger
        if (process.env.COMPILE_ENV === 'dev') {
            middlewares.push(logger)
        }

        // redux devtools
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        const enhancer = composeEnhancers(applyMiddleware(...middlewares))

        // 將 saga middleware mount 在 Store 上
        const initialState = {}

        appStore = createStore(
            combineReducers({
                ...getReducers(),
                router: connectRouter(appHistory),
            }),
            initialState,
            enhancer,
        )

        // apply common sagas, only after the applyMiddleware phase
        appSagaMiddleware.run(getSagaRoot())
    }

    get store() {
        return appStore
    }

    get history() {
        return appHistory
    }

    get sagaMiddleware() {
        return appSagaMiddleware
    }
}

const app = new App()

export default app
