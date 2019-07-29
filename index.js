const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

const DB_LOCAL = 'mongodb://localhost:27017/issue-tracker'
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Connecting to our mongodb database
mongoose.connect(DB_LOCAL)
    .catch(err => console.log(err))
    .then(() => {
        console.log("Connected to DB successfully")
    })

// User Routes
const UserModel = require('./models/user.model');
//Create User
app.post('/user', (req, res, next) => {
    let user = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
    UserModel.create(user, (err, response) => {
        if(err) {
            console.log(err);
            return;
        }
        res.json(response);
    })
})

app.get('/user', (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/test', (req, res) => res.json({
    message: "Cohuni o njerz"
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))