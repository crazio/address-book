const events = require('../constants/events');

const { AddressBookService } = require('../constants/cdsGen/services.json');
const { Persons } = require('../constants/cdsGen/entities.json');

module.exports = srv => {

    //Perons entity events
    //get full name
    srv.after(events.READ_EVENT, AddressBookService.entities.Persons.name, each => {
        each.fullName = [each.firstName, each.middleName, each.lastName].filter(str => str).join(' ');
    });

    //Addresses entity events
    //Assign address to particular person
    srv.after(events.CREATE_EVENT, AddressBookService.entities.Addresses.name, async (each) => {
        await UPDATE(Persons.cdsName).set({ address_ID: each.ID }).where({ ID: each.person_ID });
    });

}