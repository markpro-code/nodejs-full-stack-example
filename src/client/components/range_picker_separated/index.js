import React from 'react'
import { DatePicker } from 'antd'
import cn from 'classnames'
import PropTypes from 'prop-types'
import style from './index.less'

export default class RangePickerSeparated extends React.Component {
    /* --------- [handlers-start] ----------- */

    _handleChangeStartTime = timeStart => {
        const { value, onChange } = this.props
        onChange([timeStart, value[1]])
    }


    _handleChangeEndTime = timeEnd => {
        const { value, onChange } = this.props
        onChange([value[0], timeEnd])
    }


    _onDisableStartTime = timeStart => {
        const timeEnd = this.props.value[1]
        return timeEnd.isBefore(timeStart)
    }


    _onDisableEndTime = timeEnd => {
        const timeStart = this.props.value[0]
        return timeEnd.isBefore(timeStart)
    }

    /* --------- [handlers-end] ----------- */

    render() {
        const { value, className, style: styleObj, showTime } = this.props
        const [timeStart, timeEnd] = value
        return (
            <div className={cn(style.range_picker_separated, className)} style={styleObj}>
                <DatePicker
                    className={style.time_start}
                    showTime={showTime}
                    value={timeStart}
                    onChange={this._handleChangeStartTime}
                    disabledDate={this._onDisableStartTime}
                    disabledTime={this._onDisableStartTime}
                />

                <span className={style.separator}>至</span>

                <DatePicker
                    className={style.time_end}
                    showTime={showTime}
                    value={timeEnd}
                    onChange={this._handleChangeEndTime}
                    disabledDate={this._onDisableEndTime}
                    disabledTime={this._onDisableEndTime}
                />
            </div>
        )
    }
}


// type check
RangePickerSeparated.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired,
    showTime: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
}


RangePickerSeparated.defaultProps = {
    className: null,
    style: null,
    showTime: false,
}
