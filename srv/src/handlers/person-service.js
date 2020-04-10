const events = require('../constants/events');
const utils = require('../utils/utils');

const { PersonService } = require('../constants/cdsGen/services.json');
const { Persons, Addresses } = require('../constants/cdsGen/entities.json');

module.exports = srv => {

    //***************************************************************
    //                  Perons entity events
    //***************************************************************
    // get full name
    // srv.after(events.READ_EVENT, PersonService.entities.Persons.name, each => {
    //     each.fullName = [each.firstName, each.middleName, each.lastName].filter(str => str).join(' ');
    // });

    //***************************************************************
    //                  Addresses entity events
    //***************************************************************
    // assign address to particular person
    // srv.after(events.CREATE_EVENT, PersonService.entities.Addresses.name, async (each) => {
    //     await UPDATE(Persons.cdsName).set({ address_ID: each.ID }).where({ ID: each.person_ID });
    // });

    //***************************************************************
    //                          DRAFT
    //***************************************************************
    // remove virtual fields from insert/update query for all entries
    // seems like a bug: fiori sends virtual fields also to backend for insert or update,
    //                   but virtual fields doesn't exist in db, that why we remove them
    srv.on(events.SAVE_EVENT, PersonService.entities.PersonAttributes.name, (req) => {
        // console.log(req.query);
        // req.query = queryModifer.getQueryWithoutVirtuals(req.query, req.target.name)
        console.log(utils.queryBuilder.getDraftSaveData(
            req.query, [Persons.name, Addresses.name], req.data
        ));
    });

}