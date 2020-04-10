const entities = require('../constants/cdsGen/entities');
const actions = require('../constants/actions');

const getQueryAction = query => Object.keys(query).find(key => actions.includes(key));

const getEntityAttValues = (entity, data) =>
    entities[entity].elements.reduce((obj, element) => {
        return {
            ...obj,
            [element]: data[element]
        }
    }, {});

const getDraftData = (entitiesArr, data) => 
    entitiesArr.reduce((arr, entity) => {
        arr.push(getEntityAttValues(entity, data));
        return arr;
    }, []);

const getDraftSaveData = (query, entitiesArr, data) => {
    return {
        action: getQueryAction(query),
        data: getDraftData(entitiesArr, data)
    };
}

module.exports = {
    getDraftSaveData
}