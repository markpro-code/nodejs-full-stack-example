import { get, map, find, forEach, isPlainObject } from 'lodash'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

export function deepFreeze(obj) {
    // Retrieve the property names defined on obj
    const propNames = Object.getOwnPropertyNames(obj)

    // Freeze properties before freezing self
    propNames.forEach(name => {
        const prop = obj[name]

        // Freeze prop if it is an object
        if (typeof prop === 'object' && prop !== null) deepFreeze(prop)
    })

    // Freeze self (no-op if already frozen)
    return Object.freeze(obj)
}

export function enums(list) {
    const obj = {
        list,
    }
    obj.find = function (condition, property) {
        const rev = find(list, condition)
        return property == null ? rev : get(rev, property)
    }

    obj.findLabel = function (condition) {
        return this.find(condition, 'label')
    }

    obj.map = function (...args) {
        return map(list, ...args)
    };

    (list || []).forEach(item => {
        obj[String(item.key).toUpperCase()] = item.value
    })

    return deepFreeze(obj)
}

export function createActionTypes(namespace, list) {
    if (namespace == null) {
        throw new Error('缺少参数 namespace')
    }
    const obj = {}

    const newList = []
    forEach(list, item => {
        if (item.startsWith('ajax:')) {
            item = item.replace(/^ajax:/, '')
            newList.push(`${item}_REQUESTED`)
            newList.push(`${item}_SUCCEEDED`)
            newList.push(`${item}_FAILED`)
        }
        newList.push(item)
    })

    forEach(newList, item => {
        obj[item] = `${namespace}/${item}`
    })
    return deepFreeze(obj)
}

export function defaultConnect(namespace, PageComponent, mapDispatchToProps) {
    const mapStateToProps = createSelector(
        [state => state.commons, state => state[namespace]],
        (commons, data) => ({ commons, data }),
    )
    return connect(mapStateToProps, mapDispatchToProps)(PageComponent)
}

export function isEmpty(obj) {
    if (Number.isNaN(obj)) {
        return true
    } if (Array.isArray(obj)) {
        return obj.length === 0
    } if (isPlainObject(obj)) {
        return Object.keys(obj).length === 0
    }
    return obj == null || String(obj).trim() === ''
}
