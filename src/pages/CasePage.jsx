import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  Container,
  Grid,
  Box,
  Title,
  Flex,
  Divider,
  Text,
  CopyButton,
  Button,
  ActionIcon,
  Tooltip,
  Skeleton,
  LoadingOverlay,
  Avatar,
} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import {
  IconStar,
  IconMailForward,
  IconPhoneCall,
  IconCopy,
  IconCheck,
} from "@tabler/icons";
import * as api from "../helpers/api";
import * as notify from "../helpers/notify";
import { formatDate } from "../helpers/date";
import { addCommasToNumber } from "../helpers/number";

const ContactSide = ({ data, isLogin, collect, isCollect }) => {
  console.log(data);
  const { Users, desc, email, facebook, line, phone } = data;
  const { nickname, avatar } = Users;

  return (
    <>
      {data && (
        <>
          <Flex justify="center" mt={16}>
            <Avatar size="xl" src={avatar} />
          </Flex>
          <Text mt="md" align="center">
            {nickname}
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
                      {copied ? (
                        <IconCheck size={36} />
                      ) : (
                        <IconCopy size={36} />
                      )}
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
                      {copied ? (
                        <IconCheck size={36} />
                      ) : (
                        <IconCopy size={36} />
                      )}
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
                bg={isCollect ? "gray" : "custom-primary.1"}
                onClick={collect}
              >
                {isCollect ? "取消案件" : "收藏該案件"}
              </Button>
            )}
          </Flex>
        </>
      )}
    </>
  );
};

const CasePage = ({ id }) => {
  const router = useRouter();
  const userState = useSelector((state) => state.user.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [caseInfo, setCaseInfo] = useState({});
  useDocumentTitle(caseInfo.title + " - WeCoding");

  const isLogin = useSelector((state) => {
    return state.user.user.id;
  });

  const initCaseInfo = () => {
    api.CaseGet(id).then((res) => {
      const { code, message } = res.data;

      if (code !== 0) {
        router.push("/");
        return;
      }
      setCaseInfo(message);
      setIsLoaded(true);
    });
  };

  // 案件狀態顯示
  const statusText = (status) => {
    return status === "Y" ? (
      <Text size={16} color="red">
        尚未找到工程師
      </Text>
    ) : (
      <Text size={16} color="green">
        已找到工程師
      </Text>
    );
  };

  const isCollect = () => {
    if (!userState) return false;
    else {
      return caseInfo.collect
        .map((item) => item.userId === userState.id)
        .includes(true);
    }
  };

  const collect = () => {
    api
      .Collect("case", id)
      .then((res) => {
        const { code, message } = res.data;
        if (code === 0) {
          notify.showSuccess(message);     
          initCaseInfo();     
        } else {
          notify.showError(message);
        }
      })
      .catch((err) => {
        notify.showError(err);
      });
  };

  useEffect(() => {
    if (id) initCaseInfo();
  }, [id]);

  useEffect(() => {}, [caseInfo]);

  return (
    <>
      <Box mt={60} mb={40}>
        <LoadingOverlay visible={!isLoaded} overlayBlur={2} />
        <Container size="xl">
          <Grid gutter={36}>
            <Grid.Col xs={12} lg={9}>
              <Flex
                px={{ base: 0, xl: 32 }}
                align="center"
                direction={{ base: "column", xl: "row" }}
              >
                {isLoaded ? (
                  <>
                    <Title order={4}>{caseInfo.title}</Title>
                    <Text ml={16}>
                      發布於
                      {formatDate(caseInfo.createAt, "YYYY-MM-DD HH:mm:ss")}
                    </Text>
                    <Title ml={{ base: 0, xl: "auto" }} order={4}>
                      {statusText(caseInfo.status)}
                    </Title>
                  </>
                ) : (
                  <Skeleton height={16} mt={6} radius="xl" />
                )}
              </Flex>

              <Divider mt={8} />

              <Box px={{ base: 0, lg: 32 }} mt={24}>
                <Title order={5}>案件說明</Title>
                <Box mt={16} px={32}>
                  {isLoaded ? (
                    <>
                      <div
                        dangerouslySetInnerHTML={{ __html: caseInfo.content }}
                      />
                    </>
                  ) : (
                    <Skeleton height={16} mt={6} radius="xl" />
                  )}
                </Box>
              </Box>

              <Box px={{ base: 0, lg: 32 }} mt={16}>
                <Title order={5}>預估完成時間</Title>
                <Text mt={16} px={32}>
                  {isLoaded ? (
                    formatDate(caseInfo.createAt, "YYYY-MM-DD")
                  ) : (
                    <Skeleton height={16} mt={6} radius="xl" />
                  )}
                </Text>
              </Box>

              <Box px={{ base: 0, lg: 32 }} mt={16}>
                <Title order={5}>作業地點</Title>
                <Text mt={16} px={32}>
                  {isLoaded ? (
                    caseInfo.serviceType === "R" ? (
                      "可遠端"
                    ) : (
                      "需到現場作業"
                    )
                  ) : (
                    <Skeleton height={16} mt={6} radius="xl" />
                  )}
                </Text>
              </Box>

              <Box px={{ base: 0, lg: 32 }} mt={16}>
                <Title order={5}>預算</Title>
                <Text mt={16} px={32}>
                  {isLoaded ? (
                    `${addCommasToNumber(
                      caseInfo.minPrice
                    )} - ${addCommasToNumber(caseInfo.maxPrice)}`
                  ) : (
                    <Skeleton height={16} mt={6} radius="xl" />
                  )}
                </Text>
              </Box>
            </Grid.Col>
            <Grid.Col xs={12} lg={3}>
              {isLoaded && (
                <ContactSide
                  data={caseInfo}
                  isLogin={isLogin}
                  collect={collect}
                  isCollect={isCollect()}
                />
              )}
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CasePage;
