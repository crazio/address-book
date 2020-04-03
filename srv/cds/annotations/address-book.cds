using com.leverx.book as addressBook from '../services/address-book-service';

annotate addressBook.Persons with @(
    UI : {
        HeaderInfo      : {
            TypeName       : '{i18n>person}',
            TypeNamePlural : '{i18n>persons}',
            Value          : fullName
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
        Facets                  : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>generalInfo}',
            Target : '@UI.FieldGroup#GeneralInfo'
        }],

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
        ]}

    }

) {

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

}
