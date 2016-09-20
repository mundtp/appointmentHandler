import Backbone from 'backbone'
import $ from 'jquery'
import {app_name} from '../app'

const AppointmentModel = Backbone.Model.extend({
	urlRoot: '/api/appointments',
	idAttribute: '_id'
})

const AppointmentCollection = Backbone.Collection.extend ({
	model: AppointmentModel,
	url: '/api/appointments'

})


export { AppointmentModel, AppointmentCollection }
