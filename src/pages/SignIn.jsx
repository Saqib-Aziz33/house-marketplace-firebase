import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaUserAlt, FaUnlock, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../components/utils/Button";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <div className="sign-in">
      <Container maxW={1000} my={16}>
        <Heading>Welcome Back</Heading>

        <Stack gap={3} mt={5} as="form" onSubmit={handleSubmit}>
          <InputGroup className="input-group" size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<FaUserAlt color="gray.300" />}
            />
            <Input
              type="email"
              placeholder="Email address"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup className="input-group" size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<FaUnlock color="gray.300" />}
            />
            <Input
              type={showPass ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <InputRightElement
              onClick={() => setShowPass(!showPass)}
              children={<FaRegEyeSlash />}
            />
          </InputGroup>

          <Text fontWeight="bold" alignSelf="flex-end">
            <Link className="text-primary" to="/forgot-password">
              Forgot Password?
            </Link>
          </Text>

          <Box>
            <Button type="submit">Sign in</Button>
          </Box>

          <Text fontWeight="bold" alignSelf="center">
            <Link className="text-primary" to="/sign-up">
              Sign up instead
            </Link>
          </Text>
        </Stack>
      </Container>
    </div>
  );
}
export default SignIn;
