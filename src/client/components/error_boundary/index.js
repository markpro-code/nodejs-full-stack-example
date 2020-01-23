import React from 'react'

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
        console.info('componentDidCatch()')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /* eslint-disable */
        if (prevState.error != null) {
            this.setState({ error: null })
        }
        /* eslint-enable */
    }

    render() {
        const { error } = this.state
        if (error != null) {
            return (
                <pre style={{ color: 'red' }}>{`${this.state.error.toString()}\n${error.stack}`}</pre>
            )
        }

        return this.props.children
    }
}
