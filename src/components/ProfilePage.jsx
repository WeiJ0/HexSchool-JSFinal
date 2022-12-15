import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Flex, Badge, Grid, Text, Avatar, Container, LoadingOverlay, ActionIcon, Tooltip, CopyButton } from "@mantine/core"
import { IconStar, IconMailForward, IconCopy, IconCheck, IconPhoneCall } from '@tabler/icons';
import { Carousel } from '@mantine/carousel';

import * as api from "../helpers/api";
import * as notify from "../helpers/notify";

const ContactSide = ({ data }) => {
    const { nickname, intro, avatar, Contact_Engineer } = data;
    const { serviceType, email, phone, facebook, line, desc } = Contact_Engineer[0];
    return (
        <>
            <Flex justify="center" mt={16}>
                <Avatar size="xl" src={avatar} />
            </Flex>
            <Text mt="md" align="center">{nickname}</Text>
            <Text mt="md" align="center" color="gray">{intro}</Text>

            <Text mt="md" size={18}>聯絡方式</Text>

            <Grid p={16}>
                <Grid.Col span={4}>電子郵件</Grid.Col>
                <Grid.Col span={8}>
                    <Text size={14} color="gray">
                        {email}
                    </Text>
                    <ActionIcon ml={8} onClick={(e) => {
                        e.preventDefault();
                        window.open(`mailto:${email}?subject=我是從WeCoding網站上看到您的聯絡資訊，我想要聯絡您。`)
                    }}>
                        <IconMailForward size={36} />
                    </ActionIcon>
                </Grid.Col>
                <Grid.Col span={4}>連絡電話</Grid.Col>
                <Grid.Col span={8}>
                    <Text size={14} color="gray">
                        {phone}
                    </Text>
                    <ActionIcon ml={8} onClick={(e) => {
                        e.preventDefault();
                        window.open(`tel:${phone}`)
                    }}>
                        <IconPhoneCall size={36} />
                    </ActionIcon>
                </Grid.Col>
                <Grid.Col span={4} color="gray">Facebook</Grid.Col>
                <Grid.Col span={8}>
                    <Text size={14} color="gray">
                        {facebook}
                    </Text>
                    <CopyButton ml={8} value={facebook}>
                        {({ copied, copy }) => (
                            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                                    {copied ? <IconCheck size={36} /> : <IconCopy size={36} />}
                                </ActionIcon>
                            </Tooltip>
                        )}
                    </CopyButton>
                </Grid.Col>
                <Grid.Col span={4} color="gray">Line ID</Grid.Col>
                <Grid.Col size={14} span={8}>
                    <Text color="gray">
                        {line}
                    </Text>
                    <CopyButton ml={8} value={line}>
                        {({ copied, copy }) => (
                            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                                    {copied ? <IconCheck size={36} /> : <IconCopy size={36} />}
                                </ActionIcon>
                            </Tooltip>
                        )}
                    </CopyButton>
                </Grid.Col>
            </Grid>

            <Text mt="md" size={18}>聯絡說明</Text>
            <Text mt="sm" p={16} color="gray">{desc}</Text>
        </>
    )
}

const ProfileImages = ({ images }) => {
    return (
        <>
            <Carousel align="center" mt="md" slideSize="90%" slideGap="md" loop withIndicators>
                {
                    images.map((image, index) => {
                        return (
                            <Carousel.Slide key={index}>
                                <img src={image} width="100%" style={{ objectFit: 'contain' }} />
                            </Carousel.Slide>
                        )
                    })
                }
            </Carousel>
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

const ProfilePage = ({ id }) => {
    const userState = useSelector(state => state.user.user);
    const [profile, setProfile] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getProfile = () => {
        api.profileDetailGet(id)
            .then((res) => {
                const { code, message } = res.data;
                if (code === 0) {
                    setProfile(message);
                    setIsLoaded(true)
                }
                else
                    notify.showError(message)

                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                notify.showError(err.message);
            });
    };

    const isCollect = () => {
        if (!userState)
            return false;
        else {
            return profile.collect.map(item => item.userId === userState.id).includes(true);
        }
    }

    const collect = () => {
        api.Collect('profile', id)
            .then((res) => {
                const { code, message } = res.data;
                if (code === 0)
                    getProfile();
                else
                    notify.showError(message)
            })
            .catch((err) => {
                notify.showError(err.message);
            })
    }

    useEffect(() => {
        if (id)
            getProfile();
    }, [id])

    useEffect(() => { }, [profile])
    useEffect(() => { }, [userState])

    return (
        <>
            <Container size="xl">
                <Box mt={40} mb={60}>
                    <LoadingOverlay visible={isLoading} overlayBlur={2} />
                </Box>
                <Box mt={20} mb={60}>
                    {isLoaded &&
                        <Grid gutter={36}>
                            <Grid.Col span={9}>
                                <ProfileImages images={profile.files} />
                                <Box px={16}>
                                    <Flex justify="space-between" align="center" mt="md">
                                        <Text size={24}>{profile.title}</Text>
                                        <Flex align="center" mr={16}>
                                            <ActionIcon>
                                                <IconStar
                                                    strokeWidth={0}
                                                    variant="transparent" size={24}
                                                    fill={isCollect() ? '#F14A4A' : '#8A8A8B'}
                                                    onClick={collect}
                                                />
                                            </ActionIcon>
                                            <Text size={18}>{profile.collect.length}</Text>
                                        </Flex>
                                    </Flex>
                                    <Box mt="md">
                                        <LanguageBadges languages={profile.languages.split(',')} />
                                    </Box>
                                    <Text mt="md">{profile.content}</Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={3}>
                                {<ContactSide data={profile.Users} />}
                            </Grid.Col>
                        </Grid>
                    }
                </Box>
            </Container>

        </>
    )
}

export default ProfilePage;