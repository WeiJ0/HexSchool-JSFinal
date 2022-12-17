import { useRouter } from "next/router";
import {
  Card,
  Divider,
  Avatar,
  Title,
  Flex,
  Text,
  Badge,
  Button,
  Group,
} from "@mantine/core";
import { IconBrandPython } from "@tabler/icons";
import LanguageBadges from "../languagesBadge";
import { addCommasToNumber } from "../../helpers/number";
import { useEffect } from "react";

const EngineerCard = ({ data }) => {
  const router = useRouter();

  let { id, avatar, nickname, languages } = data;

  if (languages) languages = JSON.parse(languages);

  console.log(languages);
  
  const cardStyle = {
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0 0 0 2px #52C8FF",
      transform: "translateY(-2px)",
    },
  };

  const toDetail = (id) => {
    router.push(`/Case/${id}`);
  };

  useEffect(() => {}, [languages]);

  return (
    <>
      <Card
        shadow="sm"
        p={20}
        radius="md"
        w={{ base: 300, md: "100%" }}
        sx={cardStyle}
        onClick={() => toDetail(id)}
      >
        <Flex direction="column" align="center">
          <Avatar src={avatar} size="xl"></Avatar>

          <Title order={5} size={16} mt={16} lineClamp={1}>
            {nickname}
          </Title>

          <Divider my="sm" />

          {languages && languages.length > 0 ? (
            <LanguageBadges languages={languages} />
          ) : (
            <></>
          )}
        </Flex>
      </Card>
    </>
  );
};

export default EngineerCard;
