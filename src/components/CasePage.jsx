import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Box, Title, Flex, Divider, Text, CopyButton, SimpleGrid, ActionIcon, Tooltip, Button } from "@mantine/core";
import { useDocumentTitle } from '@mantine/hooks';
import { IconMailForward, IconCopy, IconCheck } from '@tabler/icons';
import * as api from "../helpers/api";
import { formatDate } from "../helpers/date";

const CasePage = ({ id }) => {
    const router = useRouter();
    const [caseInfo, setCaseInfo] = useState({
        title: ''
    });
    useDocumentTitle(caseInfo.title + ' - WeCoding');

    const initCaseInfo = () => {
        api.CaseGet(id).then((res) => {
            const { code, message } = res.data;

            if (code !== 0) {
                router.push('/');
                return;
            }
            setCaseInfo(message);
        })
    }

    const statusText = (status) => {
        if (status === "Y")
            return <Text size={16} color="red">尚未找到工程師</Text>
        else if (status === "N")
            return <Text size={16} color="green">已找到工程師</Text>
    };

    useEffect(() => {
        if (id)
            initCaseInfo();
    }, [id]);

    useEffect(() => {

    }, [caseInfo]);

    return (
        <>
            <Box mt={60} mb={40}>
                <Container size="xl">
                    <Box w="70%" mx="auto">
                        <Flex px={32} align="center">
                            <Title order={4}>{caseInfo.title}</Title>
                            <Text ml={16}>發布於 {formatDate(caseInfo.createAt, 'YYYY-MM-DD HH:mm:ss')}</Text>
                            <Title ml="auto" order={4}>{statusText(caseInfo.status)}</Title>
                        </Flex>

                        <Divider />

                        <Box px={32} mt={24}>
                            <Title order={5}>案件說明</Title>
                            <Box mt={16} px={32}>
                                <div dangerouslySetInnerHTML={{ __html: caseInfo.content }} />
                            </Box>
                        </Box>

                        <Box px={32} mt={16}>
                            <Title order={5}>預估完成時間</Title>
                            <Text mt={16} px={32}>{formatDate(caseInfo.createAt, 'YYYY-MM-DD')}</Text>
                        </Box>

                        <Box px={32} mt={16}>
                            <Title order={5}>作業地點</Title>
                            <Text mt={16} px={32}>{caseInfo.serviceType === 'R' ? '可遠端' : '需到現場作業'}</Text>
                        </Box>

                        <Box px={32} mt={16}>
                            <Title order={5}>案件說明</Title>
                            <Text mt={16} px={32}>{caseInfo.desc}</Text>
                        </Box>

                        <Box px={32} mt={16} w="50%">
                            <Title order={5}>聯絡方式</Title>

                            <SimpleGrid mt={16} px={32} cols={2} spacing="xl">
                                <div>電子郵件</div>
                                <Flex>
                                    {caseInfo.email}
                                    <ActionIcon>
                                        <IconMailForward size={36} />
                                    </ActionIcon>
                                </Flex>
                            </SimpleGrid>

                            <SimpleGrid mt={16} px={32} cols={2} spacing="xl">
                                <div>連絡電話</div>
                                <Flex>
                                    {caseInfo.phone}
                                    <CopyButton value={caseInfo.phone}>
                                        {({ copied, copy }) => (
                                            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                                                    {copied ? <IconCheck size={36} /> : <IconCopy size={36} />}
                                                </ActionIcon>
                                            </Tooltip>
                                        )}
                                    </CopyButton>
                                </Flex>
                            </SimpleGrid>

                            <SimpleGrid mt={16} px={32} cols={2} spacing="xl">
                                <div>Facebook</div>
                                <Flex>
                                    <a href={caseInfo.facebook}>{caseInfo.facebook}</a>
                                </Flex>
                            </SimpleGrid>

                            <SimpleGrid mt={16} px={32} cols={2} spacing="xl">
                                <div>Line</div>
                                <Flex>
                                    {caseInfo.line}
                                    <CopyButton value={caseInfo.line}>
                                        {({ copied, copy }) => (
                                            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                                                    {copied ? <IconCheck size={36} /> : <IconCopy size={36} />}
                                                </ActionIcon>
                                            </Tooltip>
                                        )}
                                    </CopyButton>
                                </Flex>
                            </SimpleGrid>
                        </Box>
                    </Box>
                </Container>
            </Box >
        </>
    )
}

export default CasePage;