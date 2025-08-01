import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { setFriends } from "../state";

const Friend = ({ friendId, name, subtitle, userPicturePath, getUser}) => {

    console.log("hey");
    console.log(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const {palette}  = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = Boolean(friends.find((friend) => friend._id === friendId));
    console.log(isFriend)

    const patchFriend = async () => {
        const response = await fetch(
            `https://sociopedia-backend-1evd.onrender.com/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to patch friend:", errorData.message);
            return;
        }

        const data = await response.json();
        dispatch(setFriends({ friends: data}));
        getUser();
    }

    return (
      <FlexBetween>
        <FlexBetween gap="1rem">
            <UserImage image={userPicturePath} size="55px" />
            <Box
                onClick={() => {
                    navigate(`/profile/${friendId}`);
                    navigate(0)
                }}
            >
                <Typography
                    color={main}
                    variant="h5"
                    fontWeight="500"
                    sx={{
                        "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer",
                        },
                    }}
                >
                    {name}
                </Typography>
                <Typography color={medium} fontSize="0.75rem">
                    {subtitle}
                </Typography>
            </Box>
        </FlexBetween>
        <IconButton
            onClick={() => patchFriend()}
            sx={{ backgroundColor: primaryLight, p: "0.6rem"}}
        >
            {isFriend ? (
                <PersonRemoveOutlined sx={{ color: primaryDark}}  />
            ) : (
                <PersonAddOutlined sx={{ color: primaryDark}} />
            )}
        </IconButton>
      </FlexBetween>
    );
};

export default Friend;