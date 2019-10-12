import React from 'react'
import { defaultConnect } from '@/commons/utils'
import { actions } from './actions.js'

import style from './index.less'


class LoginPage extends React.Component {
    componentDidMount() {
        //
    }

    render() {
        return (
            <div className={style.main_page}>
                <h1>Main Page</h1>
            </div>
        )
    }
}

export default defaultConnect($namespace, LoginPage, actions)
