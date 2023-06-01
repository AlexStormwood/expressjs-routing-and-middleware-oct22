# expressjs-routing-and-middleware-oct22
Lesson repo for 1st of June 2023.


## 1st June 2023
- Dynamic routes
	- route params
	- query params 

- Middleware
	- impact on functions & D.R.Y
	- basics of middleware 
	- built-in middleware 
	- error-handling middleware
	- validation via middleware


Routes must either:
- throw an error or pass an error to next() to jump to the error-handling middleware
- must call next() to move into the next step of middleware chain
- respond with response.send() or response.json()