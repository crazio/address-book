
const getWithoutVirtualFields = (entity, fields) =>
    Object.keys(entity).filter(key => !fields.includes(key))
                       .reduce((newObj, key) => { 
                           return { ...newObj, [key]: entity[key] } 
                        }, {})

module.exports = {
    getWithoutVirtualFields
}