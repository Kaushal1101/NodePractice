const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    }, 
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true
    }, password: {
        type: String,
        required: [true, 'Please enter password']
    },
    role: {
        type: String,
        enum: ["basic", "premium"],
        default: "basic"
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)