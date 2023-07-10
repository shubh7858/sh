const express = require('express');
const cors = require('cors');

const routes = require('./routes/book');

const app = express();
app.use(cors('*'));

app.use((request, response, next) =>
{
    next();
})

app.use(express.json());

app.use('/book', routes);

app.listen(8500, '0.0.0.0', ()=>
{
    console.log("Server started at 8500");
});