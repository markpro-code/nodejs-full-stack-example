import { Modal } from 'antd'
import axios from 'axios'


/**
 *  用于发送AJAX请求
 */
const requestInstance = axios.create({
    method: 'post',
    timeout: 20000, // 超时：默认20秒
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    responseType: 'json',
})


function request(options) {
    return requestInstance.request({
        ...options,
    }).then(response => {
        const { status, messages, data } = response.data || {}
        if (status === 'request_validation_error') {
            return Promise.reject({
                showInDialog: true,
                title: '请求数据校验失败',
                content: messages,
            })
        }

        return data
    }).catch(error => {
        const { title, showInDialog, content } = error || {}
        if (showInDialog) {
            Modal.error({
                title,
                content,
                maskClosable: true,
            })
        } else {
            Modal.error({
                title: '接口异常',
                content: String(error),
                maskClosable: true,
            })
        }
        return Promise.reject(error)
    })
}

export function userLogin(username, password) {
    return request({
        method: 'POST',
        url: '/api/user/login',
        data: { username, password },
    })
}
