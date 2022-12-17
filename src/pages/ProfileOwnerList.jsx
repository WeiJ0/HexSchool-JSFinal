import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDocumentTitle } from "@mantine/hooks";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../slices/userSlice";
import {
  Box,
  Table,
  ActionIcon,
  Flex,
  Button,
  Container,
  Text,
  LoadingOverlay,
  Image,
} from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons";
import PageBreadcrumb from "../components/PageBreadcrumb";
import * as api from "../helpers/api";
import * as notify from "../helpers/notify";
import { formatDate } from "../helpers/date";

const ProfileOwnerList = () => {
  const router = useRouter();
  const { page, query, status, type } = router.query;
  useDocumentTitle("我的作品集 - WeCoding");
  const [profiles, setProfile] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const userInfo = useSelector((state) => state.user.user);

  const pageData = [
    { title: "首頁", href: "/" },
    { title: "會員中心", href: "/User" },
    { title: "我的作品集", href: "/Profile/Owner" },
  ];

  const getProfiles = () => {
    api
      .profileListByUser(8, 1)
      .then((res) => {
        const { code, message } = res.data;

        if (code !== 0) {
          notify.showError(message);
          return;
        }

        setProfile(message);
        setLoading(false);
      })
      .catch((err) => {
        notify.showError(err);
      });
  };

  const editDetail = (id) => {
    router.push(`/Profile/Edit?id=${id}`);
  };

  const ProfilesRow = profiles.map((item, index) => {
    const { title, files, created_at, id } = item;
    return (
      <tr key={id}>
        <td>
          <Image src={files[0]} />
        </td>
        <td>{title}</td>
        <td>{formatDate(created_at, "YYYY-MM-DD HH:mm:ss")}</td>
        <td>
          {
            <ActionIcon onClick={() => editDetail(id)}>
              <IconEdit size={24} />
            </ActionIcon>
          }
        </td>
      </tr>
    );
  });

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      <Box mt={60} mb={40}>
        <LoadingOverlay visible={isLoading} />
        <Container size="xl">
          <Box mt={40} mb={60}>
            <PageBreadcrumb pageData={pageData} />
          </Box>
          <Box w="80%" mx="auto">
            <Box>
              <Flex justify="flex-end">
                <Button
                  bg="custom-primary.1"
                  leftIcon={<IconPlus />}
                  onClick={() => router.push("/Profile/Edit")}
                >
                  新增作品集
                </Button>
              </Flex>
              <Table mt={16}>
                <thead>
                  <tr>
                    <th width="30%">封面預覽</th>
                    <th>案件標題</th>
                    <th>上架時間</th>
                    <th>編輯</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.length == 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        <Text fw="bold" color="red" py={24}>
                          尚未新增任何作品集
                        </Text>
                      </td>
                    </tr>
                  ) : (
                    ProfilesRow
                  )}
                </tbody>
              </Table>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProfileOwnerList;
