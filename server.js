const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    //const quotes = [{quote:'It\'s a good time', person:'Jaba daba du'}]
    //const responseVar = JSON.stringify(quotes);
    //res.send(responseVar);
    const randomQuote = {quote: getRandomElement(quotes)};
    const jsonResponse = JSON.stringify(randomQuote);
    res.send(jsonResponse);
});

app.get('/api/quotes', (req, res, next) => {
    let allQuotes;
    if(!req.query.person){
        allQuotes = {quotes: quotes}; 
    } else {
        //console.log('In app.get /api/quotes');
        const personInQuotes = req.query.person;
        //console.log(personInQuotes);
        const foundQuotes = quotes.filter(item => {return item.person === personInQuotes});
        //console.log(foundQuotes);
        allQuotes = {quotes: foundQuotes};
        //console.log(allQuotes);    
    }
    const jsonResponse = JSON.stringify(allQuotes);
    res.send(jsonResponse);
});

app.post('/api/quotes', (req, res, next) => {
    const newQuote = {
        quote: req.query.quote,
        person: req.query.person
    };
    if(newQuote.quote && newQuote.person){
        quotes.push(newQuote);
        res.send({ quote: newQuote });
    } else {
        res.status(400).send();
    }
});

/*app.post('/api/quotes', (req, res, next) => {
    const getQuote = req.query.quote;
    const getPerson = req.query.person;
    const newQuote = {quote: getQuote, person: getPerson}
    quotes.push(newQuote);
    console.log(quotes);
})*/

app.listen(PORT, () => {
    console.log(`The server is listening at ${PORT}`)
})

