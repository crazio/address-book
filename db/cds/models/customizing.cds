namespace com.leverx.book;

entity Genders {
    @sap.text: 'name'
    key ID   : Integer @title: 'ID';
        name : localized String(10) @title: 'Name';
}
