import React, { useState } from 'react'

import { Input, Button } from 'antd'
import { defaultConnect } from '@/commons/utils'
import { overArgs, property } from 'lodash'
import { actions } from './actions.js'

import style from './index.less'

function PageHome(props) {
    const [user, updateUser] = useState('')
    const [pass, updatePass] = useState('')
    return (
        <div className={style.page}>
            <div className={style.center_box}>
                <div className={style.box_bg} />
                <div className={style.box_content}>
                    <div className={style.form_row}>
                        <span className={style.label}>User Name:</span>
                        <Input
                            placeholder="username"
                            value={user}
                            onChange={overArgs(updateUser, property('target.value'))}
                        />
                    </div>
                    <div className={style.form_row}>
                        <span className={style.label}>Password:</span>
                        <Input.Password
                            placeholder="password"
                            value={pass}
                            onChange={overArgs(updatePass, property('target.value'))}
                        />
                    </div>
                    <div className={style.btn_row}>
                        <Button type="primary" onClick={props.dpActionLogin.bind(this, user, pass)}>login</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default defaultConnect($namespace, PageHome, actions)
