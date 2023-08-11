const Tag = require('../models/tag');

exports.getTag = (req, res, next) => {
    res.render('admin/edit-tag', {
        pageTitle: 'Add Tag',
        path: '/admin/add-tag',
        editing: false
    });
};

exports.postTag = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;

    const tag = new Tag(title, price, description)
    tag.save().then((tag) => {
        console.log(tag)
        res.redirect('/')
    }).catch((err) => { console.log(err) });

};

