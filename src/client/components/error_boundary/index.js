import React from 'react'
import { Button } from 'antd'
import css from './index.less'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { error: null }
    }

    static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
        return { error }
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error(error, errorInfo)
    }

    _handleClickBtnReload = ev => {
        this.setState({ error: null })
    }

    render() {
        const { error } = this.state
        if (error == null) {
            return this.props.children
        }

        const message = error.stack ? error.stack : String(error)
        return (
            <div className={css.error_boundary}>
                <Button
                    className={css.btn_reload}
                    type="link"
                    icon="reload"
                    onClick={this._handleClickBtnReload}
                >刷新
                </Button>
                <pre style={{ color: 'red' }}>{message}</pre>
            </div>
        )
    }
}
