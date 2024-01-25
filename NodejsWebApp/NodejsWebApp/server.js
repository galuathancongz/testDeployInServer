const express = require('express');
const app = express();
const port = 3000;

// ??nh ngh?a m?t route ??n gi?n
app.get('/', (req, res) => {
    res.send('HelloWord!');
});

// B?t ??u l?ng nghe tr�n c?ng ?� ch?n
app.listen(port, () => {
    console.log(`ServerRunning in :${port}`);
});