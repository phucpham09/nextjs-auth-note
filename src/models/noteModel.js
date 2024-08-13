import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Your title is required"],
    },
    content: {
        type: String,
        required: [true, "Your content is required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);
export default Note;