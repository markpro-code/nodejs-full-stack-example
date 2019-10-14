import { hot } from 'react-hot-loader/root'
import { Route, Switch, Redirect } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { withRouter } from 'react-router'

import PageHome from '@/pages/home'
import PageLogin from '@/pages/login'

import style from './index.less'


class Main extends React.Component {
    componentDidMount() {
        //
    }

    render() {
        const showHeader = this.props.location.pathname !== '/login'

        return (
            <div className={style.main_page}>
                {!showHeader ? null : (
                    <div className={style.header}>
                        <h3>header</h3>
                    </div>
                )}
                <div className={style.main_content}>
                    <Switch>
                        <Redirect exact={true} from="/" to="/home" />
                        <Route path="/home" component={PageHome} />
                        <Route path="/login" component={PageLogin} />
                    </Switch>
                </div>
            </div>
        )
    }
}

const selectors = createSelector([state => state.commons, state => state.router], (commons, router) => ({
    commons,
}))


export default hot(withRouter(connect(selectors)(Main)))
