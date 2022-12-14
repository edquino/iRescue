module.exports = (app, passport) => {

    //authentication - Administrator Chequealo
    require('./auth-user')(app, passport);

    //Maneger - Branche
    require('./auth-administrator-branche.routes')(app, passport);

    //Home 
    app.use(require('./index'));

    //Countries
    app.use(require('./countries/countries.routes'));

    //States
    app.use(require('./states/states.routes'))

    //Municipalities
    app.use(require('./municipalities/municipality.routes'));

    //Administrators
    app.use(require('./administrators/administrators.routes'));

    //Personal Documents
    app.use(require('./personal_documents/personal_documents.routes'));

    //Genders
    app.use(require('./gender/gender.routes'));

};