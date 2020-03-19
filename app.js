require('dotenv').config();

let express = require('express');
let app = express();

let rating = require('./controllers/ratingcontroller')
let user = require('./controllers/usercontroller')
let store = require('./controllers/storecontroller')

let sequelize = require('./db');
sequelize.sync();
app.use(require('./middleware/headers'));
app.use(express.json());


app.use('/api', user);
app.use(require("./middleware/validateSession"));
app.use('/api/store', store);
app.use('/api/rating', rating);


app.listen(process.env.PORT, () => {
    console.log(`App is listening on ${process.env.PORT}.`)
});
