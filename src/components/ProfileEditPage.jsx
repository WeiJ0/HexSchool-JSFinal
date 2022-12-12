import { useState } from "react"
import { useRouter } from "next/router"

const ProfileEdit = ({ isEdit }) => {
    const router = useRouter()
    const { id } = router.query

    const [isLoading, setIsLoading] = useState(false)

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
            serviceType: (value) => (value ? null : '需要選擇服務'),
        }
    });

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
                    </form>
                </Box>
            </Container>
        </>
    )
}

export default ProfileEdit