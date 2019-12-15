import React from 'react'
import getDefaultState from './default_state.js'
import style from './index.less'


class PageNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = getDefaultState()
    }
    /* --------- [handlers-start] ----------- */
    /* --------- [handlers-end] ----------- */

    setStateAsync = updateFn => new Promise(resolve => this.setState(updateFn, resolve))

    render() {
        return (
            <div className={style.page}>
                <h1> PageNew </h1>
            </div>
        )
    }
}

export default PageNew
