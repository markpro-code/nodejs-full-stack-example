import React from 'react'
import PropTypes from 'prop-types'
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

    componentDidUpdate(prevProps, prevState) {
        // NOTES:
        // the reference change of data props tell ErrorBoundary instance when to clear error message
        if (prevProps.data !== this.props.data) {
            this.setState({ error: null })
        }
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
                <pre style={{ color: 'red' }}>{message}</pre>
            </div>
        )
    }
}

// type check
ErrorBoundary.propTypes = {
    data: PropTypes.object,
}

ErrorBoundary.defaultProps = {
    data: null,
}
