const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    admin: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    members: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
})

module.exports = mongoose.model('Project', projectSchema);