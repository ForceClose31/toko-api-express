const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const usersRoute = require('./routes/users');
const logUserRequest = require('./middleware/logs');
const bodyParser = require('body-parser');

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(logUserRequest);

app.use('/api/users', usersRoute);

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
