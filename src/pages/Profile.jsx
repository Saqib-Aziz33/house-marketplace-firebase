import { Container, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { auth } from "../firebase.config";
import SignOut from "../components/utils/SignOut";

function Profile() {
  const [formData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  return (
    <>
      <Container maxW={1000} my={8}>
        <HStack justify="space-between">
          <Heading>My Profile</Heading>
          <SignOut />
        </HStack>

        <Stack my={16}>
          <Heading size="md">Personal Details</Heading>
          <Text>
            <b>Name:</b> {formData.name}
          </Text>
          <Text>
            <b>Email:</b> {formData.email}
          </Text>
        </Stack>
      </Container>
    </>
  );
}
export default Profile;
