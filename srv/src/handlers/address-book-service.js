const events = require('../constants/events');

const { AddressBookService } = require('../constants/cdsGen/services.json');

module.exports = (srv) => {

    srv.before(events.CREATE_EVENT, AddressBookService.entities.Addresses.name, (req) => {
        //Do validation here
    });
    
}