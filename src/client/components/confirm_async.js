import {  Modal } from 'antd'

export default options => new Promise(function (resolve, reject) {
    options.onOk = () => { resolve(true) }
    options.onCancel = () => { resolve(false) }
    Modal.confirm(options)
})
