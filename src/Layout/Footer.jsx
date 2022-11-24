import { MediaQuery, Container, Text, Box, Flex, Divider } from "@mantine/core";
import Image from 'next/image'

import logo from "../assets/logo.png";
const Footer = () => {
    return (
        <footer>
            <Box py={{ base: 40, md: 55 }} bg={'#FAFAFA'}>
                <Container size="xl">
                    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" >
                        <Flex direction={{ base: 'column', md: 'row' }} align="center" >
                            <Image src={logo} alt="Logo" width={230} height={32} />
                            <Text size={20} ml={{ base: 0, md: 20 }} mt={{ base: 14, md: 0 }} fw={500} color="custom-primary.1"> 威寇汀 程式外包媒合</Text>
                        </Flex>
                        <Divider size="md" color="#DFE4EB" />
                        <Flex align="center" mt={{ base: 48, md: 0 }} >
                            <Text size={16} > 隱私政策 </Text>
                            <Text size={16} ml={40}> 問題回報</Text>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
        </footer >
    )
}

export default Footer;