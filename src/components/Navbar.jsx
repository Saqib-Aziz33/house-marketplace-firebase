import { Container, HStack } from "@chakra-ui/react";
// icons
import {
  MdOutlineExplore,
  MdOutlineLocalOffer,
  MdOutlineAccountCircle,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname: path } = useLocation();

  return (
    <nav className="navbar">
      <Container maxW={1000} p={2}>
        <HStack justify="space-around">
          <Link to="/" className={`link ${path === "/" ? "active" : ""}`}>
            <MdOutlineExplore size={30} />
            Explore
          </Link>

          <Link
            to="/offers"
            className={`link ${path === "/offers" ? "active" : ""}`}
          >
            <MdOutlineLocalOffer size={30} />
            Offers
          </Link>

          <Link
            to="/sign-in"
            className={`link ${path === "/sign-in" ? "active" : ""}`}
          >
            <MdOutlineAccountCircle size={30} />
            Profile
          </Link>
        </HStack>
      </Container>
    </nav>
  );
}
export default Navbar;
