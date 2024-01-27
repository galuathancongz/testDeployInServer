const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/apitest', (req, res) => {
    res.send('HelloWord! Day la API test');
});
//
app.listen(port, () => {
    console.log(`ServerRunning in :${port}`);
});