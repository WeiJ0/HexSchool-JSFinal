import { useState, useEffect, useRef, use } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import Image from 'next/image';

import { Box, Container, Grid, TextInput, Textarea, FileInput, Title, Button, Flex, Avatar } from '@mantine/core';
import { IconPhoneCalling, IconList, IconStar, IconPencil, IconFile, IconCheck, IconX } from '@tabler/icons';
import { userActions } from '../slices/userSlice';

import PageBreadcrumb from './PageBreadcrumb';

import * as api from "../helpers/api";
import * as notify from "../helpers/notify";

const UserTool = () => {
    const router = useRouter();
    return (
        <>
            <Grid w="95%" mx="auto" gutter="sm" mt={40}>
                <Grid.Col sm={12} lg={6}>
                    <Flex direction="column" align="center">
                        <Title order={5}>我是發案方</Title>
                        <Flex direction="column" align="center" mt={20} w={300}>
                            <Button leftIcon={<IconPhoneCalling size={20} />}
                                variant="outline" fw={400}
                                fullWidth size="md" my={10}
                                onClick={() => { router.push('/Contact/Offerer') }}
                            >聯絡方式維護</Button>
                            <Button leftIcon={<IconList size={20} />} variant="outline" fw={400} fullWidth size="md" my={10}>已發案件列表</Button>
                            <Button leftIcon={<IconStar size={20} />} variant="outline" fw={400} fullWidth size="md" my={10}>收藏工程師列表</Button>
                        </Flex>
                    </Flex>
                </Grid.Col>
                <Grid.Col sm={12} lg={6}>
                    <Flex direction="column" align="center">
                        <Title order={5}>我是工程師</Title>
                        <Flex direction="column" align="center" mt={20} w={300}>
                            <Button leftIcon={<IconPencil size={20} />}
                                variant="outline" fw={400} fullWidth size="md" my={10}
                                onClick={() => { router.push('/Contact/Engineer') }}>個人簡歷維護</Button>
                            <Button leftIcon={<IconFile size={20} />} variant="outline" fw={400} fullWidth size="md" my={10}>作品集維護</Button>
                            <Button leftIcon={<IconStar size={20} />} variant="outline" fw={400} fullWidth size="md" my={10}>收藏案件列表</Button>
                        </Flex>
                    </Flex>
                </Grid.Col>
            </Grid>
        </>
    )
}

const UserInfoEdit = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user.user);
    const [userAvatar, setUserAvatar] = useState('');
    const [userNickname, setUserNickname] = useState(userInfo.nickname);
    const [userIntro, setUserIntro] = useState(userInfo.intro);

    const updateIntro = () => {
        api.userEditInfo(userNickname, userIntro)
            .then(res => {
                const { code, message } = res.data;

                if (code === 1) {
                    notify.showSuccess(message);
                    dispatch(userActions.update(message));
                }
                else
                    notify.showError(message);
            })
            .catch(err => {
                notify.showError(err.message);
            })
    }

    const updateAvatar = (file) => {
        const formData = new FormData();
        formData.append('avatar', file);
        formData.append('uid', userInfo.id);
        formData.append('token', userInfo.token);

        api.userUploadAvatar(formData)
            .then(res => {
                const { code, message } = res.data;

                if (code === 0) {
                    notify.showSuccess('更換成功');
                    dispatch(userActions.update(message));
                }
                else
                    notify.showError(message);
            })
            .catch(err => {
                notify.showError(err.message);
            })
    }


    useEffect(() => {
        console.log(userInfo);
        setUserAvatar(userInfo.avatar);
    }, [userInfo]);

    return (
        <>
            <Grid w="95%" mx="auto" gutter="sm" mt={40}>
                <Grid.Col sm={12} lg={5}>
                    <Flex direction="column" align="center">
                        <img src={userAvatar || ''} alt="個人照片" width={200} height={200} style={{ objectFit: 'cover' }} />
                        <FileInput placeholder="上傳個人照片" color="custom-primary.1" size="md" variant="unstyled"
                            accept="image/png,image/jpeg" onChange={(e) => updateAvatar(e)} />
                    </Flex>
                </Grid.Col>
                <Grid.Col sm={12} lg={7}>
                    <Box mt={40}>
                        <Grid gutter="sm" >
                            <Grid.Col sm={12} lg={4}>暱稱</Grid.Col>
                            <Grid.Col sm={12} lg={8}>
                                <TextInput placeholder="Nickname" mb={30} value={userNickname}
                                    onChange={((e) => setUserNickname(e.target.value))} />
                            </Grid.Col>
                        </Grid>
                        <Grid gutter="sm">
                            <Grid.Col sm={12} lg={4}>自我介紹 (200字內)</Grid.Col>
                            <Grid.Col sm={12} lg={8}>
                                <Textarea
                                    label=""
                                    placeholder=""
                                    value={userIntro || ''}
                                    onChange={((e) => setUserIntro(e.target.value))}
                                    autosize
                                    minRows={5}
                                />
                            </Grid.Col>
                        </Grid>

                        <Flex mt={24} justify="flex-end">
                            <Button size="md" fw={400} onClick={updateIntro} >儲存</Button>
                        </Flex>
                    </Box>
                </Grid.Col>
            </Grid>
        </>
    )
}

const UserPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const userState = useSelector(state => state.user.user);
    const [userInfo, setUserInfo] = useState({});
    const pageData = [
        { title: '首頁', href: '/' },
        { title: '會員中心', href: '/User' },
    ]

    const logout = () => {
        dispatch(userActions.clear());
        router.push('/');
    }

    useEffect(() => {
        setUserInfo(userState);
    }, [userState]);

    return (
        <>
            <Box>
                <Container size="xl">
                    <Box mt={40} mb={60}>
                        <PageBreadcrumb pageData={pageData} />
                    </Box>
                    <Box mb={60}>
                        <Flex direction={{ base: 'column', md: 'row' }}>
                            <Title order={4} mr={32}>歡迎會員： {userInfo.nickname} </Title>
                            <Box>
                                <Button fw={400} pl={{ base: 0 }} variant="subtle">變更會員密碼</Button>
                                <Button fw={400} variant="subtle" onClick={logout}>登出</Button>
                            </Box>
                        </Flex>
                        <UserInfoEdit />
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