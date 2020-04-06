using com.leverx.book as addressBook from '../services/address-book-service';

annotate addressBook.Persons with @(
    UI : {
        HeaderInfo      : {
            TypeName       : '{i18n>person}',
            TypeNamePlural : '{i18n>persons}',
            Title          : {Value : fullanme}
        },

        SelectionFields : [
        firstName,
        lastName
        ],

        LineItem        : [
        {
            $Type : 'UI.DataField',
            Value : firstName
        },
        {
            $Type : 'UI.DataField',
            Value : lastName
        },
        {
            $Type : 'UI.DataField',
            Value : middleName
        },
        {
            $Type : 'UI.DataField',
            Value : gender.name,
            Label : '{i18n>gender}'
        }
        ]
    },

    UI : {
        Facets                  : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>generalInfo}',
            Target : '@UI.FieldGroup#GeneralInfo'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>addressInfo}',
            Target : '@UI.FieldGroup#AddressInfo'
        }
        ],

        FieldGroup #GeneralInfo : {Data : [
        {
            $Type : 'UI.DataField',
            Value : firstName
        },
        {
            $Type : 'UI.DataField',
            Value : lastName
        },
        {
            $Type : 'UI.DataField',
            Value : middleName
        },
        {
            $Type : 'UI.DataField',
            Value : gender_ID,
            Label : '{i18n>gender}'
        }
        ]},

        FieldGroup #AddressInfo : {Data : [
        {
            $Type : 'UI.DataField',
            Value : address.city,
            Label : '{i18n>city}'
        },
        {
            $Type : 'UI.DataField',
            Value : address.postalCode,
            Label : '{i18n>postalCode}'
        },
        {
            $Type : 'UI.DataField',
            Value : address.street,
            Label : '{i18n>street}'
        },
        {
            $Type : 'UI.DataField',
            Value : address.houseNumber,
            Label : '{i18n>houseNumber}'
        },
        {
            $Type : 'UI.DataField',
            Value : address.roomNumber,
            Label : '{i18n>roomNumber}'
        },
        {
            $Type : 'UI.DataField',
            Value : address.phone,
            Label : '{i18n>phone}'
        },
        {
            $Type : 'UI.DataField',
            Value : address.email,
            Label : '{i18n>email}'
        },
        {
            $Type : 'UI.DataField',
            Value : address.extraEmail,
            Label : '{i18n>extraEmail}'
        },
        {
            $Type : 'UI.DataField',
            Value : address.country.name,
            Label : '{i18n>countryName}'
        }
        ]}

    }

) {

    gender @(Common : {
        ValueList : {
            Label          : '{i18n>gender}',
            CollectionPath : 'Genders',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : gender_ID,
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name'
            }
            ]
        }
    });

    firstName
           @Search.defaultSearchElement : true
           @title                       : '{i18n>firstName}';

    lastName
           @Search.defaultSearchElement : true
           @title                       : '{i18n>lastName}';

    middleName
           @title                       : '{i18n>middleName}';

    gender
           @title                       : '{i18n>gender}';

    address
           @title                       : '{i18n>address}';

    fullName
           @title                       : '{i18n>fullName}';

}
