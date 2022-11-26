import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../slices/userSlice';

import { Modal, TextInput, PasswordInput, LoadingOverlay, Text, Button, Group, Box, Stepper } from '@mantine/core';
import { useForm } from '@mantine/form';
import * as api from "../../helpers/api";

const InputEmail = () => {
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [isExist, setExist] = useState(false);
    const [step, setStep] = useState(0);


    const formCheck = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email 格式有誤'),
        },
    });

    // 於註冊時表單驗證條件
    const registerValidate = {
        password: (value) => (value.length < 6 ? '密碼長度至少 6 個字' : null),
        passwordConfirm: (value) => (value !== formInput.values.password ? '密碼不一致' : null),
        nickname: (value) => (value.length < 2 ? '暱稱長度至少 2 個字' : null),
    }
    // 於登入時表單驗證條件
    const loginValidate = {
        password: (value) => (!value.length ? '請輸入密碼' : null),
    }

    const formInput = useForm({
        initialValues: {
            password: '',
            passwordConfirm: '',
            nickname: '',
        },
        validate: isExist ? loginValidate : registerValidate,
    })

    const CheckEmail = (email) => {
        setLoading(true);
        setUserEmail(email); // 儲存使用者輸入的 email

        api.userEmailCheck(email)
            .then((res) => {
                const { code, message } = res.data;
                if (code === -1)
                    formCheck.setErrors({ email: message });
                else if (code === 1) {
                    // 信箱已存在，執行登入
                    setExist(true);
                    setStep(1);
                }
                else if (code === 2) {
                    // 信箱不存在，執行註冊
                    setExist(false);
                    setStep(1);
                }
                setLoading(false);
            })
            .catch((err) => {
                formCheck.setErrors({ email: err });
                setLoading(false);
            })
    }

    const submitInput = (value) => {
        setLoading(true);
        let data;

        if (isExist) {
            // 登入
            data = {
                email: userEmail,
                pwd: value.password,
            }

            api.userSignIn(data)
                .then((res) => {
                    const { code, message } = res.data;
                    if (code === -1)
                        formInput.setErrors({ password: message });
                    else if (code === 0) {
                        // 登入成功
                        dispatch(userActions.signin(message));
                        dispatch(userActions.closeModal());
                    }
                    setLoading(false);
                }).catch((err) => {
                    console.log(err);
                    formInput.setErrors({ password: err });
                    setLoading(false);
                })

        } else {
            // 註冊
            data = {
                email: userEmail,
                pwd: value.password,
                nickname: value.nickname,
            }

            api.userSignUp(data)
                .then((res) => {
                    const { code, message } = res.data;
                    if (code === -1)
                        formInput.setErrors({ nickname: message });
                    else {
                        // 註冊成功
                        dispatch(userActions.signin(message));
                        dispatch(userActions.closeModal());
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    formInput.setErrors({ nickname: err });
                    setLoading(false);
                })
        }
    }

    return (
        <>
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <LoadingOverlay visible={isLoading} />
                <Stepper active={step} breakpoint="sm">
                    <Stepper.Step>
                        <form onSubmit={formCheck.onSubmit((value) => CheckEmail(value.email))}>
                            <Text weight={"bold"}>請輸入您的電子郵件 </Text>
                            <TextInput
                                withAsterisk
                                description="若系統未有您的資料將進行註冊"
                                descriptionProps={{ size: 'md' }}
                                placeholder="your@email.com"
                                {...formCheck.getInputProps('email')}
                            />
                            <Group position="center" mt="md">
                                <Button type="submit">下一步</Button>
                            </Group>
                        </form>
                    </Stepper.Step>

                    <Stepper.Step>
                        <form
                            onSubmit={formInput.onSubmit((value) => submitInput(value))}>
                            <Text color="custom-green.1">
                                {isExist ? "歡迎回來，請輸入您的密碼進行登入" : "您尚未於本系統註冊，將進行註冊"}
                            </Text>
                            <Text weight={"bold"} mt={8}>您的電子郵件 </Text>
                            <Text>{userEmail} </Text>
                            <Text weight={"bold"} mt={8}>您的密碼 </Text>
                            <PasswordInput
                                withAsterisk
                                description={isExist ? "" : "最少須輸入6個字"}
                                descriptionProps={{ size: 'md' }}
                                placeholder="Password"
                                {...formInput.getInputProps('password')}
                            />

                            {isExist ? "" :
                                <>
                                    <Text weight={"bold"} mt={8}>再次輸入密碼 </Text>
                                    <PasswordInput
                                        withAsterisk
                                        descriptionProps={{ size: 'md' }}
                                        placeholder="Confirm Password"
                                        {...formInput.getInputProps('passwordConfirm')}
                                    />

                                    <Text weight={"bold"} mt={8}>您的暱稱 </Text>
                                    <TextInput
                                        withAsterisk
                                        description="最少須輸入2個字"
                                        descriptionProps={{ size: 'md' }}
                                        placeholder="Nickname"
                                        {...formInput.getInputProps('nickname')}
                                    />
                                </>
                            }

                            <Group position="center" mt={16}>
                                <Button type="submit">下一步</Button>
                            </Group>
                        </form>
                    </Stepper.Step>

                    <Stepper.Completed>
                        <Text></Text>
                    </Stepper.Completed>
                </Stepper>


            </Box></>
    )
}

const UsersModal = () => {
    const modalOpen = useSelector(state => state.user.userModalOpen);
    const dispatch = useDispatch();
    const closeUserModal = () => {
        dispatch(userActions.closeModal());
    };
    return (
        <>
            <Modal centered opened={modalOpen} onClose={closeUserModal} title="開始使用">
                <InputEmail />
            </Modal>
        </>
    )
}

export default UsersModal;