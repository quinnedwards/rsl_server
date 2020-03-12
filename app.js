require('dotenv').config();

let express = require('express');
let app = express();

// let store = require('./controllers/storecontroller')
let user = require('./controllers/usercontroller')
let rating = require('./controllers/ratingcontroller')

let sequelize = require('./db');
sequelize.sync();
app.use(express.json());

app.use(require('./middleware/headers'));

app.use('/api/user', user);
app.use(require("./middleware/validateSession"));
app.use('/api/rating', rating);


app.listen(3003, function(){
    console.log('App is listening on 3002.')
});
