import { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Title,
  TextInput,
  Textarea,
  FileInput,
  NumberInput,
  Radio,
  Button,
  Group,
  Box,
  SimpleGrid,
  LoadingOverlay,
} from "@mantine/core";
import {
  IconMail,
  IconPhone,
  IconBrandFacebook,
  IconDeviceMobile,
  IconCalendar,
} from "@tabler/icons";

import * as api from "../helpers/api";
import * as notify from "../helpers/notify";
import { useEffect } from "react";

const ContactSide = ({ data, isLogin, collect, isCollect }) => {
  const { nickname, intro, avatar, Contact_Engineer } = data;
  const { serviceType, email, phone, facebook, line, desc } =
    Contact_Engineer[0];
  return (
    <>
      <Flex justify="center" mt={16}>
        <Avatar size="xl" src={avatar} />
      </Flex>
      <Text mt="md" align="center">
        {nickname}
      </Text>
      <Text mt="md" align="center" color="gray">
        {intro}
      </Text>

      <Text mt="md" size={18}>
        聯絡方式
      </Text>

      <Grid p={16}>
        <Grid.Col span={4}>電子郵件</Grid.Col>
        <Grid.Col span={8}>
          <Text size={14} color="gray">
            {email}
          </Text>
          <Tooltip label="傳送 Email" withArrow position="right">
            <ActionIcon
              ml={8}
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  `mailto:${email}?subject=我是從WeCoding網站上看到您的聯絡資訊，我想要聯絡您。`
                );
              }}
            >
              <IconMailForward size={36} />
            </ActionIcon>
          </Tooltip>
        </Grid.Col>
        <Grid.Col span={4}>連絡電話</Grid.Col>
        <Grid.Col span={8}>
          <Text size={14} color="gray">
            {phone}
          </Text>
          <Tooltip label="撥打電話" withArrow position="right">
            <ActionIcon
              ml={8}
              onClick={(e) => {
                e.preventDefault();
                window.open(`tel:${phone}`);
              }}
            >
              <IconPhoneCall size={36} />
            </ActionIcon>
          </Tooltip>
        </Grid.Col>
        <Grid.Col span={4} color="gray">
          Facebook
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size={14} color="gray">
            {facebook}
          </Text>
          <CopyButton ml={8} value={facebook}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                  {copied ? <IconCheck size={36} /> : <IconCopy size={36} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Grid.Col>
        <Grid.Col span={4} color="gray">
          Line ID
        </Grid.Col>
        <Grid.Col size={14} span={8}>
          <Text color="gray">{line}</Text>
          <CopyButton ml={8} value={line}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                  {copied ? <IconCheck size={36} /> : <IconCopy size={36} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Grid.Col>
      </Grid>

      <Text mt="md" size={18}>
        聯絡方式
      </Text>
      <Text mt="sm" p={16}>
        {desc}
      </Text>

      <Flex justify="center" mt="md">
        {isLogin && (
          <Button
            leftIcon={<IconStar size={20} />}
            bg={isCollect() ? "gray" : "custom-primary.1"}
            onClick={collect}
          >
            {isCollect() ? "取消收藏" : "收藏該工程師"}
          </Button>
        )}
      </Flex>
    </>
  );
};

const EngineerPage = ({ id }) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [info, setInfo] = useState({});

  const isLogin = useSelector((state) => {
    return state.user.user.id;
  });

  const getInfo = () => {
    api.engineersGet(id).then((res) => {
      const { code, message } = res.data;

      if (code !== 0) {
        notify.showError(message);
        router.push("/");
        return;
      }

      setInfo(message);
      setIsLoaded(true);
    });
  };

  useEffect(() => {
    if (id) getInfo();
  }, [id]);

  return (
    <>
      <Container size="xl">
        <Box mt={40} mb={60}>
          <LoadingOverlay visible={isLoading} overlayBlur={2} />
        </Box>
        <Box mt={20} mb={60}>
          {isLoaded && (
            <Grid gutter={36}>
              <Grid.Col xs={12} lg={9}></Grid.Col>
              <Grid.Col xs={12} lg={3}>
                {<ContactSide data={info} />}
              </Grid.Col>
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
};

export default EngineerPage;
