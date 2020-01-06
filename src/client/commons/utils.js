import { get, map, find, forEach, isPlainObject, forOwn, result } from 'lodash'
import { set as setImmutableState } from 'object-path-immutable'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import  numeral from 'numeral'

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
    // ----- parameter check
    if (!Array.isArray(list)) {
        throw new Error('list must be Array')
    }

    if (isEmpty(list)) {
        throw new Error('list can not be empty')
    }

    if (list.some(item => isEmpty(item.key))) {
        throw new Error('list item key must not be empty')
    }

    if (list.some(item => isEmpty(item.value))) {
        throw new Error('list item value must not be empty')
    }

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
    }

    list.forEach(item => {
        obj[String(item.key).toUpperCase()] = item.value
    })

    return new Proxy(obj, {
        set(trapTarget, key, value, receiver) {
            // ignore property assignment
        },
        get(trapTarget, key, receiver) {
            if (!(key in receiver)) {
                console.error(`property ${key} doesn't exit in `, obj)
                throw new TypeError(`Property ${key} doesn't exist.`)
            }
            return Reflect.get(trapTarget, key, receiver)
        },
    })
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


/** *
 *  format number
 */
export const formatNumber = (format, nullFormat = 'N/A') => value => {
    numeral.nullFormat(nullFormat)
    return numeral(value).format(format)
}

/**
 *  return new object with empty properties removed
 */
export function filterEmptyProps(obj) {
    const newObj = {}
    forOwn(obj, function (value, key) {
        if (!isEmpty(value)) {
            newObj[key] = value
        }
    })
    return newObj
}


export const stateUpdator = (component, statePath) => (propName, pathToGetValue, needTrim = false) => value => {
    console.info('stateUpdator() value: ', value)
    if (pathToGetValue != null) {
        value = needTrim ? String(result(value, pathToGetValue)).trim() : result(value, pathToGetValue)
    }
    component.setState(function (prevState) {
        return setImmutableState(prevState, `${statePath}.${propName}`, value)
    })
}

export function setStateAsync(updateFn) {
    return new Promise(resolve => this.setState(updateFn, resolve))
}
