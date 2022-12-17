import { useState } from 'react';
import { Container, Title, TextInput, Textarea, FileInput, NumberInput, Radio, Button, Group, Box, SimpleGrid, LoadingOverlay } from '@mantine/core';
import { IconMail, IconPhone, IconBrandFacebook, IconDeviceMobile, IconCalendar } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { useEffect } from 'react';
import dayjs from 'dayjs';

import PageBreadcrumb from '../components/PageBreadcrumb';

import * as notify from "../helpers/notify";
import * as api from "../helpers/api";
import { useRouter } from 'next/router';

const Post = ({ isEdit }) => {
    const [isLoading, setLoading] = useState(false);
    const [isSubmit, setSubmit] = useState(false);
    const router = useRouter();
    const { id } = router.query;

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
            desc: "",
            minPrice: 1000,
            maxPrice: 3000
        },
        validate: {
            title: (value) => (value.length == 0 ? '需要輸入標題' : null),
            title: (value) => (value.length > 30 ? '標題需少於30字' : null),
            content: (value) => (value.length == 0 ? '需要輸入內容' : null),
            content: (value) => (value.length > 500 ? '內容須少於500字' : null),
            serviceType: (value) => (value ? null : '需要選擇服務'),
            finishDate: (value) => (value ? null : '需要選擇完成日期'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email格式錯誤'),
            minPrice: (value) => (value <= 0 ? '最低預算需大於0' : null),
            maxPrice: (value) => (value <= 0 ? '預算上限需大於0' : null),
        }
    });

    // 從案件編號取得原本資料
    const initCase = () => {
        api.CaseGet(id).then((res) => {
            const { code, message } = res.data;
            const { title, content, serviceType, finishDate, files, email, phone, facebook, line, desc, minPrice, maxPrice } = message;

            form.setFieldValue('title', title);
            form.setFieldValue('content', content);
            form.setFieldValue('serviceType', serviceType);
            form.setFieldValue('finishDate', finishDate);
            form.setFieldValue('files', files);
            form.setFieldValue('email', email);
            form.setFieldValue('phone', phone);
            form.setFieldValue('facebook', facebook);
            form.setFieldValue('line', line);
            form.setFieldValue('desc', desc);
            form.setFieldValue('minPrice', minPrice);
            form.setFieldValue('maxPrice', maxPrice);
        })
    }

    // 取得已儲存的聯絡資訊
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
        // 取代 \n 為 <br/> 才可以在前端顯示
        data.content = data.content.replaceAll('\n', '<br/>')

        if (isEdit) {
            api.CaseEdit(id, { data })
                .then(res => {
                    const { code, message } = res.data;
                    if (code !== 0) {
                        notify.showError(message);
                        setSubmit(false);
                        return
                    }
                    setSubmit(false);
                    router.push(`/Case/${id}`);
                })
        } else {
            api.CaseAdd({
                data
            }).then(res => {
                const { code, message } = res.data;
                console.log(res.data);
                if (code !== 0) {
                    notify.showError(message);
                    setSubmit(false);
                    return
                }
                setSubmit(false);
                router.push(`/Case/${message}`);
            })
        }
    }

    const initForm = () => {
        // 如果是編輯案件，帶入案件資料
        if (isEdit && id)
            initCase();
        // 如果是發案，帶入聯絡資訊
        else
            initContact();
    }

    useEffect(() => { initForm() }, []);
    useEffect(() => { initForm() }, [id]);

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
                            placeholder='至多30字'
                            {...form.getInputProps('title')}
                        />

                        <Textarea
                            mt="sm"
                            label="案件說明"
                            minRows={5}
                            placeholder='至多500字'
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
                                    defaultValue={3000}
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