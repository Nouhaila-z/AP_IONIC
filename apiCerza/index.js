const express = require('express'); //express 
const bodyParser = require('body-parser'); //analyser JSON
const app = express();
const port = 3000;
const animaux = require('./routes/animaux'); //appelle route jeux



app.use(bodyParser.json()); //pour le HTML

app.use(
    bodyParser.urlencoded({ //analyser l'URL
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({ 'message': 'ok' });
})

app.use('/animaux', animaux);




/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });


    return;
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});