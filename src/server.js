const express = require('express');
const app = express();

//const app = require('express')();

app.get("/", (request, response) => {
	response.json({
		message:"Hello world"
	})
});

app.get("/dynamicRoute/:message/:favouriteColour", (request, response) => {
	let message = request.params.message;
	let favouriteColour = request.params.favouriteColour;

	response.json({
		confirmation: "Route working!",
		// params: {
		// 	message: message,
		// 	params: params
		// }
		params: request.params,
		queryParams: request.query
	})
})


module.exports = {
	app
}