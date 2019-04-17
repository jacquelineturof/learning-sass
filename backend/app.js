require('./config/config');

const cors       = require('cors');
const axios      = require('axios');
const express    = require('express');
const bodyParser = require('body-parser');

const generateList = require('./utils/dataUtil');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const baseUrl = 'https://wordsapiv1.p.mashape.com/words/';

app.get('/test', (req, res) => {
    res.send('test');
});

app.get('/:dataType/:word', async (req, res) => {
    const word = req.params.word;
    const dataType = req.params.dataType;

    // Make call to words api
    try {
        const response = await axios.get(baseUrl + word + '/' + dataType,
            {
                headers: {
                    "X-MaShape-key": process.env.apiKey
                }
            });
            // Properly format data and send to frontend
            // Not all data we're recieving has the same structure
        res.send(response.data[dataType]);
    } catch (e) {
        res.send(e.message);
    }
});

app.listen(port, () => {
    console.log('Server starting on', port);
});