import { useState } from 'react';
import { Container, Title, TextInput, Textarea, FileInput, NumberInput, Radio, Button, Group, Box, SimpleGrid, LoadingOverlay } from '@mantine/core';
import { IconMail, IconPhone, IconBrandFacebook, IconDeviceMobile, IconCalendar } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { useEffect } from 'react';
import dayjs from 'dayjs';

import PageBreadcrumb from './PageBreadcrumb';
import Editor from './editor';

import * as notify from "../helpers/notify";
import * as api from "../helpers/api";
import { useRouter } from 'next/router';

const Post = ({ isEdit }) => {
    const [isLoading, setLoading] = useState(false);
    const [isSubmit, setSubmit] = useState(false);
    const router = useRouter();

    const pageData = [
        { title: '首頁', href: '/' },
        { title: '我要發案', href: '#' },
    ]

    const form = useForm({
        initialValues: {
            title: "",
            content: "",
            service: "",
            date: "",
            files: [],
            email: "",
            phone: "",
            facebook: "",
            line: "",
            desc: ""
        },
        validate: {
            title: (value) => (value.length > 0 ? null : '需要輸入標題'),
            title: (value) => (value.length < 30 ? null : '標題需少於15字'),
            content: (value) => (value.length > 0 ? null : '需要輸入內容'),
            serviceType: (value) => (value ? null : '需要選擇服務'),
            finishDate: (value) => (value ? null : '需要選擇完成日期'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email格式錯誤'),
            minPrice: (value) => { console.log(value); (!value ? null : '最低預算需大於0') },
            maxPrice: (value) => { console.log(value); (!value ? null : '需要輸入預算上限') },
        }
    });

    const initContact = () => {
        api.userGetContact({ type: "offerer" })
            .then(res => {
                setLoading(false);
                const { email, phone, facebook, line, desc } = res.data.message;
                form.setFieldValue('email', email);
                form.setFieldValue('phone', phone);
                form.setFieldValue('facebook', facebook);
                form.setFieldValue('line', line);
                form.setFieldValue('desc', desc);
            })
            .catch(err => { })
    }

    const submitForm = (value) => {

        setSubmit(true);
        let data = value;
        data.content = data.content.replaceAll('\n', '<br/>')

        if (isEdit) {

        } else {
            api.CaseAdd({
                data
            }).then(res => {
                const { code, message } = res.data;
                if (code !== 0) {
                    notify.showError(message);
                    setSubmit(false);
                    return;
                }
                setSubmit(false);

                setTimeout(() => {
                    router.push(`/Case/${message}`);
                }, 1000);
            })
        }
    }

    const initForm = () => {
        initContact();
    }

    useEffect(() => { initForm() }, []);

    return (
        <>
            <Container size="xl">
                <Box mt={40} mb={60}>
                    <LoadingOverlay visible={isLoading} overlayBlur={2} />
                    <PageBreadcrumb pageData={pageData} />
                </Box>
                <Box mt={20} mb={60} w="50%" mx="auto">

                    <form onSubmit={form.onSubmit((values) => submitForm(values))}>
                        <TextInput
                            withAsterisk
                            label="案件標題"
                            placeholder='至多15字'
                            {...form.getInputProps('title')}
                        />

                        <Textarea
                            mt="sm"
                            label="案件說明"
                            minRows={5}
                            placeholder='至多200字'
                            withAsterisk
                            {...form.getInputProps('content')}
                        />


                        <FileInput
                            mt="sm"
                            label="案件附件"
                            description="限上傳圖檔或是 pdf，至多 5 個"
                            placeholder='點擊選擇'
                            multiple
                        />

                        <SimpleGrid mt="sm" cols={2}>
                            <div>
                                <DatePicker
                                    withAsterisk
                                    icon={<IconCalendar size={16} />}
                                    label="預計完成時間"
                                    placeholder="最短需一天時間"
                                    minDate={dayjs(new Date()).add(1, 'days').toDate()}
                                    {...form.getInputProps('finishDate')}
                                />
                            </div>
                            <div>
                                <Radio.Group
                                    withAsterisk
                                    name="serviceType"
                                    label="作業地點"
                                    {...form.getInputProps('serviceType')}
                                >
                                    <Radio value="remote" label="遠端作業" />
                                    <Radio value="office" label="進辦公室" />
                                </Radio.Group>
                            </div>
                        </SimpleGrid>

                        <SimpleGrid mt="sm" cols={2}>
                            <div>
                                <NumberInput
                                    label="預算下限"
                                    withAsterisk
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    formatter={(value) =>
                                        !Number.isNaN(parseInt(value))
                                            ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                            : '$ '
                                    }
                                    {...form.getInputProps('minPrice')}
                                />
                            </div>
                            <div>
                                <NumberInput
                                    label="預算上限"
                                    withAsterisk
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    formatter={(value) =>
                                        !Number.isNaN(parseInt(value))
                                            ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                            : '$ '
                                    }
                                    {...form.getInputProps('maxPrice')}
                                />
                            </div>
                        </SimpleGrid>

                        <Title order={5} my="sm">聯絡方式</Title>

                        <TextInput
                            withAsterisk
                            icon={<IconMail />}
                            label="電子信箱"
                            description="不影響登入用信箱，僅顯示在頁面上"
                            placeholder="電子信箱"
                            {...form.getInputProps('email')}
                        />

                        <TextInput
                            icon={<IconPhone />}
                            mt="sm"
                            label="連絡電話"
                            {...form.getInputProps('phone')}
                        />

                        <TextInput icon={<IconBrandFacebook />}
                            mt="sm"
                            label="Facebook"
                            description="個人頁面連結"
                            {...form.getInputProps('facebook')}
                        />

                        <TextInput
                            icon={<IconDeviceMobile />}
                            mt="sm"
                            label="Line ID"
                            {...form.getInputProps('line')}
                        />

                        <Textarea
                            mt="sm"
                            placeholder="例如電話方便聯絡時間 or Email 來信主旨請填 or Message 來信請註明於 WeCoding 看見某案件"
                            label="聯絡說明短述"
                            minRows={5}
                            {...form.getInputProps('desc')}
                        />

                        <Group position="center" mt="md">
                            <Button
                                size='md'
                                type="submit"
                                mt="sm"
                                mb={32}
                                loading={isSubmit}
                            >
                                送出
                            </Button>
                        </Group>
                    </form>
                </Box>
            </Container>
        </>
    )
}

export default Post