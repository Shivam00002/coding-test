const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    Attachment: String
})

const ProjectsSchema = new mongoose.model('Projects', projectSchema)

module.exports =   ProjectsSchema