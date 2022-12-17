import { Avatar } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  Box,
  Table,
  ActionIcon,
  Flex,
  Anchor,
  Container,
  Text,
  LoadingOverlay,
  Image,
} from "@mantine/core";
import { IconStarsOff } from "@tabler/icons";
import PageBreadcrumb from "../components/PageBreadcrumb";
import * as api from "../helpers/api";
import * as notify from "../helpers/notify";
import { formatDate } from "../helpers/date";

const CollectList = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const pageData = [
    { title: "首頁", href: "/" },
    { title: "會員中心", href: "/User" },
    {
      title: type === "Case" ? "收藏案件" : "收藏工程師",
      href: `/Collect/${type}`,
    },
  ];

  const getCollectList = () => {
    const query = type === "Case" ? "post" : "engineer";
    api
      .CollectList(query)
      .then((res) => {
        const { code, message } = res.data;
        if (code === 0) {
          setLists(message);
        } else notify.showError(message);
      })
      .catch((err) => {
        notify.showError(err.message);
      });

    setIsLoaded(true);
  };

  const collect = (id) => {
    let query = type === "Case" ? "case" : "engineer";
    api
      .Collect(query, id)
      .then((res) => {
        const { code, message } = res.data;
        if (code === 0) {
          notify.showSuccess(message);
          getCollectList();
        } else {
          notify.showError(message);
        }
      })
      .catch((err) => {
        notify.showError(err);
      });
  };

  const listRows = lists.map((item, index) => {
    const { id, created_at, postId, title, finishDate, nickname, avatar } =
      item;
    return (
      <tr key={id}>
        <td>
          {type === "Case" ? (
            <Anchor href={`/Case/${postId}`}>{item.Posts.title}</Anchor>
          ) : (
            <Flex align="center">
              <Avatar src={avatar} size={60}></Avatar>
              <Text ml={16} size={16}>
                {nickname}
              </Text>
            </Flex>
          )}
        </td>
        <td>
          {formatDate(
            type === "Case" ? finishDate : created_at,
            "YYYY-MM-DD HH:mm:ss"
          )}
        </td>
        <td>
          {
            <ActionIcon onClick={() => collect(postId)}>
              <IconStarsOff size={24} />
            </ActionIcon>
          }
        </td>
      </tr>
    );
  });

  useEffect(() => {
    if (type) getCollectList();
  }, [type]);

  return (
    <>
      <Box mt={60} mb={40}>
        <LoadingOverlay visible={!isLoaded} />
        <Container size="xl">
          <Box mt={40} mb={60}>
            <PageBreadcrumb pageData={pageData} />
          </Box>
          <Box w="80%" mx="auto">
            <Box>
              <Table>
                <thead>
                  <tr>
                    <th>{type === "Case" ? "案件標題" : "工程師名稱"}</th>
                    <th>{type === "Case" ? "案件截止時間" : "收藏時間"}</th>
                    <th>編輯</th>
                  </tr>
                </thead>
                <tbody>
                  {lists && lists.length == 0 ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        <Text fw="bold" color="red" py={24}>
                          {type === "Case"
                            ? "尚未收藏任何案件"
                            : "尚未收藏任何工程師"}
                        </Text>
                      </td>
                    </tr>
                  ) : (
                    listRows
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

export default CollectList;
