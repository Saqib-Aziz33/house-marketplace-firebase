import { Button, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const navigate = useNavigate();

  async function handleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // check if user already exits
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // if user not exists then save to users collections also
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      toast.info("welcome to house marketplace");
      navigate("/");
    } catch (e) {
      console.log("oauth error", e);
      toast.error(e.message);
    }
  }

  return (
    <Button variant="outline" rounded="full" onClick={handleClick}>
      <FcGoogle size={30} />
      <Text color="gray.700" ml={2}>
        Continue with google
      </Text>
    </Button>
  );
}
export default OAuth;
