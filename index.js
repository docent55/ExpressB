const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

const PORT = config.get('Port');


const start = async () => {
	try {

		await mongoose.connect(config.get('dbUrl'));

		app.listen(PORT, () => {
			console.log(`Server work on port: ${PORT}`);
		})
	} catch (e) {

		console.log(e);

	}
}

start();