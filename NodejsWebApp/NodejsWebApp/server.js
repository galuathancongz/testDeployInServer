const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('HelloWord!');
});
//
app.listen(port, () => {
    console.log(`ServerRunning in :${port}`);
});