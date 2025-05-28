import mongoose from "mongoose";
import User from "../models/User.js"

// READ
export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        )
        res.status(200).json(formattedFriends)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// UPDATE

export const addRemoveFriend = async (req, res) => {
    console.log("yo")
    let session;
    try {
        const {id, friendId} = req.params;

        if (id === friendId) {
            return res.status(400).json({ message: "You cannot add or remove yourself as a friend." });
        }
        session = await mongoose.startSession();
        session.startTransaction();
        
        const user = await User.findById(id).session(session);
        const friend = await User.findById(friendId).session(session);

        console.log(friendId);
        console.log(friend);
        
        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((_id) => _id !== friendId);
            friend.friends = friend.friends.filter((_id) => _id !== id);
            console.log("hello")
        }
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
            console.log("hello2")
        }

        await user.save({session});
        await friend.save({session});
        
        await session.commitTransaction();
        session.endSession();

        const friends = await Promise.all(
            user.friends.map((friendId) => User.findById(friendId))
        );
        

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        )

        res.status(200).json(formattedFriends);
        
    } catch (error) {
        if(session){
            await session.abortTransaction();
            session.endSession();
        }
        res.status(500).json({message: error.message});
    }
}