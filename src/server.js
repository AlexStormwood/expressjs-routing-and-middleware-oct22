const express = require('express');
const app = express();

//const app = require('express')();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use((request, response, next) => {
	console.log("middleware happened!");

	request.info = {
		url: request.originalUrl,
		ip: request.ip,
		route: request.route
	};

	// //Error style 1
	// if (request.info.weather == null){
	// 	throw("no weather provided");
	// }



	next();
});


app.use((error, request, response, next) => {
	console.log("Some error occured!");

	// response.json({
	// 	error: error,
	// 	message: "Server doesn't like you",
	// 	favouriteColour:"blue"
	// })

	next();

});



app.get("/", (request, response, next) => {

	if (request.info.weather == null){

		// Style 1 on how to trigger error handling:
		//throw("Missing weather information");

		// Style 2 on how to trigger error handling:
		let someError = new Error("Missing weather information");
		someError.status = 401;
		next(someError);
	}

	response.json({
		message:"Hello world",
		info: request.info
	})
});





app.post("/", (request, response) => {

	if (request.info.weather == null){
		response.json({
			error:"Error occured"
		})
	}

	response.json({
		receivedData: request.body
	});
});









app.use("/dynamicRoute/", (request, response, next) => {
	console.log("middleware happened but not for the root route!");

	next(new Error("Error for the lols"));
});

app.get("/someNewRoute", (request, response) => {
	response.json({
		message:"Hello there",
		info: request.info
	});
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
		queryParams: request.query,
		info: request.info
	})
})



app.use((error, request, response, next) => {
	console.log("second error handling middleware runs")
	response.json({
		message:"some error",
		status: error.status,
		errorMessage: error.message
	})
});


// some hypothetical controller stuff here
// no access to middleware because it was imported _after_
// all middleware 


module.exports = {
	app
}