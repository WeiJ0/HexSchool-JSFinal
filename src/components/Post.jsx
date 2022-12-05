import { useState } from 'react';
import { Container, Title, TextInput, Textarea, FileInput, Radio, Button, Group, Box, SimpleGrid, LoadingOverlay } from '@mantine/core';
import { IconMail, IconPhone, IconBrandFacebook, IconDeviceMobile, IconCalendar } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { useEffect } from 'react';

import * as api from "../helpers/api";
import * as notify from "../helpers/notify";

const Post = ({ isEdit }) => {
    const [isLoading, setLoading] = useState(false);
    const [isSubmit, setSubmit] = useState(false);

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

    const initForm = () => {
        initContact();
    }

    useEffect(() => { initForm() }, []);

    return (
        <>
            <Container size="xl">
                <Box mt={40} mb={60} w="50%" mx="auto">
                    <LoadingOverlay visible={isLoading} overlayBlur={2} />
                    <form onSubmit={form.onSubmit((values) => console.log(values))}>
                        <TextInput withAsterisk label="案件標題" {...form.getInputProps('title')} />

                        <Textarea mt="sm" label="案件說明" minRows={5} withAsterisk />

                        <FileInput mt="sm" label="案件附件" description="限上傳圖檔或是 pdf，至多 5 個" placeholder='點擊選擇' multiple />

                        <SimpleGrid mt="sm" cols={2}>
                            <div>
                                <DatePicker placeholder="Pick date" label="預計完成時間" icon={<IconCalendar size={16} />} withAsterisk />
                            </div>
                            <div>
                                <Radio.Group name="service" label="作業地點" withAsterisk {...form.getInputProps('service')} >
                                    <Radio value="remote" label="遠端作業" />
                                    <Radio value="office" label="進辦公室" />
                                </Radio.Group>
                            </div>
                        </SimpleGrid>

                        <Title order={5} my="sm">聯絡方式</Title>

                        <TextInput icon={<IconMail />} label="電子信箱" description="不影響登入用信箱，僅顯示在頁面上" placeholder="電子信箱"
                            {...form.getInputProps('email')} />

                        <TextInput icon={<IconPhone />} mt="sm" label="連絡電話" {...form.getInputProps('phone')} />

                        <TextInput icon={<IconBrandFacebook />} mt="sm" label="Facebook" description="個人頁面連結" placeholder=""
                            {...form.getInputProps('facebook')} />

                        <TextInput icon={<IconDeviceMobile />} mt="sm" label="Line ID" {...form.getInputProps('line')} />

                        <Textarea
                            mt="sm"
                            placeholder="例如電話方便聯絡時間 or Email 來信主旨請填 or Message 來信請註明於 WeCoding 看見某案件"
                            label="聯絡說明短述"
                            minRows={5}
                            {...form.getInputProps('desc')}
                        />

                        <Group position="right" mt="md">
                            <Button size='md' type="submit" mt="sm" mb={32}
                                loading={isSubmit}>
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