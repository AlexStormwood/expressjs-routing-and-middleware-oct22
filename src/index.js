let {app} = require('./server');

const server = app.listen(3000, () => {
	console.log("Server is now running!");
});