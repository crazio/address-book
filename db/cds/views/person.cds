namespace com.leverx.book;

using com.leverx.book as data from '../models/index';

entity PersonAttributes as
    select from data.Persons {
        *,
        address.city         as city,
        address.postalCode   as postalCode,
        address.street       as street,
        address.houseNumber  as houseNumber,
        address.roomNumber   as roomNumber,
        address.phone        as phone,
        address.email        as email,
        address.extraEmail   as extraEmail,
        address.countryCode  as countryCode,
        address.country.name as country
    }
    excluding {
        address
    };
