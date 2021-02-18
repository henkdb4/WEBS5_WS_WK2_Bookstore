var mongoose = require('mongoose');

console.log('Initializing author schema');

var authorSchema = new mongoose.Schema({
    /*
    TODO: 1 - Schema authors vullen
    - Firstname: Verplicht, String
    - Lastname: Verplicht, String
    - Birthdate: Verplicht, Date, voor vandaag
    - Country: String, default: NL
    - Ranking: Number, boven 0
    - Books: Array van book id's
    */

    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    BirthDate: { type: Date, required: true, validate: (input) => { return input && input < new Date() } },
    Country: { type: String, default: "NL" },
    Ranking: { type: Number, min: 0 },
    Books: [{ type: String, ref: 'Book' }],    // Find out
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

/*
    TODO: 7 - Projecting:
    - fullname is een property die opgehaald wordt
    - age is een property die opgehaald wordt
    - numberOfBooks is een property die opgehaald wordt
*/

authorSchema.virtual('fullName').get(function () {
    return this.FirstName + ' ' + this.LastName;
});

authorSchema.virtual('age').get(function () {
    var ageDifMs = Date.now() - this.BirthDate.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
});

authorSchema.virtual('numberOfBooks').get(function () {
    return this.Books.length;
});

authorSchema.query.byFullName = function (fullName) {
    if (fullName) {
        return this.find({ fullName: fullName });
    } else {
        return this.find();
    }
};

mongoose.model('Author', authorSchema);