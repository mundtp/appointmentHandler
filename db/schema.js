const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;


const appointmentSchema = new Schema ({ // establish the properties that we will use for the data
    date: {type: String, required: true},
    time: {type: String, required: true},
    description: {type: String, required: true},
    tags: {type: [String], default: []},
})

module.exports = {
  Appointment: createModel('Appointment', appointmentSchema)
}
