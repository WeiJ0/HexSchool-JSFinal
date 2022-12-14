import { useState, useEffect } from "react";

import { Box, Flex, Badge, Grid, Text, Avatar, Container, LoadingOverlay } from "@mantine/core"
import { Carousel } from '@mantine/carousel';

import * as api from "../helpers/api";
import * as notify from "../helpers/notify";

const ContactSide = ({ data }) => {
    const { nickname, intro, avatar, Contact_Engineer } = data;
    const { serviceType, email, phone, facebook, line, desc } = Contact_Engineer[0];
    return (
        <>
            <Flex justify="center">
                <Avatar size="xl" src={avatar} />
            </Flex>
            <Text mt="md" align="center">{nickname}</Text>
            <Text mt="md" align="center">{intro}</Text>

            <Text mt="md" size={18}>聯絡方式</Text>

            <Grid p={16}>
                <Grid.Col span={4}>電子郵件</Grid.Col>
                <Grid.Col span={8}>{email}</Grid.Col>
                <Grid.Col span={4}>連絡電話</Grid.Col>
                <Grid.Col span={8}>{phone}</Grid.Col>
                <Grid.Col span={4}>Line ID</Grid.Col>
                <Grid.Col span={8}>{line}</Grid.Col>
            </Grid>

            <Text mt="md" size={18}>聯絡方式</Text>
            <Text mt="sm" p={16}>{desc}</Text>
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

    useEffect(() => {
        if (id)
            getProfile();
    }, [id])

    useEffect(() => { }, [profile])

    return (
        <>
            <Container size="xl">
                <Box mt={40} mb={60}>
                    <LoadingOverlay visible={isLoading} overlayBlur={2} />
                </Box>
                <Box mt={20} mb={60}>
                    {isLoaded &&
                        <Grid gutter={20}>
                            <Grid.Col span={9}>
                                <ProfileImages images={profile.files} />
                                <Box px={16}>
                                    <Flex justify="space-between">
                                        <Text size={24} mt="md">{profile.title}</Text>
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