const express = require('express');
const cors = require('cors');

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

const productBrief1 = {
    id: 'mongooseId',
    name: 'name',
    imgUrl: 'https://placehold.co/300x200',
    category: 'category',
    vendor: 'vendorUsername',
    price: 99
}

const productDetail1 = {
    id: 'mongooseId',
    name: 'name',
    imgUrl: 'https://placehold.co/600x400',
    category: 'category',
    description: 'description text',
    vendor: 'vendorUsername',
    inventory: 10,
    price: 99
}

const cartItem = {
    id: 'mongooseId',
    name: 'name',
    imgUrl: 'https://placehold.co/300x200',
    category: 'category',
    description: 'description text',
    vendor: 'vendorUsername',
    count: 2,
    price: 99
}

function validate(data, res, ok) {
    if (data.every((x) => (x !== undefined))) {
        if (ok) res.json(ok);
    } else {
        res.status(500);
    }
}

app.post('/api/signup', (req, res, next) => {
    const { username, email, password, isVendor/*, imgUrl*/ } = req.body;
    validate([username, email, password, isVendor], res, {
        username,
        token: 'jwtToken'
    });
});

app.post('/api/login', (req, res, next) => {
    const { email, password } = req.body;
    validate([email, password], res, {
        username: 'username',
        token: 'jwtToken'
    });
});

app.get('/api/products', (req, res, next) => {
    res.json([productBrief1, productBrief1]);
});

app.get('/api/products/:productId', (req, res, next) => {
    res.json(productDetail1);
})

app.get('/api/users/:username/products', (req, res, next) => {
    res.json([productBrief1, productBrief1]);
});

app.post('/api/users/:username/products', (req, res, next) => {
    const { name, imgUrl, category, description, inventory, price } = req.body;
    validate([name, imgUrl, category, description, inventory, price], res, productDetail1);
});

app.put('/api/users/:username/products', (req, res, next) => {
    res.json(productDetail1);
});

app.delete('/api/users/:username/products', (req, res, next) => {
});

app.get('/api/cart', (req, res, next) => {
    res.json([cartItem, cartItem]);
});

app.put('/api/cart', (req, res, next) => {
    const { productId, count } = req.body;
    validate([productId, count], res);
});

app.listen(PORT, () => {
    console.log(`MockServer is starting on port ${PORT}`);
});