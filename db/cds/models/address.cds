namespace com.leverx.book;

using cuid from '@sap/cds/common';
using sap.common.Countries as Country from '@sap/cds/common';
using com.leverx.book.Persons as Persons from './person';

entity Addresses : cuid {
    city        : String(40) not null;
    postalCode  : String(18) not null;
    street      : String(60) not null;
    houseNumber : String(10) not null;
    roomNumber  : String(10);
    phone       : String(30);
    email       : String(255);
    extraEmail  : String(255);
    countryCode : String(3) not null;
    person      : Association to Persons;
    country     : Association to Country
                      on country.code = countryCode;
}
