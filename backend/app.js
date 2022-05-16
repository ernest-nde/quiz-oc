const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://menders:7Exi9FbFfws-gR3@cluster0.6la0a.mongodb.net/quiz-oc?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true 
    })
  .then(() => console.log('Connexion à la BD Quiz-OC réussie !'))
  .catch(() => console.log('Connexion à la BD Quiz-OC échouée !'));


const Produit = require('./models/Product');


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

// Enregistrement d'un nouveau produit
app.post('/api/products', (req, res, next) => {
    delete req.body._id;
    const produit = new Produit({
        ...req.body
    });
    produit.save()
    .then(() => res.status(201).json({message: 'produit bien enregistré!'}))
    .catch(function(error) {
        res.status(400).json({error});
    });
});

// Récupération d'un produit spécifique
app.post('/api/products/:id', (req, res, next) => {
    Produit.findOne({ _id: req.params.id })
    .then(function(thing) {
        res.status(200).json(thing)
    })
    .catch(function(error) {
        res.status(404).json({error});
    });
});

// Modification d'un produit spécifique
app.put('/api/products/:id', (req, res, next) => {
    Produit.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id})
    .then(() => {
        res.status(200).json({message: 'Produit modifié!'});
    })
    .catch(function(error) {
        res.status(404).json({error});
    });
});

// Récupération d'un produit spécifique
app.delete('/api/products/:id', (req, res, next) => {
    Produit.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({message: 'Produit supprimé!'});
    })
    .catch(function(error) {
        res.status(404).json({error});
    });
});

// Liste de tous les produits disponible
app.get('/api/products', (req, res, next) => {
    Produit.find()
    .then(produits => res.status(200).json(produits))
    .catch(error => res.status(400).json({error}));
});

module.exports = app;