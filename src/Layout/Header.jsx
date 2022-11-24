import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image'

import { MediaQuery, Box, Flex, Container, Drawer, Burger, Button } from '@mantine/core';
import UsersModal from '../components/modals/UsersModal';

import logo from "../assets/logo.png";
import IconUser from "../assets/icon-user.png";

const Header = () => {
    const dispatch = useDispatch();

    const [openMenu, setOpenMenu] = useState(false);

    const openUserModal = () => {
        dispatch({
            type: 'OPEN_USER_MODAL'
        });
    };

    const navLinkStyle = {
        padding: '0 10px',
        margin: '0 14px',
        position: 'relative',
        fontWeight: 500,
        '&::before,&::after': {
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            color: '#52C8FF',
            top: 0,
            height: '100%',
            fontSize: 24,
            opacity: 0,
            transition: 'all 0.2s ease-in-out',
        },
        '&::before': {
            content: '"<"',
            left: '-10%',
        },
        '&::after': {
            content: '">"',
            right: '-10%',
        },
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&:hover::before,&:hover::after': {
            opacity: 1,
        }
    }

    return (
        <header>
            <UsersModal />
            <Box py={20} bg={'#e8f7fe'}>
                <Container size="xl">
                    <Flex justify="space-between" align="center">
                        <Image src={logo} alt="Logo" width={230} height={32} />

                        <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
                            <nav>
                                <Flex justify="flex-start" align="center">
                                    <Button size='xl' color='custom-primary.1' variant="subtle" sx={navLinkStyle}>找案件</Button>
                                    <Button size='xl' color='custom-primary.1' variant="subtle" sx={navLinkStyle}>找工程師</Button>
                                    <Button size='xl' color='custom-primary.1' variant="subtle" sx={navLinkStyle}>我要發案</Button>
                                    <Button size='xl' pr={0} variant="subtle" onClick={() => openUserModal()} >
                                        <Image src={IconUser} alt="使用者" width={33} height={33} />
                                    </Button>
                                </Flex>
                            </nav>
                        </MediaQuery>

                        <MediaQuery largerThan="xs" styles={{ display: 'none' }}>
                            <nav>
                                <Burger
                                    opened={openMenu}
                                    onClick={() => setOpenMenu((o) => !o)}
                                    size={30}
                                    color="#1C284D"
                                />

                                <Drawer
                                    opened={openMenu}
                                    onClose={() => setOpenMenu(false)}
                                    padding="xl"
                                    size="xl"
                                >
                                    <Button size='xl' color='custom-primary.1' variant="subtle" sx={navLinkStyle}>找案件</Button>
                                    <Button size='xl' color='custom-primary.1' variant="subtle" sx={navLinkStyle}>找工程師</Button>
                                    <Button size='xl' color='custom-primary.1' variant="subtle" sx={navLinkStyle}>我要發案</Button>
                                </Drawer>
                            </nav>
                        </MediaQuery>
                    </Flex>
                </Container>
            </Box>
        </header>
    )
}

export default Header;