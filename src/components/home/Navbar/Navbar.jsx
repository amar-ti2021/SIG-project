import {
  Box,
  Flex,
  HStack,
  Link,
  Stack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

import PropTypes from "prop-types";

const navLinks = [{ name: "Peta Tematik", path: "#map" }];

const NavLink = ({ name, path, onClose }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(path);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onClose();
  };

  const link = {
    bg: useColorModeValue("gray.200", "gray.700"),
    color: useColorModeValue("blue.500", "blue.200"),
  };

  return (
    <Link
      href={path}
      px={3}
      py={1}
      lineHeight="inherit"
      rounded="md"
      _hover={{
        textDecoration: "none",
        bg: link.bg,
        color: link.color,
      }}
      onClick={handleClick}
    >
      {name}
    </Link>
  );
};

NavLink.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box px={4} boxShadow="lg" width="100%">
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW={800}
        mx="auto"
      >
        <IconButton
          size="md"
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          display={["inherit", "inherit", "none"]}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Heading>SIG Bali</Heading>
          <HStack
            as="nav"
            spacing={1}
            display={{ base: "none", md: "flex" }}
            alignItems="center"
          >
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
            {/* Dropdown Menu */}
          </HStack>
        </HStack>
      </Flex>
      {/* Mobile Screen Links */}
      {isOpen ? (
        <Box pb={4} display={["inherit", "inherit", "none"]}>
          <Stack as="nav" spacing={2}>
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
