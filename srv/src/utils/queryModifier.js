const entities = require('../constants/cdsGen/entities');

const QUERY_ACTION = ['INSERT', 'UPDATE'];

const getPureEntityName = entityName => entityName.substring(entityName.lastIndexOf('.') + 1);

const getDbEntityValue = entityName => entities[entityName];

const getDbEntityVirtuals = entityName => getDbEntityValue(entityName).virtuals;

const getQueryAction = query => Object.keys(query).find(key => QUERY_ACTION.includes(key));

const getQueryActionValue = (query, action) => query[action];

const checkVirtualField = (field, virtuals) => virtuals.includes(field);

const getDataWithoutVirtuals = (data, entityName) =>
    Object.keys(data)
        .filter(field => !checkVirtualField(
            field,
            getDbEntityVirtuals(getPureEntityName(entityName)))
        )
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: data[key]
            }
        }, {});

const getEntriesWithoutVirtuals = (data, entityName) => data.map(entry => getDataWithoutVirtuals(entry, entityName))

const getActionValueWithoutVirtuals = (actionData, entityName) =>
    actionData.hasOwnProperty('entries') ? {  ...actionData, entries: getEntriesWithoutVirtuals(actionData.entries, entityName) } :
        actionData.hasOwnProperty('data') ? { ...actionData, data: getDataWithoutVirtuals(actionData.data, entityName) }: { ...actionData };

const getQueryObjWithoutVirtuals = (query, action, entityName) => {
    return {
        [action]: getActionValueWithoutVirtuals(
            getQueryActionValue(query, action),
            entityName
        )
    };
}

const getQueryWithoutVirtuals = (query, entityName) =>
    getQueryObjWithoutVirtuals(
        query,
        getQueryAction(query),
        entityName
    )

module.exports = {
    getQueryWithoutVirtuals
}