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
  Spinner,
} from "@chakra-ui/react";
import { FaUserAlt, FaUnlock, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/utils/Button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { toast } from "react-toastify";
import OAuth from "../components/utils/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.name) {
      toast.error("seom feilds are empty");
      return;
    }
    try {
      setLoading(true);
      // authenticate user
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const { user } = userCredentials;
      // upadte username
      updateProfile(auth.currentUser, {
        displayName: formData.name,
      });
      toast.success("welcome to marketplace app");
      // modify user info and save to users collection
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      // redirect
      navigate("/");
    } catch (e) {
      console.log("create user error:", e);
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sign-in">
      <Container maxW={1000} my={16}>
        <Heading>Create an Account</Heading>

        <Stack gap={3} mt={5} as="form" onSubmit={handleSubmit}>
          <InputGroup className="input-group" size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineInfoCircle color="gray.300" />}
            />
            <Input
              type="text"
              placeholder="Name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </InputGroup>

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
            <Link className="text-primary" to="/sign-in">
              Already have account
            </Link>
          </Text>

          <Box>
            {loading ? (
              <Spinner color="green" size="lg" />
            ) : (
              <Button type="submit">Sign Up</Button>
            )}
          </Box>

          <Box alignSelf="center">
            <OAuth />
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
export default SignUp;
