const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');
const logUserRequest = require('./middleware/auth');
const bodyParser = require('body-parser');

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(logUserRequest);

app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
