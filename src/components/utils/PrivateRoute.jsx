import useAuthStatus from "../../hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return (
      <Center my={16}>
        <Spinner size="2xl" color="green" w="100px" h="100px" />
      </Center>
    );
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
export default PrivateRoute;
