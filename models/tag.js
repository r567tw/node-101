// use mongo
const getDb = require("./util/mongo").getDb

class Tag {
    constructor(title, price, description) {
        this.title = title
        this.price = price
        this.description = description
    }

    save() {
        const db = getDb()
        db.collection('tags').insertOne(this).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.error(err)
        })
    }
}

module.exports = Tag;
