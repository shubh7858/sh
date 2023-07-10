const express = require('express');

const app = express.Router();
const mysql = require('mysql');

var connection = mysql.createConnection({
    host        :'localhost',
    user        :'root',
    password    :'manager',
    database    :'exam'
});

app.get('/', (request, response) =>
{
    var query = 'select * from Book_Tb';
    connection.query(query, (error, result)=>
    {
        if(error==null)
        {
            var data = JSON.stringify(result);
            response.setHeader('Content-Type', 'application/json');
            response.write(data);
        }
        else
        {
            console.log(error);
            response.setHeader('Content-Type', 'application/json');
            response.write(error);
        }
        response.end();
    })
});

app.post('/', (request, response)=>{
    var query = `insert into Book_Tb values(${request.body.id}, '${request.body.b_name}','${request.body.author}','${request.body.book_type}', ${request.body.price}, '${request.body.publishedDate}', '${request.body.language}')`;

    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result) 
            response.setHeader("Content-Type","application/json");
            response.write(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)
        }
        response.end();
})
})

app.put('/:id', (request, response)=>{
    var query = `update Book_Tb set price = ${request.body.price}, language='${request.body.language}' where id=${request.params.id}`;

    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result) 
            response.setHeader("Content-Type","application/json");
            response.write(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)
        }
        response.end();
})
})

module.exports = app;