const events = require('../constants/events');
const { queryModifer } = require('../utils/utils');

const { AddressBookService } = require('../constants/cdsGen/services.json');
const { Persons } = require('../constants/cdsGen/entities.json');

module.exports = srv => {

    //***************************************************************
    //                  Perons entity events
    //***************************************************************
    // get full name
    srv.after(events.READ_EVENT, AddressBookService.entities.Persons.name, each => {
        each.fullName = [each.firstName, each.middleName, each.lastName].filter(str => str).join(' ');
    });

    //***************************************************************
    //                  Addresses entity events
    //***************************************************************
    // assign address to particular person
    srv.after(events.CREATE_EVENT, AddressBookService.entities.Addresses.name, async (each) => {
        await UPDATE(Persons.cdsName).set({ address_ID: each.ID }).where({ ID: each.person_ID });
    });

    //***************************************************************
    //                          DRAFT
    //***************************************************************
    // remove virtual fields from insert/update query for all entries
    // seems like a bug: fiori sends virtual fields also to backend for insert or update,
    //                   but virtual fields doesn't exist in db, that why we remove them
    srv.before(events.SAVE_EVENT, (req) => {
        req.query = queryModifer.getQueryWithoutVirtuals(req.query, req.target.name)
    });

}