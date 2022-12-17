import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  MediaQuery,
  Container,
  Grid,
  Divider,
  Box,
  BackgroundImage,
  Title,
  Flex,
  Button,
  Skeleton,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconFileText, IconMoodSmile } from "@tabler/icons";
import { useViewportSize } from "@mantine/hooks";

import * as api from "../helpers/api";
import * as notify from "../helpers/notify";

import CaseCard from "../components/cards/CaseCard";
import HomeCarousel from "../components/HomeCarousel";

import BannerImg from "../assets/home-banner.jpg";
import BannerMbImg from "../assets/home-banner-mobile.png";
import leftBracketsImg from "../assets/left-brackets.png";
import rightBracketsImg from "../assets/right-brackets.png";

const Banner = ({ height, width }) => {
  const router = useRouter();
  const BannerSrc = width > 768 ? BannerImg.src : BannerMbImg.src;
  const BannerRadius = width > 768 ? "md" : "";
  const copyWriting = {
    title: "還再使用付費的接案外包網站嗎?",
    titleSize: width > 768 ? "h1" : "h4",
    subtitle:
      "不妨試試 WeCoding 打造一個免費且簡單使用的外包網站 在這裡你可以找到適合的工程師或是適合的案件",
    subtitleSize: width > 768 ? "h4" : "h6",
  };
  const bannerBtnsStyle = {
    position: "relative",
    opacity: 0.9,
    "&:before, &:after": {
      position: "absolute",
      height: "130%",
      color: "#52C8FF",
      fontSize: 20,
      top: 0,
      transition: "all 0.15s linear",
    },
    "&:before": {
      content: `url('${leftBracketsImg.src}')`,
      left: "-8%",
    },
    "&:after": {
      content: `url('${rightBracketsImg.src}')`,
      right: "-8%",
    },
    "&:hover": {
      opacity: 1,
    },
    "&:hover:before": {
      transform: "translateX(-50%)",
    },
    "&:hover:after": {
      transform: "translateX(50%)",
    },
  };
  return (
    <>
      <Box>
        <BackgroundImage
          h={{ base: 400, md: 520 }}
          src={BannerSrc}
          px={{ base: 16, md: 80 }}
          radius={BannerRadius}
        >
          <Flex
            direction="column"
            align={{ base: "center", md: "flex-start" }}
            justify="center"
            h="100%"
            w={{ base: "100%", md: "60%" }}
          >
            <Title
              order={1}
              size={copyWriting.titleSize}
              color="white"
              mb={{ base: 16, md: 24 }}
            >
              {copyWriting.title}
            </Title>
            <Title
              order={2}
              size={copyWriting.subtitleSize}
              fw={400}
              color="white"
              mb={{ base: 40, md: 48 }}
            >
              {copyWriting.subtitle}
            </Title>
            <Flex align="center">
              <Button
                sx={bannerBtnsStyle}
                leftIcon={<IconFileText size={20} />}
                size="lg"
                bg="custom-primary.1"
                onClick={() => {
                  router.push("/Case");
                }}
              >
                找案件
              </Button>
              <Button
                sx={bannerBtnsStyle}
                leftIcon={<IconMoodSmile size={20} />}
                size="lg"
                bg="custom-primary.1"
                ml={36}
                onClick={() => {
                  router.push("/Profile");
                }}
              >
                找工程師
              </Button>
            </Flex>
          </Flex>
        </BackgroundImage>
      </Box>
    </>
  );
};

const NewCases = ({ width, height }) => {
  const BoxRadius = width > 768 ? "md" : "";
  const moreLinkStyle = {
    fontWeight: 400,
    fontSize: width > 768 ? 24 : 16,
    Color: "#52C8FF",
    "&:hover": {
      Background: "transparent",
    },
  };
  const titleSize = width > 768 ? "h2" : "h4";

  const router = useRouter();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCases = () => {
    api.CaseList().then((res) => {
      const { code, message } = res.data;

      if (code !== 0) {
        notify.showError(message);
        return;
      }

      setCases(message);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCases();
  }, []);

  return (
    <>
      <Box mt={48}>
        <Container size="xl" bg="custom-third.1">
          <Box
            px={{ base: 16, md: 40 }}
            py={{ base: 32, md: 40 }}
            radius={BoxRadius}
          >
            <>
              <Flex justify="space-between" align="center">
                <Title order={2} size={titleSize.title} color="#1E1E1E">
                  最新案件
                </Title>
                <Button
                  variant="subtle"
                  sx={moreLinkStyle}
                  onClick={() => {
                    router.push("/Case");
                  }}
                >
                  查看更多 &gt;
                </Button>
              </Flex>
            </>
            <>
              <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
                <Grid gutter={20} mt={20}>
                  {cases.map((item, index) => {
                    return (
                      <Grid.Col span={3} key={index}>
                        <CaseCard data={item} />
                      </Grid.Col>
                    );
                  })}
                </Grid>
              </MediaQuery>

              <MediaQuery largerThan="xs" styles={{ display: "none" }}>
                <Carousel
                  mt={24}
                  sx={{ maxWidth: "100%" }}
                  mx="auto"
                  loop
                  slideSize={{ base: "100%", lg: "50%" }}
                  slideGap={20}
                  withControls={false}
                >
                  {cases.length == 0 ? (
                    <Carousel.Slide>
                      <Skeleton height={200} />
                    </Carousel.Slide>
                  ) : (
                    cases.map((item, index) => {
                      return (
                        <Carousel.Slide>
                          <CaseCard data={item} />
                        </Carousel.Slide>
                      );
                    })
                  )}
                </Carousel>
              </MediaQuery>
            </>
          </Box>
        </Container>
      </Box>
    </>
  );
};

const HomeComponent = () => {
  const { height, width } = useViewportSize();
  const bannerPaddingX = width > 768 ? "auto" : 0;
  useEffect(() => {}, [width]);
  return (
    <>
      <Container size="xl" px={bannerPaddingX}>
        <Box py={{ base: 0, md: 48 }} mb={120}>
          <Banner height={height} width={width} />
          <NewCases height={height} width={width} />
          <HomeCarousel type="like" />
          <Divider mt={{ base: 24, lg: 80 }} size="md" />
          <HomeCarousel type="new" />
        </Box>
      </Container>
    </>
  );
};

export default HomeComponent;
