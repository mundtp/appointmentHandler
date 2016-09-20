import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomeView from './homeView'


const app = function() {
	 const AppRouter = Backbone.Router.extend({
	    routes: {
	      "*catchall": "handleHome"
	    },
	    handleHome: function(){
	      ReactDOM.render(<HomeView />, document.querySelector('.container'))
	    },

	    initialize: function(){
	        Backbone.history.start()
	    }
	 })
	 
	 new AppRouter()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x.. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..