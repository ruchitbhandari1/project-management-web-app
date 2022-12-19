const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    members: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    requests: {
        type: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
                name: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                }
            }
        ]
    }
})

module.exports = mongoose.model('Organization', organizationSchema);