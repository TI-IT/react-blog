const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('./models/User')
const Post = require('./models/Post')
const bcrypt = require('bcryptjs');
const app = express()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

//Для получения файлов(Изображения)
const multer = require('multer')
const uploadMiddleWare = multer({dest: 'uploads/'})
const fs = require('fs')

//шифрование пароля
let salt = bcrypt.genSaltSync(10);
//Веб токен secret
const secret = 'cf26354gd6f54g6d54f6gasdfasfasfeas56454as'

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
//Для анализа получаемых данных
app.use(express.json())
app.use(cookieParser())
//Для отдачи статических файлов
app.use('/uploads', express.static(__dirname + '/uploads'))

const url = 'mongodb://127.0.0.1:27017/posts';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(`Failed to connect to MongoDB: ${err}`));

app.get('/', (req, res) => {
    res.json('Server connect');
})

app.post('/register', async (req, res) => {
    const {userName, password} = req.body
    try {
        const userDoc = await User.create({
            userName,
            password: bcrypt.hashSync(password, salt)
        })
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e)
    }
});

app.post('/login', async (req, res) => {
    const {userName, password} = req.body
    const userDoc = await User.findOne({userName})
    const passwordOk = bcrypt.compareSync(password, userDoc.password);
    if (passwordOk) {
        jwt.sign({userName, id: userDoc._id}, secret, {}, (err, token) => {
            if (err) throw err
            res.cookie('token', token).json({
                id: userDoc._id,
                userName,
            });
        })
    } else {
        res.status(400).json('Ощибка логина')
    }
});

app.get('/profile', (req, res) => {
    //Проверяем Token
    const {token} = req.cookies
    if(token){
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err
            res.json(info);
        })
    }else {
        res.json('Token-не найден');
    }

})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

app.post('/post', uploadMiddleWare.single('file'), async (req, res) => {
    const {originalname, path} = req.file
    const parts = originalname?.split('.')
    const ext = parts[parts?.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    const {token} = req.cookies
    if(token){
        jwt.verify( token, secret, {}, async (err, info) => {
            if (err) throw err
            const {title, summary, content} = req.body
            const postDoc = await Post.create({
                title,
                summary,
                content,
                cover: newPath,
                author: info.id,
            })
            res.json(postDoc);
        })
    }else {
        res.json('Не найден токен');
    }
})

app.get('/post', async (req, res)=>{
    res.json(
        await Post.find()
            .populate('author', ['userName'])
            .sort({createdAt: -1})
            .limit(20)
    )
})

app.get('/post/:id', async (req,res)=>{
    const {id} = req.params
    const postDoc = await Post.findById(id)
        .populate('author', ['userName'])
    res.json(postDoc)
})

// app
app.listen(4004);