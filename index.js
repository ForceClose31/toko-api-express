const express = require('express');
const app = express();

// basic route
// app.method(path, handler);
app.use('/', (req, res, next) => {
    res.send('Hello World')
})


app.listen(4000, () => {
    console.log('Server success running');
})