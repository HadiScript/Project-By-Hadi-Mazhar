import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserSchema" },

    text: { type: String, required: true },
    image : {type: String},
    name: { type: String },
    avatar: { type: String },
    date: { type: Date, default: Date.now },
    image: { type: String },

    likes: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "UserSchema" }
        }
    ],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "UserSchema" },
            text: { type: String, required: true },
            name: { type: String },
            avatar: { type: String },
            date: { type: Date, default: Date.now }
        }
    ]
})

const Post = mongoose.model('postSchema', postSchema);

export default Post;