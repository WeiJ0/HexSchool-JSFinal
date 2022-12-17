import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../slices/userSlice';
import { Box, Table, ActionIcon, Flex, Input, Button, Container, Title, Grid, SegmentedControl, Text, LoadingOverlay } from '@mantine/core';
import { IconEdit } from '@tabler/icons';
import PageBreadcrumb from '../components/PageBreadcrumb';
import * as api from "../helpers/api"
import * as notify from "../helpers/notify"
import { formatDate } from "../helpers/date";

const CaseList = () => {
    const router = useRouter();
    const { page, query, status, type } = router.query

    const [cases, setCases] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const userInfo = useSelector(state => state.user.user);

    const pageData = [
        { title: '首頁', href: '/' },
        { title: '會員中心', href: '/User' },
        { title: '我的發案', href: '/Case' },
    ]

    const editDetail = (id) => {
        router.push(`/Post/${id}`)
    }

    const getCases = () => {
        api.CaseListByUser(8, 1, query, status, type)
            .then(res => {
                const { code, message } = res.data;

                if (code === -2) {
                    setLoading(false);
                    return;
                }

                if (code !== 0) {
                    notify.showError(message)
                    return;
                }

                setCases(message);
                setLoading(false);
            })
    }

    const caseStatus = (status) => status === 'Y' ? '待找工程師' : '已找到工程師';

    const caseRows = cases.map((item, index) => {
        const { title, status, createAt, id } = item;
        return (
            <tr key={id}>
                <td>{title}</td>
                <td>{caseStatus(status)}</td>
                <td>{formatDate(createAt, 'YYYY-MM-DD HH:mm:ss')}</td>
                <td>
                    {
                        <ActionIcon onClick={() => editDetail(id)}>
                            <IconEdit size={24} />
                        </ActionIcon>
                    }
                </td>
            </tr>
        )
    })


    useEffect(() => {
        getCases();
    }, [])

    return (
        <>
            <Box mt={60} mb={40}>
                <LoadingOverlay visible={isLoading} />
                <Container size="xl">
                    <Box mt={40} mb={60}>
                        <PageBreadcrumb pageData={pageData} />
                    </Box>
                    <Box w="80%" mx="auto">
                        <Box>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>案件標題</th>
                                        <th>狀態</th>
                                        <th>上架時間</th>
                                        <th>編輯</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cases.length == 0 ?
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                                <Text fw="bold" color="red" py={24}>尚未新增任何案件</Text>
                                            </td>
                                        </tr> :
                                        caseRows
                                    }
                                </tbody>
                            </Table>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default CaseList;