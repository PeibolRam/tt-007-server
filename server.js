const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

const  { User } = require('./models/user')
const { Property } = require('./models/property')
const { auth } = require('./middleware/auth')

require('dotenv').config();



mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if(err) return err
    console.log("Conectado a MongoDB")
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.get('/', auth, (req, res) => {
    res.send('TT20-2-007');
})


//Rutas user
app.post('/users/register', (req, res) => {
    const user = new User(req.body)
    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })
})

app.post('/users/login', (req, res) => {
    User.findOne({'email': req.body.email}, (err,user) => {
        if(!user) return res.json({loginSuccess: false, message: 'Auth fallida, email no encontrado'})

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({loginSuccess: false, message: "Contraseña incorrecta"})

            user.generateToken((err, user)=> {
                if(err) return res.status(400).send(err)
                res.cookie('b_auth', user.token).status(200).json(
                    {
                        loginSuccess: true,
                        token: user.token
                    }
                )
            })
        })
    })
})

app.get('/users/auth', auth, (req, res) => {
    res.status(200).json({
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        token: req.user.token
    })
})

app.get('/user/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {token: ''},
        (err, doc) => {
            if(err) return res.json({success: false, err})
            return res.status(200).json({
                success: true
            })
        }
    )
})

//Rutass propiedades

app.post('/properties/register', (req, res) => {
    const property = new Property(req.body)
    property.save((err, doc) => {
        if(err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            propertydata: doc
        })
    })
})

app.get('/properties', (req, res) => {
    Property.find({}, (err, properties) => { 
        if(err) return res.status(400).send(err)
        res.status(200).send(properties)
    })
})

app.put('/properties/:id', function(res,req) {
    console.log(req.params)        
});


app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})
