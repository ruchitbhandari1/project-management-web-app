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
    tasks: {
        type: [Schema.Types.ObjectId],
        ref: 'Task',
    },
    totalTasks: {
        type: Number,
        default: 0,
    },
    completedTasks: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('Project', projectSchema);