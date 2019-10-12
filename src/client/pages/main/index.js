import { hot } from 'react-hot-loader/root'
import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { withRouter } from 'react-router'

import style from './index.less'


class Main extends React.Component {
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

const selectors = createSelector([state => state.commons, state => state.router], (commons, router) => ({
    commons,
}))


export default hot(withRouter(connect(selectors)(Main)))
