import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { Container, TextInput, Textarea, Button, Form, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMail, IconPhone, IconBrandFacebook, IconDeviceMobile } from '@tabler/icons';

import PageBreadcrumb from './PageBreadcrumb';
import * as api from "../helpers/api";
import * as notify from "../helpers/notify";

const Contact = (type) => {
    const userState = useSelector(state => state.user.user);
    const [userInfo, setUserInfo] = useState({});

    const form = useForm({
        initialValues: { email: '', phone: '', facebook: '', line: '', desc: '' },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const pageData = [
        { title: '首頁', href: '/' },
        { title: '會員中心', href: '/User' },
        { title: '發案方聯絡方式維護', href: '/Contact/Offerer' },
    ]

    useEffect(() => {
        setUserInfo(userState);
    }, []);

    return (
        <>
            <Box>
                <Container size="xl">
                    <Box mt={40} mb={60}>
                        <PageBreadcrumb pageData={pageData} />
                    </Box>
                    <Box mb={60} w="50%" mx="auto">
                        <form>
                            <TextInput
                                icon={<IconMail />}
                                label="電子信箱"
                                description="不影響登入用信箱，僅顯示在頁面上"
                                placeholder="電子信箱"
                                {...form.getInputProps('email')}
                            />
                            <TextInput icon={<IconPhone />} mt="sm" label="連絡電話" {...form.getInputProps('phone')} />
                            <TextInput icon={<IconBrandFacebook />} mt="sm" label="Facebook" description="個人頁面連結" placeholder="" {...form.getInputProps('facebook')} />
                            <TextInput icon={<IconDeviceMobile />} mt="sm" label="Line ID" {...form.getInputProps('line')} />
                            <Textarea
                                mt="sm"
                                placeholder="例如電話方便聯絡時間 or Email 來信主旨請填 or Message 來信請註明於 WeCoding 看見某案件"
                                label="聯絡說明短述"
                                minRows={5}
                                {...form.getInputProps('desc')}
                            />
                            <Group position='center'>
                                <Button size='md' type="submit" mt="sm" mb={32}>
                                    儲存
                                </Button>
                            </Group>
                        </form>
                    </Box>

                </Container>
            </Box>
        </>
    )
}

export default Contact