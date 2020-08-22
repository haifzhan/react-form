const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 5000;

let records = [
    {
        id: 1,
        recordName: 'React Rave',
        artistName: 'The Developers',
        description: 'A rocking good rave bopping to the tune of Javascript'
    },
    {
        id: 2,
        recordName: 'Building a app',
        artistName: 'The components',
        description: 'Sounds of the future'
    }
];

app.get('/api/records', (req, resp) => {
    resp.send(records);
});

app.post('/api/records', (req, resp) => {
    const newRecord = {
        id: records.reduce((acc, item) => 
        { return item.id > acc ? item.id : acc }, 0) + 1,
        ...req.body
    };
    records.push(newRecord);
    resp.send(newRecord);
});

app.listen(5000, () => console.log(`Server listening on port ${port}`));
