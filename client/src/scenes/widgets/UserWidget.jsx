import { Box, Divider, Typography, useTheme } from "@mui/material";
import {useNavigate} from "react-router-dom";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import {EditOutlined, LocationOnOutlined, ManageAccountsOutlined, WorkOutlineOutlined} from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";


const UserWidget = ({userId, picturePath, user}) => {
    const {palette} = useTheme();
    const navigate = useNavigate();
  
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    
   

    return(
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={user.picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover":  {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                }
                            }}
                        >
                            {user.firstName} {user.lastName}
                        </Typography>
                        <Typography color={medium}>{user.friends.length} friends</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />


            {/* SECOND ROW */}
            <Box p="1rem">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main}} />
                    <Typography color = {medium}>{user.location}</Typography>
                 </Box>
                 <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main}} />
                    <Typography color={medium}>{user.occupation}</Typography>
                 </Box>
            </Box>

            <Divider />

            {/* THIRD ROW */}

            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Who's viewed your profile</Typography>
                    <Typography color={main} fontWeight="500">
                        {user.viewedProfile}
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>Impressions of your post</Typography>
                    <Typography color={main} fontWeight="500">
                        {user.impressions}
                    </Typography>
                </FlexBetween>
            </Box>

            <Divider />

            {/* FOURTH ROW */}

            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>

                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main}} />
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                        <Typography color={main} fontWeight="500">
                            Linkedin
                        </Typography>
                        <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
            </Box>
            
        </WidgetWrapper>
    )
}

export default UserWidget;