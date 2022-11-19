import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase.config";

function SignOut() {
  const navigate = useNavigate();

  function signout() {
    signOut(auth)
      .then(() => {
        toast.success("good bye");
        navigate("/sign-in");
      })
      .catch((e) => {
        toast.error("some thing went wrong");
        console.log("signout error", e);
      });
  }

  return (
    <Button
      size="sm"
      className="sign-out"
      rounded="full"
      colorScheme="whatsapp"
      onClick={signout}
    >
      Sign out
    </Button>
  );
}
export default SignOut;
