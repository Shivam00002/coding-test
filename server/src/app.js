const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const connectDb = require('./db/db');
const ProjectsSchema = require('./models/projects');
const port = process.env.PORT || 5000;


app.use('/images', express.static('images'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', async (req, res) => {
    res.send('Welcome to Homepage!');
});

const myKey = 'shivamsdverdfvrergverfgrverfgverfgverfdgverdfgvedrfgvedrfgvedrfg';
// Login route
app.post('/login', (req, res) => {
    const user = { email: 'dubey02shiv@gmail.com', password: 12345 };
    const secretKey = process.env.JWT_SECRET || myKey;
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

    res.cookie('jwt', token, { httpOnly: true });
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

// Update project by ID
app.put('/project/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const Bids = req.body.Bids;
        const updatedUser = await ProjectsSchema.findOneAndUpdate(
            { _id: userId },
            { $set: { Bids } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(updatedUser);
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
