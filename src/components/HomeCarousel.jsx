import { useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import {
  Container,
  Title,
  Box,
  ActionIcon,
  Flex,
  Skeleton,
  Card,
} from "@mantine/core";
import { IconHeart } from "@tabler/icons";
import { useViewportSize } from "@mantine/hooks";
import * as api from "../helpers/api";
import * as notify from "../helpers/notify";

import PortfolioCard from "./cards/PortfolioCard";

const HomeCarousel = ({ type }) => {
  const [profiles, setProfiles] = useState([]);
  const { height, width } = useViewportSize();
  
  const IconStyle = {
    "& svg": {
      fill: "#F14A4A",
    },
  };

  const getProfile = () => {
    api.profileHomeList(type).then((res) => {
      const { code, message } = res.data;

      if (code != 0) {
        notify.showError(message);
        return;
      }
      setProfiles(message);
    });
  };

  const titleSize = width > 768 ? 32 : 24;
  

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Container size="xl">
        <Box mt={{base: 28, xl: 80}}>
          <Box>
            <Flex align="center" sx={IconStyle}>
              <IconHeart size={30} color="#F14A4A" />
              <Title
                size={titleSize}
                ml={10}
                fw={700}
                color="#1E1E1E"
              >
                {type === "like" ? "最多人喜歡作品集" : "最新作品集"}
              </Title>
            </Flex>
          </Box>

          {
            <Carousel
              loop
              mt={{ base: 32, lg: 48 }}
              align="start"
              slideSize="25%"
              slideGap="md"
              breakpoints={[
                { maxWidth: "lg", slideSize: "25%", slideGap: "md" },
                { maxWidth: "md", slideSize: "50%", slideGap: "md" },
                { maxWidth: "sm", slideSize: "100%", align: "center" },
              ]}
            >
              {profiles.length == 0
                ? [1, 2, 3, 4].map((item, index) => {
                    return (
                      <Carousel.Slide key={index}>
                        <Box>
                          <Card
                            shadow="sm"
                            p="lg"
                            radius="md"
                            w={300}
                            withBorder
                          >
                            <Card.Section>
                              <Skeleton height={180}></Skeleton>
                            </Card.Section>
                          </Card>
                          <Box py={6} px={8}>
                            <Skeleton mt={16} height={16} radius="xl" />
                          </Box>
                        </Box>
                      </Carousel.Slide>
                    );
                  })
                : profiles.map((profile, index) => {
                    return (
                      <Carousel.Slide key={index}>
                        <PortfolioCard data={profile} />
                      </Carousel.Slide>
                    );
                  })}
            </Carousel>
          }
        </Box>
      </Container>
    </>
  );
};

export default HomeCarousel;
