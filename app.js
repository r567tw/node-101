const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const db = require('./util/database');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const User = require("./models/user")
const Product = require('./models/product');
const Cart = require("./models/cart")
const CartItem = require("./models/cart-item")
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })


app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Product = require("./models/product")

db
    .sync()
    // .sync({ force: true })
    .then((res) => {
        console.log("db sync success")
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            return User.create({ name: "test", email: "test@test.com" })
        }
        return user
    })
    .then(user => {
        console.log("User Create success")
        // return user.createCart();
        return user
    }).then(cart => {
        app.listen(3000, () => {
            console.log(`App is listening http://localhost:3000`);
        });
    })
    .catch((err) => console.log(err));

