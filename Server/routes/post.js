import multer from 'multer';
import express from 'express';
import Post from '../Model/PostModel.js';
import User from '../Model/UserModel.js';
import Authorization from '../middlewear/authorization.js';
import { check, validationResult } from 'express-validator';
// import { } from '../../../../hadireact/public/uploads'
// import path from 'path'

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './../../hadireact/public/uploads')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage: storage });


// / POST api/posts;
// create post
router.post("/create", upload.single("image"), [Authorization,

    [
        check('text', 'text is requried').not().isEmpty()
    ]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        try {

            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                image: req.file.originalname,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })

            const post = await newPost.save();

            res.json(post)


        }
        catch (err) {
            console.error(err);
            res.status(500).json('server error')
        }
    })


// getting all the post
// get api/post
router.get("/posts", async (req, res) => {
    try {
        const post = await Post.find().sort({ date: -1 });

        res.json(post)

    } catch (err) {
        console.log(err.message);
        return res.status(500).send('server error')
    }
})


// getting post by id
// get api/post/:id
router.get("/:id", Authorization, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ msg: 'Post not found' })


        res.json(post)

    } catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' })

        return res.status(500).send('server error')
    }
});



// delete  api/post/:id
// delete a post
router.delete("/:id", Authorization, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ msg: "post not found" });


        // check that user own the post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "user not Authorized" })
        };

        await post.remove();
        res.json({ msg: 'post removed' })


    } catch (err) {
        console.log(err);
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' })

        return res.status(500).send('server error')
    }
});



// put api/post/like/:id
// like a post
// private
router.put("/like/:id", Authorization, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // if post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'post already been liked' })
        }

        post.likes.unshift({ user: req.user.id }) //login user
        await post.save();
        return res.json(post.likes)
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('server error')
    }
})



// put api/post/like/:id
// unlike a post
// private
router.put("/unlike/:id", Authorization, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // check if post already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: "post has not yet liked" })
        }


        // get  remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1)

        await post.save();

        res.json(post.likes)
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('server error')
    }
})


// adding a comment to a post 
router.put('/comment/:post_id', [Authorization,
    [
        check('text', 'please entry your comment').not().isEmpty()
    ]], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        };



        try {

            const post = await Post.findById(req.params.post_id);
            const user = await User.findById(req.user.id);

            const newCommment = {
                text: req.body.text,
                name: user.name,
                user: req.user.id,
                avatar: user.avatar
            };

            post.comments.unshift(newCommment);
            await post.save();
            console.log('from adding post server', post)
            res.json(post.comments)


        } catch (error) {
            console.log(error.message);
            return res.status(500).send('server error')
        }

    })



// delete api/post/comment/:id/:comment_id
// delete comment post
// private
router.delete("/comment/:id/:comment_id", Authorization, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        // pull out the comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        // make sure comment exist
        if (!comment) return res.status(404).json({ msg: 'comment does not exist' });


        // make user whose gonna del comment who own also that comment
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'user not authorized' })
        }

        // get  remove index
        const removeIndex = post.comments.map(com => com.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex, 1)

        await post.save();

        res.json(post.comments)
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('server error')
    }
})


export default router;