import { useSelector, useDispatch } from 'react-redux';
import { Modal, TextInput, LoadingOverlay, Text, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';


const InputEmail = () => {
    const [isLoading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email 格式有誤'),
        },
    });

    return (
        <>
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <LoadingOverlay visible={isLoading} overlayBlur={1} />
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Text weight={"bold"}>請輸入您的電子郵件 </Text>
                    <TextInput
                        withAsterisk
                        description="若系統未有您的資料將進行註冊"
                        descriptionProps={{ size: 'md' }}
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />
                    <Group position="center" mt="md">
                        <Button type="submit">下一步</Button>
                    </Group>
                </form>
            </Box></>
    )
}

const UsersModal = () => {
    const modalOpen = useSelector(state => state.userModalOpen);
    const dispatch = useDispatch();
    const closeUserModal = () => {
        dispatch({
            type: 'CLOSE_USER_MODAL'
        });
    };
    return (
        <>
            <Modal centered opened={modalOpen} onClose={closeUserModal} title="開始使用">
                <InputEmail />
            </Modal>
        </>
    )
}

export default UsersModal;