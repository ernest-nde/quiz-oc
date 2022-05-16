const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('server oK!');
    next();
});

app.use((req, res) => {
    res.status(200).json({message: 'Le serveur est bien ouvert!'});
});

module.exports = app;