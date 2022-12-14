import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../slices/userSlice";

import { useRouter } from "next/router";

import Image from "next/image";
import {
  MediaQuery,
  Box,
  Flex,
  Container,
  Drawer,
  Burger,
  Button,
} from "@mantine/core";
import UsersModal from "../components/modals/UsersModal";

import logo from "../assets/logo.png";
import IconUser from "../assets/icon-user.png";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 抓取 state user id 判斷是否有登入
  const isLogin = useSelector((state) => {
    return state.user.user.id;
  });

  const [openMenu, setOpenMenu] = useState(false);

  const openUserModal = () => {
    dispatch(userActions.openModal());
  };

  const toUserPage = () => {
    if (router.route !== "/User") router.push("/User");
  };

  const clickNewPost = () => {
    if (isLogin) {
      if (router.route !== "/Post") router.push("/Post");
    } else openUserModal();
  };

  const clickUserIcon = () => {
    if (isLogin) toUserPage();
    else openUserModal();
  };

  const clickCaseList = () => {
    if (router.route !== "/Case") {
      router.push("/Case");
      setOpenMenu(false);
    }
  };

  const clickEngineerList = () => {
    if (router.route !== "/Engineer") {
      router.push("/Engineer");
      setOpenMenu(false);
    }
  }

  const clickProfileList = () => {
    if (router.route !== "/Profile") {
      router.push("/Profile");
      setOpenMenu(false);
    }
  };

  const navLinkStyle = {
    padding: "0 10px",
    margin: "0 14px",
    position: "relative",
    fontWeight: 500,
    "&::before,&::after": {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      color: "#52C8FF",
      top: 0,
      height: "100%",
      fontSize: 24,
      opacity: 0,
      transition: "all 0.2s ease-in-out",
    },
    "&::before": {
      content: '"<"',
      left: "-10%",
    },
    "&::after": {
      content: '">"',
      right: "-10%",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:hover::before,&:hover::after": {
      opacity: 1,
    },
  };

  useEffect(() => {}, [isLogin]);

  return (
    <header>
      <UsersModal />
      <Box py={20} bg={"#e8f7fe"}>
        <Container size="xl">
          <Flex justify="space-between" align="center">
            <Image
              src={logo}
              alt="Logo"
              style={{ cursor: "pointer" }}
              width={230}
              height={32}
              onClick={() => router.push("/")}
            />

            <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
              <nav>
                <Flex justify="flex-start" align="center">
                  <Button
                    size="xl"
                    color="custom-primary.1"
                    onClick={clickCaseList}
                    variant="subtle"
                    sx={navLinkStyle}
                  >
                    找案件
                  </Button>
                  <Button
                    size="xl"
                    color="custom-primary.1"
                    onClick={clickEngineerList}
                    variant="subtle"
                    sx={navLinkStyle}
                  >
                    找工程師
                  </Button>
                  <Button
                      size="xl"
                      color="custom-primary.1"
                      variant="subtle"
                      onClick={clickProfileList}
                      sx={navLinkStyle}
                    >
                      看作品集
                    </Button>
                  <Button
                    size="xl"
                    color="custom-primary.1"
                    onClick={clickNewPost}
                    variant="subtle"
                    sx={navLinkStyle}
                  >
                    我要發案
                  </Button>
                  <Button
                    size="xl"
                    pr={0}
                    variant="subtle"
                    onClick={clickUserIcon}
                  >
                    <Image src={IconUser} alt="使用者" width={33} height={33} />
                  </Button>
                </Flex>
              </nav>
            </MediaQuery>

            <MediaQuery largerThan="xs" styles={{ display: "none" }}>
              <nav>
                <Burger
                  opened={openMenu}
                  onClick={() => setOpenMenu((o) => !o)}
                  size={30}
                  color="#1C284D"
                />

                <Drawer
                  opened={openMenu}
                  onClose={() => setOpenMenu(false)}
                  padding="xl"
                  size="xl"
                >
                  <Flex direction="column" align="center">
                    <Image
                      src={logo}
                      alt="Logo"
                      width={230}
                      height={32}
                      mb={24}
                    />
                    <Button
                      size="xl"
                      color="custom-primary.1"
                      variant="subtle"
                      onClick={clickCaseList}
                      sx={navLinkStyle}
                    >
                      找案件
                    </Button>
                    <Button
                      size="xl"
                      color="custom-primary.1"
                      variant="subtle"
                      onClick={clickEngineerList}
                      sx={navLinkStyle}
                    >
                      找工程師
                    </Button>
                    <Button
                      size="xl"
                      color="custom-primary.1"
                      variant="subtle"
                      onClick={clickProfileList}
                      sx={navLinkStyle}
                    >
                      看作品集
                    </Button>
                    <Button
                      size="xl"
                      color="custom-primary.1"
                      variant="subtle"
                      sx={navLinkStyle}
                    >
                      我要發案
                    </Button>
                    <Button
                      size="xl"
                      variant="subtle"
                      sx={navLinkStyle}
                      onClick={() => {
                        setOpenMenu(false);
                        clickUserIcon();
                      }}
                    >
                      <Image
                        src={IconUser}
                        alt="使用者"
                        width={33}
                        height={33}
                      />
                    </Button>
                  </Flex>
                </Drawer>
              </nav>
            </MediaQuery>
          </Flex>
        </Container>
      </Box>
    </header>
  );
};

export default Header;
