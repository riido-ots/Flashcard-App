const express = require("express");
const Datastore = require('nedb');

const app = express();
app.use(express.static('public', { index: 'revise.html' }));
const port = process.env.PORT || 8180;
app.listen(port, () => console.log(`listening on ${port}`));
app.use(express.json({ limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase(); 

app.get('/dataStorage', (request, response) => {
    database.find({}, (err, data) => {
        response.json(data);
    });
});

app.post('/dataStorage', (request, response) => {
    console.log("I got a request!")
    console.log(request.body);
    database.insert(request.body);
    response.json({
        status: 'success',
        question: request.body.question,
        answer: request.body.answer
    });
});

app.post('/dataDelete', (request, response) => {
    console.log("I got a delete request!");
    console.log(request.body);
    database.remove({ question: request.body.question,
        answer: request.body.answer });
    response.json({
        status: 'success',
        question: request.body.question,
        answer: request.body.answer
    });
});