import React from 'react'
import ACTIONS from './actions'
import DATABASE from './database'
import {AppointmentModel} from './models/models'
import $ from 'jquery'

const HomeView = React.createClass({
	getInitialState: function() {
		return DATABASE._getData()
	},

	componentWillMount: function (){
		ACTIONS.getAppointments()
		DATABASE.on('updateContent', ()=>{
			this.setState(DATABASE._getData())
		})
		
	},
	componentWillUnmount: function(){
		DATABASE.off('updateContent')
	},
	
	 render: function() {
	 	return (
	 		<div className="composeView" >
	 			<NewButton />
	 			<CancelButton />
	 			<AppointmentPostingForm />
	 			<SearchBar />
	 			<AppointmentContainer appointmentColl={this.state.collection}/>
	 		</div>
	 	)
 	}
})

const NewButton = React.createClass({
	_toggleForm: function() {
		var formNode = document.querySelector('.postingForm')
		var newButton = document.querySelector('.new')
		var cancelButton = document.querySelector('.cancel')
		formNode.style.display = 'block'
		newButton.style.display = 'none'
		cancelButton.style.display = 'block'
	},
	render: function() {
		return (
			<div >
	 			<button className='new' onClick={this._toggleForm}>New</button>
	 		</div>
			)
	}
})

const CancelButton = React.createClass({
	_toggleForm: function() {
		var formNode = document.querySelector('.postingForm')
		var newButton = document.querySelector('.new')
		var cancelButton = document.querySelector('.cancel')
		formNode.style.display = 'none'
		newButton.style.display = 'block'
		cancelButton.style.display = 'none'
		
	},
	render: function() {
		return (
			<div >
	 			<button className='cancel' onClick={this._toggleForm}>Cancel</button>
	 		</div>
			)
	}
})

const AppointmentPostingForm = React.createClass({
	_handleCompose: function(e){
		e.preventDefault()
		ACTIONS.saveAppointment({
			date: e.currentTarget.date.value,
			time: e.currentTarget.time.value,
			description: e.currentTarget.description.value,
			tags: e.currentTarget.description.value.split(" "),
		})
		ACTIONS.getAppointments()
		e.currentTarget.date.value = ""
		e.currentTarget.time.value = ""
		e.currentTarget.description.value = ""
	},

	render: function() {
		return (
			<div className="postingForm">
				<h2>Posting Form</h2>
				<form onSubmit={this._handleCompose}>
					<textarea name="date" placeholder="Date"></textarea>
					<textarea name="time" placeholder="Time"></textarea>
					<textarea name="description" placeholder="Description"></textarea>
					<button type='submit'>Add</button>
				</form>
			</div>
			)
	}
})

const SearchBar = React.createClass({
	_handleClick: function(){
		var searchInput = document.getElementById('searchBar').value
		this._handleTagSearch(searchInput)
	},
	_handleTagSearch: function(searchInput) {
			if(searchInput === ""){
				ACTIONS.getAppointments()
			}
			else{
	        	ACTIONS.getAppointments(searchInput)
	    	}
	    	document.getElementById('searchBar').value = ""	
	},
	render: function() {
		return (
			<div className='search'>
				<div>
		 			<input id='searchBar' type='text' placeholder='Search for an appointment'/>
		 			<button onClick={this._handleClick}> Search </button>
	 			</div>
	 		</div>
			)
	}
})

const AppointmentContainer = React.createClass({
	render: function() {
		return (
			<div className="nabeContainer">
				<h1>Appointments</h1>
				<table>
					<tbody>
						<tr className='firstRow'>
							<th>Date</th>
							<th>Time</th>
							<th>Description</th>
						</tr>
					</tbody>
				</table>
				{this.props.appointmentColl.map(
					(model) => <Appointment key={model.id} appointmentModel={model}/>
				)}
			</div>
			)
	}
})
const Appointment = React.createClass({
	_removeAppointment: function() {
			this.props.appointmentModel.destroy({
			url: `/api/appointments/${this.props.appointmentModel.id}`		
			})
	},
	render: function() {
		return (
			<table className="appointment">
				<tbody>
					<tr>
						<th>{this.props.appointmentModel.get('date')}</th>
						<th>{this.props.appointmentModel.get('time')}</th>
						<th>{this.props.appointmentModel .get('description')}</th>
						<th onClick={this._removeAppointment}>X</th>
					</tr>
				</tbody>
			</table>
			)
	}
})

export default HomeView