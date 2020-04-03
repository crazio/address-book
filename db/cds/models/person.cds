namespace com.leverx.book;

using cuid from '@sap/cds/common';
using com.leverx.book.Addresses as Addresses from './address';
using com.leverx.book as customizing from './customizing';

entity Persons : cuid {
    firstName        : String(50) not null;
    lastName         : String(50) not null;
    middleName       : String(50);
    gender           : Association to customizing.Genders;
    address          : Association to Addresses;
    virtual fullName : String(150);
}
