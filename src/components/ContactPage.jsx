import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { Container, TextInput, MultiSelect, Divider, Textarea, Button, Radio, Group, Box, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMail, IconPhone, IconBrandFacebook, IconDeviceMobile } from '@tabler/icons';

import PageBreadcrumb from './PageBreadcrumb';
import * as api from "../helpers/api";
import * as notify from "../helpers/notify";

const OffererForm = ({ type, setLoading }) => {

    const [isSubmit, setSubmit] = useState(false);
    const form = useForm({
        initialValues: { email: '', phone: '', facebook: '', line: '', desc: '' },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const initForm = () => {
        setLoading(true);
        api.userGetContact({ type })
            .then(res => {
                setLoading(false);
                const { email, phone, facebook, line, desc } = res.data.message;
                form.setFieldValue('email', email);
                form.setFieldValue('phone', phone);
                form.setFieldValue('facebook', facebook);
                form.setFieldValue('line', line);
                form.setFieldValue('desc', desc);
            })
    }

    const submitForm = (value) => {
        setSubmit(true);
        api.userEditContact({
            type,
            content: value
        })
            .then(res => {
                const { code, message } = res.data;
                if (code === 0) {
                    notify.showSuccess(message);
                } else {
                    notify.showError(message);
                }
                setSubmit(false);
            })
            .catch(err => {
                notify.showError(err);
                setSubmit(false);
            })
    }

    useEffect(() => {
        initForm();
    }, []);

    return (
        <form onSubmit={form.onSubmit((values) => submitForm(values))}>
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
                <Button size='md' type="submit" mt="sm" mb={32}
                    loading={isSubmit}>
                    儲存
                </Button>
            </Group>
        </form>
    )
}

const EngineerForm = ({ type, setLoading }) => {
    const [isSubmit, setSubmit] = useState(false);

    const languages = [
        { value: 'react', label: 'React' },
        { value: 'ng', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'vue', label: 'Vue' },
        { value: 'riot', label: 'Riot' },
        { value: 'next', label: 'Next.js' },
        { value: 'blitz', label: 'Blitz.js' },
    ]

    const form = useForm({
        initialValues: { service: '', languages: '', email: '', phone: '', facebook: '', line: '', desc: '' },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const initForm = () => {
        setLoading(true);
        api.userGetContact({ type })
            .then(res => {
                setLoading(false);
                const { email, serviceType, languages, phone, facebook, line, desc } = res.data.message;
                form.setFieldValue('email', email);
                form.setFieldValue('service', serviceType === 'r' ? 'remote' : 'office');
                form.setFieldValue('languages', languages);
                form.setFieldValue('phone', phone);
                form.setFieldValue('facebook', facebook);
                form.setFieldValue('line', line);
                form.setFieldValue('desc', desc);
            })
    }

    const submitForm = (value) => {
        setSubmit(true);
        api.userEditContact({
            type,
            content: value
        })
            .then(res => {
                const { code, message } = res.data;
                if (code === 0) {
                    notify.showSuccess(message);
                } else {
                    notify.showError(message);
                }
                setSubmit(false);
            })
            .catch(err => {
                notify.showError(err);
                setSubmit(false);
            })
    }

    useEffect(() => {
        initForm();
    }, [])

    return (
        <form onSubmit={form.onSubmit((values) => submitForm(values))}>
            <Radio.Group
                name="service"
                label="服務方式"
                withAsterisk
                {...form.getInputProps('service')}
            >
                <Radio value="remote" label="遠端作業" />
                <Radio value="office" label="可到場作業" />
            </Radio.Group>

            <MultiSelect
                mt="sm"
                data={languages}
                label="擅長程式語言"
                {...form.getInputProps('languages')}
            />

            <Divider my="md" />

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
                <Button size='md' type="submit" mt="sm" mb={32}
                    loading={isSubmit}>
                    儲存
                </Button>
            </Group>
        </form>
    )
}

const Contact = ({ type }) => {
    const userState = useSelector(state => state.user.user);
    const [isLoading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const pageData = [
        { title: '首頁', href: '/' },
        { title: '會員中心', href: '/User' },
        {
            title: type === 'Offerer' ? '發案方聯絡方式維護' : '工程師聯絡方式維護',
            href: type === 'Offerer' ? '/Contact/Offerer' : '/Contact/Engineer'
        },
    ]

    useEffect(() => {
        setUserInfo(userState);
    }, []);

    return (
        <>
            <Box>
                <LoadingOverlay visible={isLoading} overlayBlur={2} />
                <Container size="xl">
                    <Box mt={40} mb={60}>
                        <PageBreadcrumb pageData={pageData} />
                    </Box>
                    <Box mb={60} w="50%" mx="auto">
                        {type === 'offerer' ?
                            <OffererForm type={type} setLoading={setLoading} /> :
                            <EngineerForm type={type} setLoading={setLoading} />
                        }
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default Contact