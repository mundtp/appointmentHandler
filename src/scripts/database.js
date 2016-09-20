import Backbone from 'backbone'
import _ from 'underscore'
import {AppointmentCollection} from './models/models'

const DATABASE = _.extend(Backbone.Events, {

	data: {
		collection: new AppointmentCollection(),
	},

	_emitChange: function(){
		this.trigger('updateContent')

	},

	_getData: function() {
		return _.clone(this.data)
	},

	_initialize: function(){
		this.data.collection.on('sync update sort', this._emitChange.bind(this))
	}
})

DATABASE._initialize()

export default DATABASE