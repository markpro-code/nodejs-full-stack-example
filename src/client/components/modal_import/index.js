import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Upload, Button } from 'antd'
import { noop } from 'lodash'
// import { wrap } from 'object-path-immutable'
import style from './index.less'

export default class ModalImport extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.getDefaultState()

        this._uploadProps = {
            name: 'file',
            action: props.uploadUrl,
            headers: {},
            showUploadList: false,
            onChange: ({ file, fileList, event }) => {
                const { status, response } = file
                // file.status：'uploading', 'done', 'error', 'removed'
                // file.name：'xxx.png'
                // file.response: upload respons
                this.setState({ uploading: status === 'uploading' })

                if (status === 'error' || (status === 'done' && response.status !== 'success')) {
                    Modal.error({
                        title: 'Error',
                        width: 800,
                        content: <pre>{JSON.stringify(response, null, 4)}</pre>,
                        maskClosable: false,
                    })
                    return
                }

                if (status === 'done' && response.status === 'success') {
                    this.props.onOk()
                }
            },

            // return false stop uploading
            beforeUpload: (file, fileList) => true,

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visible === false && this.props.visible === true) {
            this.initState()
        }
    }

    getDefaultState = () => ({
        uploading: false,
    })

    setStateAsync = updateFn => new Promise(resolve => this.setState(updateFn, resolve))

    resetState = () => this.setStateAsync(this.getDefaultState())


    async initState() {
        await this.resetState()
    }

    /* --------- [handlers-start] ----------- */

    _handleModalClose = ev => {
        this.props.onClose()
    }

    _handleModalOk = ev => {
        this.props.onOk()
    }


    _handleClickBtnDownlaodTpl = () => {
        window.open(this.props.templateUrl)
    }

    /* --------- [handlers-end] ----------- */

    render() {
        const { visible, title = '[Title]' } = this.props
        const { uploading } = this.state
        return (
            <Modal
                title={title}
                visible={visible}
                maskClosable={false}
                wrapClassName={style.modal_import}
                destroyOnClose={this._handleModalClose}
                onCancel={this._handleModalClose}
                width={500}
                footer={
                    <div className={style.footer}>
                        <Button onClick={this._handleModalClose}>取消</Button>
                    </div>
                }
            >
                <div className={style.content_box}>
                    <Upload {...this._uploadProps}>
                        <Button icon={uploading ? 'loading' : 'upload'} type="primary" disabled={uploading}>上传 Excel</Button>
                    </Upload>
                    <Button type="link" onClick={this._handleClickBtnDownlaodTpl}>下载 Excel 模板</Button>
                </div>

            </Modal>
        )
    }
}


// type check
ModalImport.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onOk: PropTypes.func,
    uploadUrl: PropTypes.string.isRequired,
    templateUrl: PropTypes.string,
    title: PropTypes.string,
}

ModalImport.defaultProps = {
    templateUrl: null,
    visible: false,
    onClose: noop,
    onOk: noop,
    title: null,
}
