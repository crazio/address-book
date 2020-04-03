const events = require('../constants/events');

const { AddressBookService } = require('../constants/cdsGen/services.json');

module.exports = srv => {

    srv.after(events.READ_EVENT, AddressBookService.entities.Persons.name, each => {
        each.fullName = [each.firstName, each.middleName, each.lastName].filter(str => str).join(' ');
    });

}