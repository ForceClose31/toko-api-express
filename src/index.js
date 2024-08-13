const express = require('express');
const usersRoute = require('./routes/users')
const app = express();

// basic route
// app.method(path, handler);

// use biasanya digunakan untuk middleware
// app.use('/', (req, res, next) => {
//     res.send('Hello World')
// })

app.use('/', usersRoute)

app.get('/home', (req, res) => {
    res.send('ini get method');
})

app.post('/login', (req, res) => {
    res.send('ini get method');
})

// respon json
app.get('/home', (req, res) => {
    res.json({ 
        'name' : 'Nur Bashori',
        'umur' : 23
    });
})

app.listen(4000, () => {
    console.log('Server success running');
})