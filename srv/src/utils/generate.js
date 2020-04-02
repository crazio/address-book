const cds = require('@sap/cds');
const path = require('path');
const common = require('../constants/common');
const ObjectBuilder = require('./objectBuilder');
const fs = require('fs-extra');

//TODO COMPLETE REFACTORING 

const buildPath = path.resolve(__dirname, '..', 'constants', 'cdsGen');

fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

const writeToJSON = (obj, fileName) => {
    fs.outputJSONSync(path.resolve(buildPath, fileName + '.json'), obj);
}

const isPureEntity = (entityName) => {
    return !entityName.includes('.');
}

const addNamespace = (name) => {
    return common.NAMESPACE + '.' + name;
}

const getServiceName = (name) => {
    return name.substr(0, name.indexOf('.'));
}

const getServiceEntityName = (name) => {
    return name.substring(name.indexOf('.') + 1);
}

const filterObjectByKeys = (object, filter) => {
    return Object.keys(object)
        .filter(filter)
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: object[key]
            }
        }, {});
}

const convertDbToObj = (entities) => {
    objBuilder = new ObjectBuilder();
    Object.keys(entities).forEach((_, index, keys) => {
        objBuilder.addProperty(keys[index], Object.values(entities)[index]);
    });
    return objBuilder.build();
}

const getDbObj = (entities, nameModifier) => {
    const dbObj = new ObjectBuilder();
    for (const [key, value] of Object.entries(entities)) {
        const name = nameModifier ? nameModifier(key) : key;
        dbObj.addProperty(
            name, new ObjectBuilder()
                .addProperty('name', name)
                .addProperty('cdsName', value.name)
                .build()
        );
    }
    return dbObj.build();
}

const getServiceKeys = (entities) => {
    return Object.keys(entities)
        .map((name) => getServiceName(name))
        .filter((name, index, self) => self.indexOf(name) === index);
}

const getServiceEntitiesObj = (entities, serviceName) => {
    const serviceEntities = filterObjectByKeys(entities, (key) => key.includes(serviceName));
    return getDbObj(serviceEntities, getServiceEntityName);
}

const getServiceObj = (entities) => {
    const serviceObj = new ObjectBuilder();
    getServiceKeys(entities).forEach((serviceName) => {
        serviceObj.addProperty(
            serviceName, new ObjectBuilder()
                .addProperty('name', serviceName)
                .addProperty('cdsName', addNamespace(serviceName))
                .addProperty('entities', getServiceEntitiesObj(entities, serviceName))
                .build()
        );
    });
    return serviceObj.build();
}

const writeGenToJson = (dbObj, serviceObj) => {
    console.log("Write entities");
    writeToJSON(getDbObj(dbObj), 'entities');
    console.log("Write services");
    writeToJSON(getServiceObj(serviceObj), 'services');
    console.log("Objects are written")
}

const generate = async () => {
    console.log("Connecting to db");
    const db = await cds.connect.to('db');
    const dbObj = convertDbToObj(db.entities(common.NAMESPACE));
    writeGenToJson(
        filterObjectByKeys(dbObj, isPureEntity),
        filterObjectByKeys(dbObj, (arg) => !isPureEntity(arg))
    );
    cds.disconnect();
    console.log("Success!!!")
}

generate();