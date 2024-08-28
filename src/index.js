const express = require('express');
const { connectDB, sequelize } = require('./config/database');
const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');
const transactionsRoute = require('./routes/transactions');
const { authenticateToken } = require("./middleware/auth");
const { authorizeAdmin } = require("./middleware/auth");
const bodyParser = require('body-parser');

const app = express();

connectDB();

app.use(bodyParser.json());

app.use(authenticateToken);
app.use(authorizeAdmin);

app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);
app.use('/api/transactions', transactionsRoute);

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
