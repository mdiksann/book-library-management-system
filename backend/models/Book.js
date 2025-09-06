const moongoose = require('mongoose');

const bookSchema = new moongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    publishedDate: {
        type: Date,
    },
    availableCopies: {
        type: Number,
        default: 1,
    },
    totalCopies: {
        type: Number,
        default: 1,
    }
});

module.exports = moongoose.model('Book', bookSchema);
