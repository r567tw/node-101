// use mongo
const getDb = require("../util/mongo").getDb

class Tag {
    constructor(title, price, description) {
        this.title = title
        this.price = price
        this.description = description
    }

    save() {
        const db = getDb()
        return db.collection('tags').insertOne(this).then((result) => {
            console.log("tag created")
            console.log(result)
        }).catch((err) => {
            console.error(err)
        })
    }
}

module.exports = Tag;
