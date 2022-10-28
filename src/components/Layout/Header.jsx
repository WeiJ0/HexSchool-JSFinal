import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Container, Grid, Title, NavLink, Group, Button } from '@mantine/core';
import UsersModal from './Modals/UsersModal';



const Header = () => {
    const dispatch = useDispatch();
    const openUserModal = () => {
        dispatch({
            type: 'OPEN_USER_MODAL'
        });
    };
    return (
        <header>
            <UsersModal />
            <Container>
                <Grid py={40} shadow="xl">
                    <Grid.Col span={4}></Grid.Col>
                    <Grid.Col span={4}>
                        <Title order={1} size="h2" align="center">WeCoding</Title>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Group position="center" grow>
                            <NavLink label="找案件" />
                            <NavLink label="找工程師" />
                            <Button
                                variant="gradient"
                                gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                                onClick={() => openUserModal()}
                            >
                                登入
                            </Button>

                        </Group>
                    </Grid.Col>
                </Grid>
            </Container>
        </header>
    )
}

export default Header;