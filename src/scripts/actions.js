import {AppointmentModel} from './models/models'
import DATABASE from './database'

const ACTIONS = {

    saveAppointment: function(appointmentObj){
        var appointment = new AppointmentModel(appointmentObj)
        appointment.save().then(
            (responseData) => {
                if(responseData.name){
                    alert('Validation Error, appointment was not saved. Please enter a date, time, and description.')
                }
                else{
              console.log(responseData)
                }
            },
            (err) => {
              alert('Failure')
              console.log(err)
            }
        )
    },
    getAppointments: function(tags){
          DATABASE.data.collection.fetch({
                data: {
                    tags: tags
                }
          })
    },
}

export default ACTIONS