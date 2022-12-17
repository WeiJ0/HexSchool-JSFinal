import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import {
  Box,
  Text,
  Image,
  Container,
  MultiSelect,
  TextInput,
  Textarea,
  FileInput,
  Button,
  LoadingOverlay,
  Group,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconUpload } from "@tabler/icons";

import PageBreadcrumb from "../components/PageBreadcrumb";
import * as api from "../helpers/api";
import * as notify from "../helpers/notify";

const ProfileEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const userInfo = useSelector((state) => state.user.user);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [images, setImages] = useState([]);

  const pageData = [
    { title: "首頁", href: "/" },
    { title: "工程師", href: "#" },
    { title: "作品集維護", href: "#" },
  ];

  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      languages: [],
      files: [],
    },
    validate: {
      title: (value) => (value.length == 0 ? "需要輸入標題" : null),
      title: (value) => (value.length > 30 ? "標題需少於30字" : null),
      content: (value) => (value.length == 0 ? "需要輸入內容" : null),
      content: (value) => (value.length > 500 ? "內容須少於500字" : null),
    },
  });

  const [languages, setLanguages] = useState([
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
  ]);

  const submitForm = (values) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("languages", values.languages);

    values.files.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("uid", userInfo.id);
    formData.append("token", userInfo.token);

    api
      .profileEdit(formData)
      .then((res) => {
        const { code, message } = res.data;

        if (code === 0) {
          notify.showSuccess("新增成功");
          router.push("/Profile/" + message);
        } else {
          notify.showError(message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        notify.showError(err.message);
        setIsLoading(false);
      });
  };

  const initForm = () => {
    api
      .profileGet(id)
      .then((res) => {
        const { code, message } = res.data;

        if (code === 0) {
          // 非本人不可編輯
          if (message.userId !== userInfo.id) {
            router.push("/");
          }

          let languages = message.languages.split(",");

          languages = languages.forEach((item) => {
            let obj = { value: item, label: item };
            setLanguages((current) => [...current, obj]);
          });

          form.setValues({
            title: message.title,
            content: message.content,
            languages: message.languages.split(","),
          });

          setImages(message.files);
        } else notify.showError(message);
      })
      .catch((err) => {
        notify.showError(err.message);
      });
  };

  useEffect(() => {
    if (id) initForm();
  }, [id]);

  useEffect(() => {}, [userInfo]);

  return (
    <>
      <Container size="xl">
        <Box mt={40} mb={60}>
          <LoadingOverlay visible={isLoading} overlayBlur={2} />
          <PageBreadcrumb pageData={pageData} />
        </Box>
        <Box mt={20} mb={60} w="50%" mx="auto">
          <form onSubmit={form.onSubmit((values) => submitForm(values))}>
            <TextInput
              withAsterisk
              name="title"
              label="作品集標題"
              placeholder="至多30字"
              {...form.getInputProps("title")}
            />

            <Textarea
              mt="sm"
              name="content"
              label="作品集說明"
              minRows={5}
              placeholder="至多500字"
              withAsterisk
              {...form.getInputProps("content")}
            />

            <MultiSelect
              mt="sm"
              name="languages"
              label="使用技術"
              data={languages}
              searchable
              creatable
              getCreateLabel={(query) => `+ 新增 ${query} tag`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setLanguages((current) => [...current, item]);
                return item;
              }}
              {...form.getInputProps("languages")}
            />

            {id && images.length > 0 ? (
              <>
                <Carousel mt="md" slideSize="33.333333%" slideGap="md">
                  {images.map((item, index) => {
                    return (
                      <Carousel.Slide key={index}>
                        <Image
                          src={item}
                          style={{ objectFit: "contain" }}
                          withPlaceholder
                        />
                      </Carousel.Slide>
                    );
                  })}
                </Carousel>
                <Text mt="md" align="center">
                  目前已上傳 {images.length} 圖片
                </Text>
              </>
            ) : (
              ""
            )}

            <FileInput
              mt="sm"
              name="files"
              label="相關圖片上傳"
              description="限上傳圖檔，至多 5 個"
              placeholder="點擊選擇"
              accept="image/png,image/jpeg"
              icon={<IconUpload size={16} />}
              multiple
              {...form.getInputProps("files")}
            />

            <Group position="center" mt="md">
              <Button
                size="md"
                type="submit"
                mt="sm"
                mb={32}
                loading={isSubmit}
              >
                送出
              </Button>
            </Group>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default ProfileEdit;
