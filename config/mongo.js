const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/tao';
// var Schema = mongoose.Schema;

module.exports = {
    connect: () => {
        let db = mongoose.connection;

        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        db.on('error', function () {
            console.log('error')
        })

        db.once('open', function () {
            console.log('MongoDB connect successful!');
        })
    }
}