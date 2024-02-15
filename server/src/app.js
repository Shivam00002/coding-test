const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const mongoose = require('mongoose');

const connectDb = require('./db/db');
const ProjectsSchema = require('./models/projects');
const port = process.env.PORT || 5000;

app.use('/images', express.static('images'));

const whitelist = ["http://localhost:5173"];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,

};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/', async (req, res) => {
    res.send('Welcome to Homepage!');
});

const myKey = 'shivamsdverdfvrergverfgrverfgverfgverfdgverdfgvedrfgvedrfgvedrfg';

// Login route
app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (email != 'dubey02shiv@gmail.com') {
        res.status(500).send('Email is not valid')
    }
    if (password != 12345) {
        res.status(500).send('Password is not valid')
    }
    const secretKey = process.env.JWT_SECRET || myKey;
    const token = jwt.sign({ email }, secretKey, { expiresIn: '2h' });
    res.cookie('jwt', token, { httpOnly: false });
    res.status(200).send('Login successful');
});

// Protected route with token verification
app.get('/protected', (req, res) => {
    const receivedToken = req.cookies.jwt;
    if (!receivedToken) {
        return res.status(401).send('Unauthorized');
    }
    const secretKey = process.env.JWT_SECRET || myKey
    try {
        const decoded = jwt.verify(receivedToken, secretKey);
        res.status(200).send(`Welcome, ${decoded.email}!`);
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
});


// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage }).single('Attachment');

// Post projects
app.post('/projects', upload, async (req, res) => {
    try {
        const file = req.file;
        const filepath = file.path;
        const { Name, Description } = req.body;
        const data = {
            Attachment: filepath,
            Name,
            Description,
            Bids: 0
        };
        const addingProject = new ProjectsSchema(data);
        const insertProject = await addingProject.save();
        res.status(201).send(insertProject);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Get all projects
app.get('/projects', async (req, res) => {
    try {
        const getProjects = await ProjectsSchema.find({});
        res.status(200).send(getProjects);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Delete by ID
app.delete('/projects/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        await ProjectsSchema.findByIdAndDelete(_id);
        res.json({ success: 'Record Deleted!' });
    } catch (e) {
        res.status(500).send(e);
    }
});

// Increase the bis count by 1
app.put('/update/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ error: 'Invalid project ID' });
        }
        const updatedProject = await ProjectsSchema.findOneAndUpdate(
            { _id: projectId },
            { $inc: { Bids: 1 } },
            { new: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Deccrease the bis count by 1
app.put('/cancel/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ error: 'Invalid project ID' });
        }
        const updatedProject = await ProjectsSchema.findOneAndUpdate(
            { _id: projectId },
            { $inc: { Bids: -1 } },
            { new: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});






connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is live at ${port}`);
    });
});
