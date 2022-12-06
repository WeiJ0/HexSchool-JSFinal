import { Card, Image, Flex, Avatar, Text, Box, ActionIcon } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconHeart } from '@tabler/icons';

import portfolioImg from "../../assets/portfolio01.png";
import avatarImg from "../../assets/person1.png";

const PortfolioCard = () => {
    const { hovered, ref } = useHover();
    const likeStyle = {
        "&:hover": {
            background: "transparent",
        },
        "&:hover svg": {
            fill: "#F14A4A"
        }
    }
    return (
        <>
            <Card shadow="sm" p="lg" radius="md" w={300} withBorder>
                <Card.Section>
                    <Image src={portfolioImg.src} height={180} alt="Norway" />
                </Card.Section>
            </Card>
            <Box py={6} px={8}>
                <Flex justify="space-between" align="center">
                    <Flex align="center">
                        <Avatar src={avatarImg.src} alt="it's me" />
                        <Text ml={8} color="#1E1E1E" fs={16} fw={500}>David Lee</Text>
                    </Flex>
                    <Flex align="center">
                        <ActionIcon size={20} variant="transparent" ref={ref} sx={likeStyle}>
                            <IconHeart variant="filled" color={hovered ? 'F14A4A' : '#8A8A8B'} />
                        </ActionIcon>
                        <Text color="#8A8A8B" fs={16} fw={400}>16</Text>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default PortfolioCard;