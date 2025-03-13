const mongoose=require('mongoose');

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, 'Please upload a file']
    },
    originalname: {
        type: String,
        required: [true, 'Original name is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Please provide a user']
    }
});

const file=mongoose.model('File', fileSchema);

module.exports=file;

