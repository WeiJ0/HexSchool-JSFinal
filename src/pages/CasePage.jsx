import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Box,
  Title,
  Flex,
  Divider,
  Text,
  CopyButton,
  SimpleGrid,
  ActionIcon,
  Tooltip,
  Skeleton,
  LoadingOverlay,
} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import {
  IconMailForward,
  IconPhoneCall,
  IconCopy,
  IconCheck,
} from "@tabler/icons";
import * as api from "../helpers/api";
import { formatDate } from "../helpers/date";
import { addCommasToNumber } from "../helpers/number";

const CasePage = ({ id }) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [caseInfo, setCaseInfo] = useState({});
  useDocumentTitle(caseInfo.title + " - WeCoding");

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

  useEffect(() => {
    if (id) initCaseInfo();
  }, [id]);

  useEffect(() => {}, [caseInfo]);

  return (
    <>
      <Box mt={60} mb={40}>
        <LoadingOverlay visible={!isLoaded} overlayBlur={2} />
        <Container size="xl">
          <Box w={{ base: "100%", xl: "70%" }} mx="auto">
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

            <Box px={{ base: 0, lg: 32 }} mt={16} w="50%">
              <Title order={5}>聯絡方式</Title>

              <SimpleGrid mt={16} px={32} cols={2} spacing="xl">
                <div>電子郵件</div>
                <Flex>
                  {isLoaded ? (
                    <>
                      {caseInfo.email}
                      <ActionIcon
                        ml={8}
                        onClick={() => window.open(`mailto:${caseInfo.email}`)}
                      >
                        <IconMailForward size={36} />
                      </ActionIcon>
                    </>
                  ) : (
                    <Skeleton height={16} mt={6} radius="xl" />
                  )}
                </Flex>
              </SimpleGrid>

              <SimpleGrid mt={16} px={32} cols={2} spacing="xl">
                <div>連絡電話</div>
                <Flex>
                  {isLoaded ? (
                    <>
                      {caseInfo.phone}
                      <ActionIcon
                        ml={8}
                        onClick={() => window.open(`tel:${caseInfo.phone}`)}
                      >
                        <IconPhoneCall size={36} />
                      </ActionIcon>
                    </>
                  ) : (
                    <Skeleton height={16} mt={6} radius="xl" />
                  )}
                </Flex>
              </SimpleGrid>

              <SimpleGrid mt={16} px={32} cols={2} spacing="xl">
                <div>FB</div>
                <Flex>
                  {isLoaded ? (
                    <a href={caseInfo.facebook}>{caseInfo.facebook}</a>
                  ) : (
                    <Skeleton height={16} mt={6} radius="xl" />
                  )}
                </Flex>
              </SimpleGrid>

              <SimpleGrid mt={16} px={32} cols={2} spacing="xl">
                <div>Line</div>
                <Flex>
                  {isLoaded ? (
                    <>
                      {caseInfo.line}
                      <CopyButton ml={8} value={caseInfo.line}>
                        {({ copied, copy }) => (
                          <Tooltip
                            label={copied ? "Copied" : "Copy"}
                            withArrow
                            position="right"
                          >
                            <ActionIcon
                              color={copied ? "teal" : "gray"}
                              onClick={copy}
                            >
                              {copied ? (
                                <IconCheck size={36} />
                              ) : (
                                <IconCopy size={36} />
                              )}
                            </ActionIcon>
                          </Tooltip>
                        )}
                      </CopyButton>
                    </>
                  ) : (
                    <Skeleton height={16} mt={6} radius="xl" />
                  )}
                </Flex>
              </SimpleGrid>

              <SimpleGrid mt={16} px={32} cols={2} spacing="xl">
                <div>聯絡說明</div>
                <Flex>
                  {isLoaded ? (
                    <>{caseInfo.desc}</>
                  ) : (
                    <Skeleton height={16} mt={6} radius="xl" />
                  )}
                </Flex>
              </SimpleGrid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CasePage;
