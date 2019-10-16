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

const errorCodeMap = {
    10: '请求参数错误',
    11: '系统错误',
    20: '登录信息失效',
}

function request(options) {
    return requestInstance.request({
        ...options,
    }).then(response => {
        const { success, body, message, errorCode } = response.data || {}
        if (success !== true) {
            if (String(errorCode) === '20') {
                window.location.assign('/login')
                return
            }

            return Promise.reject({
                showInDialog: true,
                title: errorCodeMap[errorCode] || '请求异常',
                content: message || '未知错误',
            })
        }

        return body
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
        .then(userInfo => {
        //
        })
}
