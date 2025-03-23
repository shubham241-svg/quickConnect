import bcrypt from "bcryptjs";
import {v2 as cloudinary} from "cloudinary";

//models
import User from "../models/user.model.js";
import Notifications from "../models/notification.model.js"

export const getUserProfile = async(req , res)=>{

    const {username} = req.params;

    try{
        const user = await User.findOne({username}).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json(user);

    }catch(error){
        console.log("Error in getUserProfile: ", error.message);
        res.status(500).json({error: error.message})

    }

};


export const followUnfollowUser = async(req, res ) =>{
    try{

        const {id} = req.params;
        const userToModify = await User.findById(id)
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()){ // checking if we  follow and following user request are same
            return res.status(400).json({error: "You can't follow or unfollow yourself"})
        } 

        if(!userToModify || !currentUser) return res.status(400).json({ error: "User not found"})

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            // we will use push  method to put the user in following array and pull for followers array
            // unfollows the user

            await User.findByIdAndUpdate(id , { $pull: {followers: req.user._id}});// removes my name from the followers array/list
            await User.findByIdAndUpdate(req.user._id, { $pull: {following: id}}) // removes her name from my followings
            
            //TODO1 return the id of the user as a response
            res.status(200).json({message: "User Unfollowed successfully"})


        }else{
            //follow the user 
            await User.findByIdAndUpdate(id, {$push: {followers: req.user._id}});
            await User.findByIdAndUpdate(req.user._id, {$push: {following: id}});

            //Sends a notifications to the User 
            const newNotification = new Notifications({
                type: "follow", 
                from : req.user._id,
                to: userToModify._id , // id

            });

            await newNotification.save() ;

            //TODO2: return the id of the user as a response
            res.status(200).json({message: "user followed successfully"});

        }



    }catch(error){
        console.log("Error in followUnfollowUser: ", error.message);
        res.status(500).json({error: error.message})
    }


};

export const getSuggestedUsers = async(req, res)=>{
    try{
        const userId = req.user._id;

        const usersFollowedByMe = await User.findById(userId).select("following") // returns the array of people followed by you 

        const users = await User.aggregate([
            {
                $match: {
                    _id: {$ne: userId} // Excludes the current user
                }
            }, 
            {$sample : {size: 10}} // Get 10 random users 
        ]) // returns us an array of 10 random users excluding the current user 

        const filteredUsers = users.filter(user => !usersFollowedByMe.following.includes(user.id)) //filters out users that the current user is already following.
        const suggestedUsers = filteredUsers.slice(0,4);

        suggestedUsers.forEach((user)=>{user.password = null})

        res.status(200).json(suggestedUsers);

    }catch(error){
        console.log("error in getSuggestedUsers: ", error.message);
        res.status(500).json({error: error.message});

    }
};


export const updateUserProfile = async(req, res) => {
    const {fullName, email, username, currentPassword, newPassword, bio, link} = req.body;
    let {profileImg, coverImg} = req.body;

    const userId = req.user._id;

    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({ msg : "User not found"})

        if((!newPassword && currentPassword) || (!currentPassword && newPassword)){
            return res.status(400).json({error: "Please provide both current password and new password"});
        }

        if(currentPassword && newPassword){
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch) return res.status(400).json({error: "Current Password is incorrect"});
            if(newPassword.length < 6){
                return res.status(400).json({error: "Password must be at least 6 characters long"});
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        if(profileImg){
            
            if(user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0])
            }

            const uploadedResponse = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadedResponse.secure_url;

        }

        if(coverImg){

            if(user.coverImg){
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0])
            }
            // if user already have an image so we are uploading the new image on the cloudinary but not destroying the old image
            const uploadedResponse = await cloudinary.uploader.upload(coverImg)
            coverImg = uploadedResponse.secure_url;

        }

        // updating user profile continue after class

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;

        await user.save();
        res.status(200).json({message: "Profile Updated successfully"})

    }catch(error){

        console.log("Error in updateUser : ", error.message);
        res.status(500).json({error: error.message});

    }
}