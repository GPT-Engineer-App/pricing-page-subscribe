import { Box, Button, Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const packages = [
  { id: 1, name: "Basic", price: "$9/month", features: ["Feature 1", "Feature 2", "Feature 3"] },
  { id: 2, name: "Standard", price: "$29/month", features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"] },
  { id: 3, name: "Premium", price: "$49/month", features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"] },
];

const Index = () => {
  const [loading, setLoading] = useState(false);

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
                {pkg.features.map((feature) => (
                  <Text key={feature}>
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
