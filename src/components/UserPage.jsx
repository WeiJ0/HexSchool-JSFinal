import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Grid, TextInput, Textarea, FileInput, Title, Button, Flex, Avatar } from '@mantine/core';
import { IconPhoneCalling, IconList, IconStar, IconPencil, IconFile } from '@tabler/icons';

import PageBreadcrumb from './PageBreadcrumb';

const UserTool = () => {
    return (
        <>
            <Grid w="95%" mx="auto" gutter="sm" mt={40}>
                <Grid.Col span={6}>
                    <Flex direction="column" align="center">
                        <Title order={5}>我是發案方</Title>
                        <Flex direction="column" align="center" mt={20} w={300}>
                            <Button leftIcon={<IconPhoneCalling size={20} />} variant="outline" fw={400} fullWidth size="md" my={10}>聯絡方式維護</Button>
                            <Button leftIcon={<IconList size={20} />} variant="outline" fw={400} fullWidth size="md" my={10}>已發案件列表</Button>
                            <Button leftIcon={<IconStar size={20} />} variant="outline" fw={400} fullWidth size="md" my={10}>收藏工程師列表</Button>
                        </Flex>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Flex direction="column" align="center">
                        <Title order={5}>我是工程師</Title>
                        <Flex direction="column" align="center" mt={20} w={300}>
                            <Button leftIcon={<IconPencil size={20} />} variant="outline" fw={400} fullWidth size="md" my={10}>個人簡歷維護</Button>
                            <Button leftIcon={<IconFile size={20} />} variant="outline" fw={400} fullWidth size="md" my={10}>作品集維護</Button>
                            <Button leftIcon={<IconStar size={20} />} variant="outline" fw={400} fullWidth size="md" my={10}>收藏案件列表</Button>
                        </Flex>
                    </Flex>
                </Grid.Col>
            </Grid>
        </>
    )
}

const UserInfoEdit = ({ user }) => {
    return (
        <>
            <Grid w="95%" mx="auto" gutter="sm" mt={40}>
                <Grid.Col span={5}>
                    <Flex direction="column" align="center">
                        <Avatar src={user.avatar} size={230} variant="outline" sx={{ border: "none" }} bg={'transparent'} />
                        <FileInput placeholder="上傳個人照片" color="custom-primary.1" size="md" variant="unstyled" accept="image/png,image/jpeg" />
                    </Flex>
                </Grid.Col>
                <Grid.Col span={7}>
                    <Box mt={40}>
                        <Grid gutter="sm" >
                            <Grid.Col span={4}>暱稱</Grid.Col>
                            <Grid.Col span={8}>
                                <TextInput placeholder="Nickname" mb={30} value={user.nickname} />
                            </Grid.Col>
                        </Grid>
                        <Grid gutter="sm">
                            <Grid.Col span={4}>自我介紹 (200字內)</Grid.Col>
                            <Grid.Col span={8}>
                                <Textarea
                                    label=""
                                    placeholder=""
                                    value={user.intro}
                                    autosize
                                    minRows={5}
                                />
                            </Grid.Col>
                        </Grid>

                        <Flex mt={24} justify="flex-end">
                            <Button size="md" fw={400} >儲存</Button>
                        </Flex>
                    </Box>
                </Grid.Col>
            </Grid>
        </>
    )
}

const UserPage = () => {
    const userInfo = useSelector(state => state.user.user);

    const pageData = [
        { title: '首頁', href: '/' },
        { title: '會員中心', href: '/User' },
    ]

    return (
        <>
            <Box>
                <Container size="xl">
                    <Box mt={40} mb={60}>
                        <PageBreadcrumb pageData={pageData} />
                    </Box>
                    <Box mb={60}>
                        <Flex>
                            <Title order={4} mr={32}>歡迎會員： [{userInfo.nickname}]</Title>
                            <Box>
                                <Button fw={400} variant="subtle">變更會員密碼</Button>
                                <Button fw={400} variant="subtle">登出</Button>
                            </Box>
                        </Flex>
                        <UserInfoEdit user={userInfo} />
                    </Box>
                    <Box mb={60}>
                        <UserTool />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default UserPage