import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar";
import {useSelector} from "react-redux";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import { useState, useEffect } from "react";

const HomePage = () => {
    const [user, setUser] = useState(null);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const getUser = async () => {
        const response = await fetch(`https://sociopedia-backend-1evd.onrender.com/users/${_id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
      };
    
      useEffect(() => {
        getUser();
      },[]); // eslint-disable-line react-hooks/exhaustive-deps
    
      if (!user) {
        return null;
      }

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} user={user}/>
                </Box>
                
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}   
                >
                    <MyPostWidget picturePath = {picturePath} />
                    <PostsWidget userId={_id} getUser={getUser} />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <FriendListWidget userId ={_id} getUser={getUser}/>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default HomePage;