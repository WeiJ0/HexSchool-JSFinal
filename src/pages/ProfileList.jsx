import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Input,
  Button,
  Container,
  Title,
  Grid,
  SegmentedControl,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { IconSearch, IconPlus, IconListDetails, IconStar } from "@tabler/icons";
import ProfileCard from "../components/cards/ProfileCard";

import * as notify from "../helpers/notify";
import * as api from "../helpers/api";

const ProfileToolbar = ({ userId }) => {
  const router = useRouter();
  const { page, query, status, type } = router.query;
  const [uid, setUid] = useState("");
  const [searchText, setSearchText] = useState(query || "");

  useEffect(() => {
    setUid(userId);
  }, [userId]);

  return (
    <>
      <Flex justify={"space-between"}>
        <Box>
          <Flex>
            <Input
              mr="sm"
              w={200}
              placeholder="關鍵字"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              bg="custom-primary.1"
              leftIcon={<IconSearch />}
              onClick={() => router.push(`/Case/?query=${searchText}`)}
            >
              搜尋
            </Button>
          </Flex>
        </Box>

        {uid && (
          <Button
            bg="custom-primary.1"
            leftIcon={<IconPlus />}
            onClick={() => router.push("/Profile/Edit")}
          >
            我要張貼作品
          </Button>
        )}
      </Flex>
    </>
  );
};

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useDocumentTitle("作品集列表 - WeCoding");

  const getProfileList = () => {
    api.profileList().then((res) => {
      const { code, message } = res.data;

      if (code === 0) setProfiles(message);
      else notify.showError(message);

      setIsLoading(false);
    });
  };

  const isLogin = useSelector((state) => {
    return state.user.user.id;
  });

  useEffect(() => {
    getProfileList();
  }, []);

  return (
    <>
      <Box mt={60} mb={40}>
        <LoadingOverlay visible={isLoading} />
        <Container size="xl">
          <Box w="80%" mx="auto">
            <ProfileToolbar userId={isLogin} />
            <Box>
              <Grid gutter={30} mt={{ base: 12, xl: 20 }}>
                {profiles.map((item, index) => {
                  return (
                    <Grid.Col xs={12} md={6} xl={4} key={item.id}>
                      <ProfileCard key={item.id} data={item} />
                    </Grid.Col>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProfileList;
