const mongo = require("mongodb")

const client = mongo.MongoClient
let _db

const mongoConnect = callback => {
    client.connect("mongodb://localhost:27017/shop")
        .then(client => {
            console.log("Connected")
            _db = client.db();
            callback()
        }).catch(err => console.log(err))

}

const getDb = () => {
    if (_db) {
        return _db
    }
    throw "No Database Found"
}

module.mongoConnect = mongoConnect;
module.getDb = getDb;