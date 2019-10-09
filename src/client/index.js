import '@babel/polyfill'
// import moment from 'moment'
// import 'moment-timezone'
import React from 'react'
import ReactDom from 'react-dom'

import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

import App from '@/commons/app'

import './styles/less/index.less'

// 初始化App对象
App.init()

// Render
const Main = require('@/pages/main').default


// Render
const AppRoot = () => (
    <Provider store={App.store}>
        <LocaleProvider locale={zhCN}>
            <ConnectedRouter history={App.history}>
                <Main />
            </ConnectedRouter>
        </LocaleProvider>
    </Provider>
)

// Render
const rootEl = document.getElementById('app')
ReactDom.render(<AppRoot />, rootEl)
