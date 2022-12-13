import { useState, useEffect } from "react";
import { Box, Flex, Input, Button, Container, Title, Grid, SegmentedControl, Text, LoadingOverlay } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';

import ProfileCard from "./cards/ProfileCard";

import * as notify from "../helpers/notify";
import * as api from "../helpers/api";

const ProfileList = () => {
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProfileList = () => {
        api.profileList()
            .then((res) => {
                const { code, message } = res.data;

                if (code === 0)
                    setProfiles(message);
                else
                    notify.showError(message);
            })
    }

    useEffect(() => {
        getProfileList();
    }, [])

    return (
        <>
            <Box mt={60} mb={40}>
                <LoadingOverlay visible={isLoading} />
                <Container size="xl">
                    <Box w="80%" mx="auto">
                        <Box>
                            <Grid gutter={30} mt={20}>
                                {
                                    profiles.map((item, index) => {
                                        return (
                                            <Grid.Col span={4} key={item.id}>
                                                <ProfileCard
                                                    key={item.id}
                                                    data={item}
                                                />
                                            </Grid.Col>
                                        )
                                    })
                                }
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default ProfileList;