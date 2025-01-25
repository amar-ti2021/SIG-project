import {
  Stack,
  Box,
  useColorModeValue,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../services/supabaseClient";
import { FaHospital, FaHotel, FaSchool } from "react-icons/fa";
import Stats from "../../ui/Stats";
import Map from "../../ui/Map";
import CategoryMapSection from "./CategoryMapSection";

const MapSection = () => {
  const [regencies, setRegencies] = useState([]);
  const [regency, setRegency] = useState({});
  const [regencyStatistics, setRegencyStatistics] = useState({});

  useEffect(() => {
    const fetchRegencies = async () => {
      try {
        const { data: regenciesData, error: regenciesError } = await supabase
          .from("regencies")
          .select("*");
        if (regenciesError) throw regenciesError;
        setRegencies(regenciesData);
        if (regenciesData && regenciesData.length > 0) {
          handleRegencyClick(regenciesData[0]);
        }
      } catch (error) {
        console.error("Error fetching regencies:", error.message);
      }
    };

    fetchRegencies();
  }, []);

  const handleRegencyClick = async (selectedRegency) => {
    try {
      const { data: regencyStatisticsData, error: regencyStatisticsError } =
        await supabase
          .from("regency_statistics")
          .select("*")
          .eq("regency_id", selectedRegency.id);
      if (regencyStatisticsError) throw regencyStatisticsError;

      setRegency(selectedRegency); // Update selected regency
      setRegencyStatistics(regencyStatisticsData[0]); // Update its statistics
    } catch (error) {
      console.error("Error fetching regency statistics:", error.message);
    }
  };

  return (
    <Box pb={8} id="map">
      <Stack
        pos="relative"
        bgGradient={`linear(to-l, blue.500, blue.400 , cyan.400)`}
        height="400px"
        w="100%"
      ></Stack>
      <Box
        maxW="8xl"
        p={4}
        isolation="isolate"
        zIndex={3}
        mt="-20rem"
        marginInline="auto"
      >
        <Heading
          color={"white"}
          size={{ base: "2xl", md: "4xl" }}
          textAlign={"center"}
          mb={5}
        >
          Peta Tematik Provinsi Bali
        </Heading>
        <Box
          boxShadow={useColorModeValue(
            "0 4px 6px rgba(160, 174, 192, 0.6)",
            "0 4px 6px rgba(9, 17, 28, 0.9)"
          )}
          bg={useColorModeValue("white", "gray.800")}
          p={{ base: 4, sm: 8 }}
          overflow="hidden"
          rounded="2xl"
        >
          <Stack
            pos="relative"
            direction={{ base: "column", md: "row" }}
            zIndex={1}
            spacing={5}
            textAlign="left"
          >
            <Stack spacing={5}>
              {regencies.map((value) => {
                return (
                  <Button
                    key={value.id}
                    colorScheme={value.id == regency.id ? "blue" : "gray"}
                    onClick={() => handleRegencyClick(value)}
                  >
                    {value.name}
                  </Button>
                );
              })}
            </Stack>
            <Stack
              flex={1}
              spacing={5}
              p={5}
              direction={{ base: "column", md: "row" }}
              borderWidth={1}
            >
              {regency && regencyStatistics && (
                <>
                  <Box width={"100%"} height={"100%"}>
                    {regency.latitude && regency.longitude && (
                      <Map
                        key={regency.id}
                        center={[regency.latitude, regency.longitude]}
                        label={regency.name}
                        zoom={10}
                        polygon={regencyStatistics.polygon}
                      />
                    )}
                  </Box>
                  <Stack>
                    <Stats
                      label={"Jumlah Hotel"}
                      icon={FaHotel}
                      value={regencyStatistics.total_hotels}
                    />
                    <Stats
                      label={"Jumlah Rumah Sakit"}
                      icon={FaHospital}
                      value={regencyStatistics.total_hospitals}
                    />
                    <Stats
                      label={"Jumlah Sekolah Dasar"}
                      icon={FaSchool}
                      value={regencyStatistics.total_elementary_schools}
                    />
                    <Stats
                      label={"Jumlah Sekolah Menengah Pertama"}
                      icon={FaSchool}
                      value={regencyStatistics.total_middle_schools}
                    />
                    <Stats
                      label={"Jumlah Sekolah Menengah Atas"}
                      icon={FaSchool}
                      value={regencyStatistics.total_high_schools}
                    />
                  </Stack>
                </>
              )}
            </Stack>
          </Stack>
        </Box>
        <Heading
          size={{ base: "2xl", md: "4xl" }}
          textAlign={"center"}
          my={"10"}
        >
          Peta Tematik Berdasarkan Kategori
        </Heading>
        <Box
          mt={4}
          boxShadow={useColorModeValue(
            "0 4px 6px rgba(160, 174, 192, 0.6)",
            "0 4px 6px rgba(9, 17, 28, 0.9)"
          )}
          bg={useColorModeValue("white", "gray.800")}
          p={{ base: 4, sm: 8 }}
          overflow="hidden"
          rounded="2xl"
        >
          <CategoryMapSection />
        </Box>
      </Box>
    </Box>
  );
};

export default MapSection;
