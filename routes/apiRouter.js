let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let Appointment = require('../db/schema.js').Appointment

    // Routes for a Model(resource) should have this structure
apiRouter.post('/appointments', function(request, response) {
    let appointment = new Appointment(request.body) //create new instance of schema from a MONGOOSE model, request.body is all the information that we have taken from the client side and we send it on the body of the request to the server
    appointment.save(function(error) { //saves to db
        if(error) {
            response.send(error)
        }
        else {
            response.json(appointment)
        }
    })
})

apiRouter.put('/appointments/:_id', function(request, response) {
    Appointment.findByIdAndUpdate(request.params._id, request.body,function(error,records){ //saves to db
        if(error) {
            response.send(error)
        }
        else {
            response.json(records)
        }
    })
})

//this route will show us all the neighborhoods posted by all users
apiRouter.get('/appointments', function(request, response) {
    Appointment.find(request.query, function(error, records){  //some methods live directly on the model, so you don't need to create a new instance.
    // request.query parses the parameters and turns them into an object (at this moment we have it just in case)
        if(error) {
            response.send(error)
        }
        else {
            response.json(records)
        }
    })
})

apiRouter.delete('/appointments/:_id', function(req, res){
      Appointment.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })
    })


module.exports = apiRouter