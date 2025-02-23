const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String, // "Type" नहीं, "type" होना चाहिए
        required: true,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enum: ["Lender", "Borrower"],
        required: true,
        default: "Lender",
    },
    balance: {  
        type: Number,
        default: 0,
    },
    totalBorrowed: {
        type: Number,
        default: 0,
    },
    totalLent: {  
        type: Number,
        default: 0,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
