import { useRouter } from 'next/router';
import { Card, Divider, Avatar, Title, Box, Text, Badge, Button, Group } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconBrandPython, IconStar } from '@tabler/icons';
import defalutAvatar from '../../assets/default-avatary.jpg';

const ImageDisplay = ({ images }) => {
    return (
        <>
            {
                images.length > 1 ?
                    <Carousel sx={{ maxWidth: 320 }} mx="auto" bg="custom.second.1" withIndicators height={300}>
                        {
                            images.map((image, index) => {
                                return (
                                    <Carousel.Slide key={index}>
                                        <img src={image} height="300" width="100%" style={{ objectFit: 'contain' }} />
                                    </Carousel.Slide>
                                )
                            })
                        }
                    </Carousel> :
                    <img src={images[0]} height={200} />
            }
        </>
    )
}

const LanguageBadges = ({ languages }) => {
    return (
        <>
            {
                languages.map((language, index) => {
                    return <Badge key={language}>{language}</Badge>
                })
            }
        </>
    )
}

const ProfileCard = ({ data }) => {
    const router = useRouter();

    const { id, title, content, languages, files, Users } = data;
    const { nickname, avatar } = Users;

    const cardStyle = {
        cursor: 'pointer',
        "&:hover": {
            boxShadow: "0 0 0 2px #52C8FF",
            transform: "translateY(-2px)",
        }
    }

    const toDetail = (id) => {
        router.push(`/Profile/${id}`)
    }

    return (
        <>
            <Card shadow="lg" p={20} radius="md" w={{ base: 300, md: "100%" }} sx={cardStyle} onClick={toDetail(id)}>

                <Card.Section>
                    <ImageDisplay images={files} />
                </Card.Section>

                <Group mt="md" sx={{ alignItems: 'center' }}>
                    <Avatar src={avatar || defalutAvatar} radius="xl"></Avatar>
                    <Title order={5} size={16} lineClamp={1} w="100%" sx={{ flex: 3 }}>{nickname}</Title>
                </Group>

                <Group mt="sm">
                    <LanguageBadges languages={languages.split(',')} />
                </Group>

                <Box mt="sm">
                    <Title order={5} size={16} lineClamp={1} w="100%" sx={{ flex: 3 }}>{title}</Title>
                </Box>

                <Group position="right">
                    <Button
                        leftIcon={<IconStar size={18} />}
                        bg="custom-primary.1"
                    >
                        加入收藏
                    </Button>
                </Group>
            </Card>
        </>
    )
}

export default ProfileCard;