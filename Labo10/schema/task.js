const mongoose = require('mongoose');
const schema = new mongoose.Schema();

schema.add({
	name: String,
    userId: String,
});

schema.methods.toDTO = function() {
    const obj = this.toObject();

    return {
        id: obj._id,
		name: obj.name,
		userId: obj.userId
    }
}


const task = mongoose.model('Task', schema);

exports.model = task;