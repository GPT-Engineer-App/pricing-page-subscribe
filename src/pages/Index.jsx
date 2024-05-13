import { Box, Button, Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://your-real-supabase-url.com";
const supabaseAnonKey = "your-real-anonymous-key";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { useEffect } from "react";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);

  const subscribe = async (packageName) => {
    setLoading(true);
    const { data, error } = await supabase.from("subscriptions").insert([{ package_name: packageName, user_id: "user_id_placeholder" }]);

    if (error) {
      console.error("Subscription error:", error);
      alert("Subscription failed!");
    } else {
      console.log("Subscription data:", data);
      alert("Subscription successful!");
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchPackages = async () => {
      const { data, error } = await supabase.from("packages").select("*");
      if (error) {
        console.error("Error fetching packages:", error);
      } else {
        setPackages(data);
      }
    };

    fetchPackages();
  }, []);

  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h1" mb={6} textAlign="center">
        Pricing Plans
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {packages.map((pkg) => (
          <Box key={pkg.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <VStack spacing={3}>
              <Heading as="h3" size="lg">
                {pkg.name}
              </Heading>
              <Text fontSize="2xl">{pkg.price}</Text>
              <Box>
                {pkg.features.map((feature, index) => (
                  <Text key={index}>
                    <FaCheckCircle /> {feature}
                  </Text>
                ))}
              </Box>
              <Button colorScheme="blue" isLoading={loading} onClick={() => subscribe(pkg.name)}>
                Subscribe
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;
