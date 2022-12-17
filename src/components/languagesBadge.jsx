import { Flex,Badge } from "@mantine/core";

const LanguageBadges = ({ languages }) => {
  console.log(languages);
  return (
    <>
      <Flex>
        {languages.map((language, index) => {
          return <Badge key={language}>{language}</Badge>;
        })}
      </Flex>
    </>
  );
};

export default LanguageBadges;
