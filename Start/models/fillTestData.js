let mongoose = require('mongoose');
Book = mongoose.model('Book');
Author = mongoose.model('Author');

let book_seed = [
    // TODO: 4 - Testdata voor boeken maken.

    // Vul hier je testdata voor boeken in
    // In je /models/book.js staat welke velden je nodig hebt.

    {
        _id: '1' ,
        Title: "Harry Potter",
        PublishDate: new Date(2003, 04, 03),
        Category: "Fantasy",
        Chapters: [
            { title: "Chapter 1", numOfPages: 12 },
            { title: "Chapter 2", numOfPages: 32 },
            { title: "Chapter 3", numOfPages: 45 },
        ]
    }, {
        _id: '2',
        Title: "Hunger Games",
        PublishDate: new Date(2008, 04, 03),
        Category: "Fantasy",
        Chapters: [
            { title: "Chapter 1", numOfPages: 12 },
            { title: "Chapter 2", numOfPages: 32 },
            { title: "Chapter 3", numOfPages: 45 },
        ]
    },
    {
        _id: '3',
        Title: "Eragon",
        PublishDate: new Date(2010, 04, 03),
        Category: "Fantasy",
        Chapters: [
            { title: "Chapter 1", numOfPages: 12 },
            { title: "Chapter 2", numOfPages: 32 },
            { title: "Chapter 3", numOfPages: 45 },
        ]
    },
];

let author_seed = [
    // TODO: 3 - Testdata voor authors maken.

    // Vul hier je testdata voor authors in 
    // In je /models/author.js staat welke velden je nodig hebt.

    {
        FirstName: "J.K.",
        LastName: "Rowling",
        BirthDate: 08-09-1970,
        Country: "EN",
        Ranking: 1,
        Books: ['1'],
    },
    {
        FirstName: "Christopher", LastName: "Paolini",
        BirthDate: 28-06-1965,
        Country: "US",
        Ranking: 2,
        Books: ['3'],
    },
    {
        FirstName: "Suzanne",
        LastName: "Collins",
        BirthDate: 04-12-1985,
        Country: "US",
        Ranking: 3,
        Books: ['2'],
    },
    
];


module.exports = function () {
    let Book = mongoose.model('Book');
    Book.find({}).then(books => {
        if (!books.length) {
            console.log('\tNo books found, filling testdata');
            Book.insertMany(book_seed)
                .then(() => console.log('\tFilling book testdata succesfull'))
                .catch(err => console.log('\tFilling book testdata failed', err));
        }
    });

    let Author = mongoose.model('Author');
    Author.find({}).then(authors => {
        if (!authors.length) {
            console.log('\tNo authors found, filling testdata');
            Author.insertMany(author_seed)
                .then(() => console.log('\tFilling author testdata succesfull'))
                .catch(err => console.log('\tFilling author testdata failed', err));
        }
    });
}