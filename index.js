const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Listen on port 5000, update console log message accordingly
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
