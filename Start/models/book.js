const { json } = require('body-parser');
var mongoose = require('mongoose');

console.log('Initializing books schema');

var bookSchema = new mongoose.Schema({
    /*
    TODO: 2 - Schema books vullen
    - Title: Verplicht, String
    - PublishDate: Verplicht, Date, voor vandaag
    - Category: Verplicht, String
    - Chapters: Array van JSON { title, numberOfPages }
    */

    _id: { type: String },
    Title: { type: String, required: true },
    PublishDate: { type: Date, required: true, validate: (input) => { return input && input < new Date() } },
    Category: { type: String, required: true },
    Chapters: [{
        title: { type: String, required: true },
        numOfPages: { type: Number, required: true, min: 1 },
    },
    ],
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

/*
TODO: 5 - Virtual property totalNumberOfPages, opgebouwd uit numberOfPages van chapters)
- De benodigde extra validation -- Welke validatie?
- De benodigde query methods    -- Welke query Methods?
- De benodigde instance methods -- Welke instance methods?
*/

bookSchema.virtual('totalNumberOfPages').get(function() {

    let nrOfPages = 0;

    this.Chapters.forEach(chapter => {
        nrOfPages += chapter.numOfPages;
    });

    return nrOfPages;
});

mongoose.model('Book', bookSchema);
