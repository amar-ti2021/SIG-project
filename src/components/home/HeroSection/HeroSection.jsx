import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Map from "../../ui/Map";
import { FaGithub } from "react-icons/fa";

const HeroSection = () => {
  return (
    <Stack minH={"90vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "20%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              Sistem Informasi Geografis
            </Text>
            <br />
            <Text color={"blue.400"} as={"span"}>
              Peta Tematik Provinsi Bali
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Pulau Bali, dikenal sebagai Pulau Dewata, adalah destinasi wisata
            kelas dunia yang menawarkan pantai eksotis, pegunungan indah, dan
            budaya unik. Dengan luas 5.636,66 km², Bali memiliki ribuan pura
            yang memperkuat citranya sebagai pusat spiritual dan budaya. Wilayah
            ini terbagi dalam 8 kabupaten, 1 kotamadya, dan ratusan desa, dengan
            topografi bervariasi serta iklim tropis yang mendukung keindahannya.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Lihat Peta
            </Button>
            <Button leftIcon={<FaGithub />} rounded={"full"}>
              Source Code
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Map />
      </Flex>
    </Stack>
  );
};
export default HeroSection;
