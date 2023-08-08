const mongo = require("mongodb")

const client = mongo.MongoClient

const mongoConnect = callback => {
    client.connect("mongodb://localhost:27017")
        .then(client => {
            console.log("Connected")
            callback(client)
        }).catch(err => console.log(err))

}

module.exports = mongoConnect;