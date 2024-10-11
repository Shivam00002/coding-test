const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    Attachment: String,
    Bids: Number
})


const ProjectsSchema = new mongoose.model('Projects', projectSchema)

module.exports = ProjectsSchema