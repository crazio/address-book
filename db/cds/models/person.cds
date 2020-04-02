namespace com.leverx.book;

using cuid from '@sap/cds/common';
using com.leverx.book as types from './common/type';
using com.leverx.book.Addresses as Addresses from './address';

entity Persons : cuid {
    firstName  : String(50) not null;
    lastName   : String(50) not null;
    middleName : String(50) not null;
    gender     : types.Gender default 'other';
    address    : Association to Addresses;
}
