namespace com.leverx.book;

using com.leverx.book as model from '../../../db/index';

service AddressBookService @(impl : '../../src/handlers/address-book-service.js') {

    @odata.draft.enabled
    entity Persons   as projection on model.Persons;
    entity Addresses as projection on model.Addresses;
    entity Genders   as projection on model.Genders;

}
