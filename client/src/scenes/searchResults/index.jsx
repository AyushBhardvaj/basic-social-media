import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";
import { useSelector } from "react-redux";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import UserWidget from "scenes/widgets/UserWidget";

const SearchResults = () => {
  const { palette } = useTheme();
  const { searchResults } = useSelector((state) => state.search);
  const { _id, profilePic } = useSelector((state) => state.user.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* Left part. User details part */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={profilePic.url} />
        </Box>

        {/* Middle Part. post part */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <WidgetWrapper>
            <Typography
              color={palette.neutral.dark}
              variant="h5"
              fontWeight="500"
              sx={{ mb: "1.5rem " }}
            >
              Search Query{" "}
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
              {searchResults ? (
                searchResults.map(
                  ({ _id, firstName, lastName, location, profilePic }) => (
                    <Friend
                      key={_id}
                      friendId={_id}
                      name={`${firstName} ${lastName}`}
                      subtitle={location}
                      userProfilepic={profilePic.url}
                    />
                  )
                )
              ) : (
                <Typography color="white">No Users</Typography>
              )}
            </Box>
          </WidgetWrapper>
        </Box>

        {/* right Part. Advertisements and friends list */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchResults;
