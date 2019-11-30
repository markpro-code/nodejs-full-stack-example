import React from 'react'
import { defaultConnect } from '@/commons/utils'
import { actions } from './actions.js'
import style from './index.less'


class PageNew extends React.Component {
    /* --------- [handlers-start] ----------- */
    /* --------- [handlers-end] ----------- */

    render() {
        return (
            <div className={style.page}>
                <h1> PageNew </h1>
            </div>
        )
    }
}

export default defaultConnect($namespace, PageNew, actions)
