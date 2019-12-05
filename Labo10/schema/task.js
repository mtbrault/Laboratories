const mongoose = require('mongoose');
const schema = new mongoose.Schema();

schema.add({
	value: String,
	user: String,
});

schema.methods.toDTO = () => {
	const data = this.toObject();
	return {
		value: data.value,
		user: data.id
	}
}

const task = mongoose.model('Task', schema);

exports.model = task;