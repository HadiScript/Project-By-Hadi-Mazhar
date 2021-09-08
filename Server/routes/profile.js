import express from 'express';
import multer from 'multer';
import request from 'request';
import User from '../Model/UserModel.js';
import Profile from '../Model/ProfileModel.js';
import Authorization from '../middlewear/authorization.js';
import { check, validationResult } from 'express-validator';
import Post from '../Model/PostModel.js';
import profile from '../Model/ProfileModel.js';

const router = express.Router();


// chech for profile if profile is exit or not
router.get('/me', Authorization, async (req, res) => {

    try {
        // here user from user model, access from authorixation
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) return res.status(400).json({ msg: "There is no profile for this user" });

        res.json(profile);


    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error')
    }


})



const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './../../hadireact/public/profileimage')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage: storage });



// post api/profile/create
// create or update user profile
router.post("/createorupdate", 
    [Authorization, [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills  is required').not().isEmpty()
    ]], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

        const {
            company,
            website,
            location,
            status,
            skills,
            bio,
            githubusername,
            youtube,
            twitter,
            facebook,
            linkedin,
            instagram
        } = req.body;

        // build profile object
        const profileFields = {};

        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;

      

        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim())
        }

        // build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;




        try {
            let profile = await Profile.findOne({ user: req.user.id });

            // console.log('here is user from profile', profile, req.user.id);
            // Cast to ObjectId failed for value "{ user: '60a03af158b3281974da1d62' }" at path "_id" for model "profileSchema
            // findByIdAndUpdate, the above error is cause by  findByIdAndUpdate   
            
            // profileFields.image = req.file.originalname

            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                )
                return res.json(profile)
            }

            profile = new Profile(profileFields);
            await profile.save();

            return res.status(200).json(profile)


        } catch (err) {
            console.log(err.message);
            return res.status(500).send('server error')
        }


    });


// getting all profiles 
router.get('/getting/all/profiles', async (req, res) => {


    try {

        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        return res.status(200).json(profiles)

    } catch (error) {
        console.log(error.message);
    }

})

// getting profiles by user id
router.get('/profile/:user_id', async (req, res) => {


    try {

        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: "profile not found" })
        res.status(200).json(profile)

    } catch (error) {
        console.log(error.message);

        if (error.kind === 'ObjectId') {
            res.status(500).send({ msg: "profile not found" })
        }


        res.status(500).send('server error')
    }

})


// deleteing user and profile, post  completely
router.delete('/', Authorization, async (req, res) => {
    try {
        // remove user post
        // we we have to find many thing with help og one user if
        const posts = await Post.find({ user: req.user.id });

        if (posts) {
            await Post.deleteMany({ user: req.user.id });
        }

        // remove  profile
        // important 
        // when we have to have thing
        const profile = await Profile.find({ user: req.user.id });
        if (profile) {
            await Profile.findOneAndRemove({ user: req.user.id })

        }



        // remove user
        await User.findByIdAndRemove({ _id: req.user.id });

        res.status(200).json({ msg: 'User Removed' });

    } catch (error) {
        console.log(error);
        res.status(500).send('server error')
    }
});


// adding experince , put request

router.put('/experience', [Authorization, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('from', 'from date is required').not().isEmpty(),
]], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        return res.status(200).json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error')
    }

});

// for deleting exp by exp id 
router.delete('/exp/:exp_id', Authorization, async (req, res) => {
    try {

        let profile = await Profile.findOne({ user: req.user.id });

        // find index 
        const index = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(index, 1);
        await profile.save();

        res.json(profile)

    } catch (error) {
        console.log(error);
        res.status(500).send('server error')
    }
})





// get put/profiles/education
// put add profile education ,
router.put('/education', [Authorization, [

    check('school', 'school is required').not().isEmpty(),
    check('degree', 'degree is required').not().isEmpty(),
    check('from', 'from date is required').not().isEmpty(),

]], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    try {

        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile)

    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error')
    }

})

//  delete api/profile/education/:edu_id
// delete exp from profile
router.delete("/edu/:edu_id", Authorization, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //  get  removed index;
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile)

    } catch (err) {
        console.log(err);
        res.status(500).send('server error')
    }
});



// getting user repos from github
router.get('/github/:username', async (req, res) => {

    try {

        const option = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id${process.env.clientId}&client_secret=${process.env.secretGithub}`,
            method: "GET",
            headers: { 'user-agent': 'node.js' }
        };

        request(option, (error, response, body) => {
            if (error) console.log(error);
            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: "No Github Profile Found" })
            }
            res.json(JSON.parse(body))
        })



    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
    }


})


export default router;