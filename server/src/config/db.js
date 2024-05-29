const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://aditi786:aditi786@cluster0.kcvmvou.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const conneciton = mongoose.connection;

module.exports = conneciton;