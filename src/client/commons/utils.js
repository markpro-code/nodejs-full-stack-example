import { get, map, find, forEach } from 'lodash'

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
    forEach(list, item => {
        obj[item] = `${namespace}/${item}`
    })
    return deepFreeze(obj)
}
