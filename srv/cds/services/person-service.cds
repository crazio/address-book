namespace com.leverx.book;

using com.leverx.book as model from '../../../db/index';

service PersonService @(impl : '../../src/handlers/person-service.js') {

    // @odata.draft.enabled
    // entity Persons as projection on model.Persons;
    // entity Addresses as projection on model.Addresses;
    @readonly
    entity Genders as projection on model.Genders;

    @odata.draft.enabled
    entity PersonAttributes as projection on model.PersonAttributes;

}
