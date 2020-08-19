var mongoose = require('mongoose');

var setMongoDB = () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(process.env.MONGO_DB);

    var db = mongoose.connection;
    db.once('open', () => console.log('DB connected'));
    db.on('error', err => console.log('DB ERROR : ', err));
}

module.exports = setMongoDB;