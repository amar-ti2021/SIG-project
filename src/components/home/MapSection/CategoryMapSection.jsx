import { Button, Stack, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaHospital, FaHotel, FaSchool } from "react-icons/fa";
import { supabase } from "../../../services/supabaseClient";
import Map from "../../ui/Map";

const CategoryMapSection = () => {
  const [regencyStatistics, setRegencyStatistics] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("total_hotels");

  const categories = [
    {
      icon: <FaHotel />,
      label: "Hotel",
      field_name: "total_hotels",
      color_ranges: [
        { label: "0-10", color: "red" },
        { label: "11-50", color: "green" },
        { label: "51+", color: "blue" },
      ],
    },
    {
      icon: <FaHospital />,
      label: "Rumah Sakit",
      field_name: "total_hospitals",
      color_ranges: [
        { label: "0-5", color: "red" },
        { label: "6-10", color: "yellow" },
        { label: "11-15", color: "green" },
        { label: "16+", color: "blue" },
      ],
    },
    {
      icon: <FaSchool />,
      label: "Sekolah Dasar",
      field_name: "total_elementary_schools",
      color_ranges: [
        { label: "0-177", color: "red" },
        { label: "178-240", color: "orange" },
        { label: "241-288", color: "yellow" },
        { label: "289-317", color: "green" },
        { label: "318+", color: "blue" },
      ],
    },
    {
      icon: <FaSchool />,
      label: "Sekolah Menengah Pertama",
      field_name: "total_middle_schools",
      color_ranges: [
        { label: "0-25", color: "red" },
        { label: "26-35", color: "orange" },
        { label: "36-45", color: "yellow" },
        { label: "46-85", color: "green" },
        { label: "86+", color: "blue" },
      ],
    },
    {
      icon: <FaSchool />,
      label: "Sekolah Menengah Atas",
      field_name: "total_high_schools",
      color_ranges: [
        { label: "0-12", color: "red" },
        { label: "13-15", color: "orange" },
        { label: "16-22", color: "yellow" },
        { label: "23-34", color: "green" },
        { label: "35+", color: "blue" },
      ],
    },
  ];

  const colorRange = {
    total_hotels: (data) =>
      data <= 10 ? "red" : data <= 50 ? "green" : "blue",
    total_hospitals: (data) =>
      data <= 5 ? "red" : data <= 10 ? "yellow" : data <= 15 ? "green" : "blue",
    total_elementary_schools: (data) =>
      data <= 177
        ? "red"
        : data <= 240
        ? "orange"
        : data <= 288
        ? "yellow"
        : data <= 317
        ? "green"
        : "blue",
    total_middle_schools: (data) =>
      data <= 25
        ? "red"
        : data <= 35
        ? "orange"
        : data <= 45
        ? "yellow"
        : data <= 85
        ? "green"
        : "blue",
    total_high_schools: (data) =>
      data <= 12
        ? "red"
        : data <= 15
        ? "orange"
        : data <= 22
        ? "yellow"
        : data <= 34
        ? "green"
        : "blue",
  };

  useEffect(() => {
    const fetchRegencies = async () => {
      try {
        const { data: regencyStatisticsData, error: regencyStatisticsError } =
          await supabase.from("regency_statistics").select("*");
        if (regencyStatisticsError) throw regencyStatisticsError;
        setRegencyStatistics(regencyStatisticsData);
      } catch (error) {
        console.error("Error fetching regencies:", error.message);
      }
    };

    fetchRegencies();
  }, []);

  const selectedCategoryData = categories.find(
    (category) => category.field_name === selectedCategory
  );

  return (
    <Stack
      pos="relative"
      direction={{ base: "column", md: "row" }}
      zIndex={1}
      spacing={5}
      textAlign="left"
    >
      <Stack spacing={5} h={"100%"}>
        {categories.map((item) => {
          return (
            <Button
              onClick={() => {
                setSelectedCategory(item.field_name);
              }}
              colorScheme={
                item.field_name === selectedCategory ? "blue" : "gray"
              }
              key={item.field_name}
              leftIcon={item.icon}
            >
              {item.label}
            </Button>
          );
        })}
        <Stack spacing={3}>
          {/* Legend Box */}
          <Box p={4} borderWidth={1} borderRadius="md">
            <Text fontWeight="bold" mb={3}>
              Legend
            </Text>
            {selectedCategoryData.color_ranges.map((range) => (
              <Stack direction="row" align="center" key={range.label}>
                <Box
                  w={4}
                  h={4}
                  borderRadius="full"
                  bg={range.color}
                  borderWidth={1}
                ></Box>
                <Text fontSize="sm">{range.label}</Text>
              </Stack>
            ))}
          </Box>
        </Stack>
      </Stack>
      <Stack
        width={"100%"}
        spacing={5}
        p={5}
        direction={{ base: "column", md: "row" }}
        borderWidth={1}
      >
        <Stack minH={"60vh"} flex={1}>
          {regencyStatistics && (
            <Map
              data={regencyStatistics.map((item) => {
                return {
                  color: colorRange[selectedCategory](item[selectedCategory]),
                  polygon: item.polygon,
                };
              })}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CategoryMapSection;
