const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();
require('./models/database');

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 5000);

app.listen(process.env.PORT || 5000, (err) => {
  if (err) console.log(err);

  console.log('Express running app on', app.get('port'));
});