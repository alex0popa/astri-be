// const Cors = require('cors');
// const express = require('express');
// const mongoose = require('mongoose');

// const Cards = require('./dbCards.js');

import Cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import Cards from './dbCards.js';

// App config
const app = express();
const port = process.env.PORT || 8001;

const connection_url = 'mongodb+srv://admin:QmWxFU2TySz16rtX@tinder-cluster' +
  '.7obvj.mongodb.net/tinderdb?retryWrites=true&w=majority';

// Middleware
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

// Api endpoints
app.get('/', (req, res) => res.status(200).send('Hello mongoose'));

app.post('/tinder/cards', (req, res) => {
  const dbCard = req.body;
  // console.log(dbCard)
  Cards.create(dbCard, (err, data) => {
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post('/tinder/remove', (req, res) => {
  const { id } = req.body
  Cards.findByIdAndRemove(id, (err, docs) => {
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`Deleted ${id}`);
    }
  })
})

app.get('/tinder/cards', (req, res) => {
  Cards.find((err, data) => {
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`listening on: ${port}`));