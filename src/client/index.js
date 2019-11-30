import '@babel/polyfill'
// import moment from 'moment'
// import 'moment-timezone'
import React from 'react'
import ReactDom from 'react-dom'
import { ConfigProvider } from 'antd'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import zhCN from 'antd/es/locale/zh_CN'

import App from '@/commons/app'

import 'antd/dist/antd.less'
import './styles/less/index.less'

// 初始化App对象
App.init()

// Render
const Main = require('@/pages/main').default


// Render
const AppRoot = () => (
    <Provider store={App.store}>
        <ConfigProvider locale={zhCN}>
            <ConnectedRouter history={App.history}>
                <Main />
            </ConnectedRouter>
        </ConfigProvider>
    </Provider>
)

// Render
const rootEl = document.getElementById('app')
ReactDom.render(<AppRoot />, rootEl)
