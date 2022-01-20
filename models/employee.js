const mongoose = require('mongoose')

mongoose.Promise=global.Promise

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  responsibility: {
    type: String,
    required: true
  }
})

const employee = mongoose.model('Employee', employeeSchema)

module.exports = employee