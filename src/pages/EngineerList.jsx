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
import { IconSearch, IconPlus, IconListDetails, IconStar } from "@tabler/icons";
import EngineerCard from "../components/cards/EngineerCard";
import * as api from "../helpers/api";
import * as notify from "../helpers/notify";

const SearchBar = ({ router, searchText, setSearchText }) => {
  return (
    <>
      <Flex align="center">
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
              onClick={() => router.push(`/Engineer/?query=${searchText}`)}
            >
              搜尋
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

const EngineerList = () => {
  const router = useRouter();
  const { page, query, status, type } = router.query;
  const [searchText, setSearchText] = useState(query || "");
  const [isLoaded, setIsLoaded] = useState(false);

  const [engineers, setEngineers] = useState([]);

  const getEngineers = () => {
    api
      .engineersList(8, searchText)
      .then((res) => {
        const { code, message } = res.data;
        if (code !== 0) {
          notify.showError(message);
          return;
        }
        setEngineers(message);
      })
      .catch((err) => {
        notify.showError(err.message);
      });

    setIsLoaded(true);
  };

  useEffect(() => {
    getEngineers();
  }, []);

  useEffect(() => {}, [engineers]);
  useEffect(() => {
    getEngineers();
  }, [router]);
  return (
    <>
      <Box mt={60} mb={40}>
        <LoadingOverlay visible={!isLoaded} />
        <Container size="xl">
          <Box w="80%" mx="auto">
            <SearchBar
              router={router}
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <Box>
              <Grid gutter={30} mt={{ base: 12, xl: 20 }}>
                {engineers.map((item, index) => {
                  return (
                    <Grid.Col xs={6} xl={3} key={item.id}>
                      <EngineerCard key={item.id} data={item} />
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

export default EngineerList;
