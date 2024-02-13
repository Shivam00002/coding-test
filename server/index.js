const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const connectDb = require('./src/db/db')
const ProjectsSchema = require('./src/models/projects')
const port = process.env.PORT || 3000;
const multer = require('multer');
const path = require('path');


app.use(cors());
app.use(express.json())

app.get('/', async (req, res) => {
    res.send('Wecome to Homepage!')
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })


//post projects
app.post('/projects', upload.single('file'), async (req, res) => {
    try {
        const { file } = req.file;
        const filepath = file.path;
        const { Name, Description } = req.body;
        const data = {
            Attachment: filepath,
            Name,
            Description
        }
        console.log(data)
        const addingProject = new ProjectsSchema(data)
        console.log("adding" , addingProject)
        const insertProject = await addingProject.save()
        res.status(201).send(insertProject)
    } catch (e) {
        res.status(500).send(e)
    }
})


//get all projects
app.get('/projects', async (req, res) => {
    try {
        const getProjets = await ProjectsSchema.find({})
        res.status(201).send(getProjets)
    } catch (e) {
        res.status(500).send(e)
    }
})


connectDb().then(() => {
    app.listen(port, () => {
        console.log(`server is live at ${port}`)
    })
})


