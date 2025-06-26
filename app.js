const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let vehicles = [];
let id = 1;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { vehicles });
});

app.get('/vehicles/new', (req, res) => {
  res.render('new');
});

app.post('/vehicles', (req, res) => {
  const { vehicleName, price, image, desc, brand } = req.body;
  vehicles.push({ id: id++, vehicleName, price, image, desc, brand });
  res.redirect('/');
});

app.get('/vehicles/edit/:id', (req, res) => {
  const vehicle = vehicles.find(v => v.id == req.params.id);
  res.render('edit', { vehicle });
});

app.post('/vehicles/update/:id', (req, res) => {
  const { vehicleName, price, image, desc, brand } = req.body;
  const index = vehicles.findIndex(v => v.id == req.params.id);
  vehicles[index] = { id: parseInt(req.params.id), vehicleName, price, image, desc, brand };
  res.redirect('/');
});

app.post('/vehicles/delete/:id', (req, res) => {
  vehicles = vehicles.filter(v => v.id != req.params.id);
  res.redirect('/');
});

app.get('/api/vehicles', (req, res) => {
  res.json(vehicles);
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
