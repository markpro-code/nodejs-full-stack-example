import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import echarts from 'echarts'
import { debounce } from 'lodash'
import css from './index.less'

export default class EchartWrapper extends React.PureComponent {
    constructor(props) {
        super(props)
        this._chartDom = React.createRef()
    }

    componentDidMount() {
        this._chart = echarts.init(this._chartDom.current)
        this.init()

        if (this.props.autoResize) {
            this._resizeHandler = debounce(() => { this._chart.resize() }, 300)
            window.addEventListener('resize', this._resizeHandler)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.init()
    }

    componentWillUnmount() {
        // clean up
        if (this._resizeHandler != null) {
            window.removeEventListener('resize', this._resizeHandler)
        }

        if (this._chart != null) {
            this._chart.dispose()
        }
    }

    init() {
        this._chart.setOption(this.props.options)
    }

    /* --------- [handlers-start] ----------- */
    /* --------- [handlers-end] ----------- */

    render() {
        const { className, style } = this.props
        return (
            <div className={cn(css.echart_wrapper, className)} style={style}>
                <div className={css.chart} ref={this._chartDom} />
            </div>
        )
    }
}


// type check
EchartWrapper.propTypes = {
    options: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    autoResize: PropTypes.bool,
}

EchartWrapper.defaultProps = {
    options: {},
    className: null,
    style: null,
    autoResize: false,
}
