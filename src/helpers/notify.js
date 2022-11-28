import { IconX, IconCheck } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

export const showError = (message) => {
    showNotification({
        disallowClose: false,
        autoClose: 3000,
        message,
        color: 'red',
        icon: <IconX />,
        sx: { py: 10 },
        loading: false,
    });
}

export const showSuccess = (message) => {
    showNotification({
        disallowClose: false,
        autoClose: 3000,
        message,
        color: 'green',
        icon: <IconCheck />,
        sx: { py: 10 },
        loading: false,
    });
}