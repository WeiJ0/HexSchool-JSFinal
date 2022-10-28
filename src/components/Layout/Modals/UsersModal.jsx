import { useSelector, useDispatch } from 'react-redux';

import { Modal,  TextInput, LoadingOverlay, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

const InputEmail = () => {
    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <LoadingOverlay visible="true" overlayBlur={1} />
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    withAsterisk
                    label="請輸入您的電子郵件"
                    labelProps={{ size: 'lg' }}
                    description="若系統未有您的資料將進行註冊"
                    descriptionProps={{ size: 'md' }}
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />
                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
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
            <Modal
                centered
                opened={modalOpen}
                onClose={closeUserModal}
                title="開始使用"
                overlayOpacity={0.55}
                overlayBlur={3}
            >
                <InputEmail />
            </Modal>
        </>
    )
}

export default UsersModal;