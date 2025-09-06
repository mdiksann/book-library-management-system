const moongoose = require('mongoose');

const categorySchema = new moongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = moongoose.model('Category', categorySchema);