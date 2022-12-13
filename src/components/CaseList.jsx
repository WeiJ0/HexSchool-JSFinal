import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../slices/userSlice';
import { Box, Flex, Input, Button, Container, Title, Grid, SegmentedControl, Text, LoadingOverlay } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { IconSearch, IconPlus, IconListDetails, IconStar } from '@tabler/icons';
import * as api from "../helpers/api"
import * as notify from "../helpers/notify"
import { addCommasToNumber } from "../helpers/number";


const CaseToolbar = ({ userId }) => {
    const router = useRouter();
    const { page, query, status, type } = router.query;
    const [uid, setUid] = useState('');
    const [searchText, setSearchText] = useState(query || '');

    useEffect(() => {
        setUid(userId);
    }, [userId]);

    return (
        <>
            <Flex justify={'space-between'}>
                <Box>
                    <Flex>
                        <Input
                            mr="sm"
                            w={200}
                            placeholder="案件關鍵字"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button
                            bg="custom-primary.1"
                            leftIcon={<IconSearch />}
                            onClick={() => router.push(`/Case/?query=${searchText}`)}
                        >
                            搜尋
                        </Button>
                    </Flex>
                </Box>

                {uid &&
                    <Button
                        bg="custom-primary.1"
                        leftIcon={<IconPlus />}
                        onClick={() => router.push('/Post')}
                    >
                        我要發案
                    </Button>}
            </Flex>

            <Box mt={24}>
                <Flex>
                    <Title order={4} mr="sm">案件狀態</Title>
                    <SegmentedControl
                        color="custom-primary.1"
                        bg="transparent"
                        transitionDuration={500}
                        transitionTimingFunction="linear"
                        data={[
                            { label: '全部案件', value: 'ALL' },
                            { label: '未找到工程師', value: 'Y' },
                        ]}
                    />
                </Flex>
            </Box>
        </>
    )
}

const itemStyle = {
    border: '1px solid #E5E5E5',
    "&:hover": {
        transform: "translateY(-2px)",
    }
}

const CaseItem = ({ data, userId, clickEvent, collectEvent }) => {
    const { id, title, content, status, serviceType, minPrice, maxPrice } = data;

    return (
        <>
            <Box py={16} px={32} sx={itemStyle}>
                <Flex justify="space-between" align="center">
                    <Title order={5}>{title}</Title>
                    {status === 'N' && <Text color="custom.green.1">已找到工程師</Text>}
                </Flex>

                <Text color="#8A8A8B" lineClamp={2} size={14} h={42} mt={16}>{content.replaceAll('<br/>', '')}</Text>

                <Flex justify="space-between" align="center" mt={24}>
                    <Text color="custom-primary.1" c="red" mr="sm">{addCommasToNumber(minPrice)} - {addCommasToNumber(maxPrice)}</Text>

                    <Flex>
                        <Button
                            mr={8}
                            size="sm"
                            variant="outline"
                            leftIcon={<IconListDetails />}
                            onClick={() => clickEvent(id)}
                        >
                            詳細內容
                        </Button>
                        {userId &&
                            <Button
                                size="sm"
                                variant="outline"
                                leftIcon={<IconStar />}
                                onClick={() => collectEvent(id)}
                            >
                                收藏
                            </Button>}
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

const CaseList = () => {
    const router = useRouter();
    const { page, query, status, type } = router.query

    const [title, setTitle] = useState('案件列表 - WeCoding');
    useDocumentTitle(title);

    const [cases, setCases] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const isLogin = useSelector(state => {
        return state.user.user.id
    });

    const toDetail = (id) => {
        router.push(`/Case/${id}`)
    }

    const collectCase = (id) => {
        api.CollectAdd(id)
            .then(res => {
                const { code, message } = res.data;

                if (code !== 0) {
                    notify.showError(message)
                    return;
                }

                notify.showSuccess('成功收藏');
            })
    }

    const getCases = () => {
        api.CaseList(8, 1, query, status, type)
            .then(res => {
                const { code, message } = res.data;

                if (code !== 0) {
                    notify.showError(message)
                    return;
                }

                setCases(message);
                setLoading(false);
            })
    }

    useEffect(() => {
        getCases();

        if (query)
            setTitle(`案件查詢 ${query} - WeCoding`);

    }, [router.query])

    return (
        <>
            <Box mt={60} mb={40}>
                <LoadingOverlay visible={isLoading} />
                <Container size="xl">
                    <Box w="80%" mx="auto">
                        <CaseToolbar userId={isLogin} />
                        <Box>
                            <Grid gutter={30} mt={20}>
                                {
                                    cases.map((item, index) => {
                                        return (
                                            <Grid.Col span={6} key={item.id}>
                                                <CaseItem
                                                    key={item.id}
                                                    data={item}
                                                    userId={isLogin}
                                                    clickEvent={toDetail}
                                                    collectEvent={collectCase}
                                                />
                                            </Grid.Col>
                                        )
                                    })
                                }
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default CaseList;