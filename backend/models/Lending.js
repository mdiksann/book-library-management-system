const moongoose = require('mongoose');

const lendingSchema = new moongoose.Schema({
    book: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowerName: {
        type: String,
        required: true
    },
    borrowerDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['borrowed', 'returned'],
        default: 'borrowed'
    }
});

module.exports = moongoose.model('Lending', lendingSchema);