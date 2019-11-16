const { find, get, map, isPlainObject } = require('lodash')

function deepFreeze(obj) {
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

function Enums(list) {
    const obj = {
        list,
    }
    obj.find = function (condition, property) {
        const rev = find(list, condition)
        return property == null ? rev : get(rev, property)
    }

    obj.map = function (condition) {
        return map(list, condition)
    };

    (list || []).forEach(({ key, value }) => {
        const k = key || value
        obj[String(k).toUpperCase()] = value
    })

    obj.toJSON = function () {
        return JSON.stringify(list)
    }

    return deepFreeze(obj)
}


function isEmpty(obj) {
    if (Number.isNaN(obj)) {
        return true
    } if (Array.isArray(obj)) {
        return obj.length === 0
    } if (isPlainObject(obj)) {
        return Object.keys(obj).length === 0
    }
    return obj == null || String(obj).trim() === ''
}

function sendData(res, data) {
    if (typeof data === 'string') {
        res.end(data)
    } else {
        res.json({
            status: 'success',
            data: data == null ? {} : data,
        })
    }
}


module.exports = {
    Enums,
    deepFreeze,
    isEmpty,
    sendData,
}
