import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/utils/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.config";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        toast.info("please check your inbox");
      })
      .catch((e) => {
        toast.error("something went wrong");
        console.log("sending reset link error", e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="sign-in">
      <Container maxW={1000} my={16}>
        <Heading>Reset Password</Heading>

        <Stack gap={3} mt={5} as="form" onSubmit={handleSubmit}>
          <InputGroup className="input-group" size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<FaUserAlt color="gray.300" />}
            />
            <Input
              type="email"
              placeholder="Your email address"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <Text fontWeight="bold" alignSelf="flex-end">
            <Link className="text-primary" to="/sign-in">
              Sign in
            </Link>
          </Text>

          <Box>
            {loading ? (
              <Spinner color="green" size="lg" />
            ) : (
              <Button type="submit">Send Link</Button>
            )}
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
export default ForgotPassword;
