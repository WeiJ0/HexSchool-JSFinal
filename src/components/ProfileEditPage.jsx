import { useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "@mantine/form"
import { Box, Container, MultiSelect, TextInput, Textarea, FileInput, Button, LoadingOverlay, Group } from "@mantine/core"
import { IconUpload } from '@tabler/icons';

import PageBreadcrumb from "./PageBreadcrumb"

const ProfileEdit = ({ isEdit }) => {
    const router = useRouter()
    const { id } = router.query

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const pageData = [
        { title: '首頁', href: '/' },
        { title: '工程師', href: '#' },
        { title: '作品集維護', href: '#' }
    ]

    const form = useForm({
        initialValues: {
            title: "",
            content: "",
            languages: [],
            files: []
        },
        validate: {
            title: (value) => (value.length == 0 ? '需要輸入標題' : null),
            title: (value) => (value.length > 30 ? '標題需少於30字' : null),
            content: (value) => (value.length == 0 ? '需要輸入內容' : null),
            content: (value) => (value.length > 500 ? '內容須少於500字' : null),
        }
    });

    const [languages, setLanguages] = useState([
        { value: 'react', label: 'React' },
        { value: 'ng', label: 'Angular' },
    ]);

    const submitForm = (values) => {
        console.log(values);
    }


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
                            name="title"
                            label="案件標題"
                            placeholder='至多30字'
                            {...form.getInputProps('title')}
                        />

                        <Textarea
                            mt="sm"
                            name="content"
                            label="案件說明"
                            minRows={5}
                            placeholder='至多500字'
                            withAsterisk
                            {...form.getInputProps('content')}
                        />

                        <MultiSelect
                            mt="sm"
                            name="languages"
                            label="使用技術"
                            data={languages}
                            searchable
                            creatable
                            getCreateLabel={(query) => `+ 新增 ${query} tag`}
                            onCreate={(query) => {
                                const item = { value: query, label: query };
                                setLanguages((current) => [...current, item]);
                                return item;
                            }}
                            {...form.getInputProps('languages')}
                        />

                        <FileInput
                            mt="sm"
                            name="files"
                            label="相關圖片上傳"
                            description="限上傳圖檔，至多 5 個"
                            placeholder='點擊選擇'
                            accept="image/png,image/jpeg"
                            icon={<IconUpload size={16} />}
                            multiple
                            {...form.getInputProps('files')}
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

export default ProfileEdit