import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col, Button } from "antd";
import UserProfile from "./profiles/UserProfile";
import LoginForm from "./LoginForm";
import {
    HeaderContainer,
    MenuStyle,
    SearchInput,
    Warapper,
    Container,
    Sticky,
} from "./Layout.Elements";
import { useSelector, useDispatch } from "react-redux";
import GlobalStyle from "../globalStyle";
import useInput from "../hooks/useInput";
import { useRouter } from "next/router";
import LoginModal from "./LoginForm.modal";
import PostIcon from "./PostIon";
function AppLayout({ userPrNone, children }) {
    const dispatch = useDispatch();

    // const [loginDone, setloginDone] = useState(false)
    const { loginDone, me } = useSelector((state) => state.user);
    const [text, onChangeText] = useInput("");
    const router = useRouter();
    const onSearch = () => {
        router.push(`/hashtag/${text}`);
    };
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <Warapper className="you?">
            <GlobalStyle />
            <LoginModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
            <HeaderContainer>
                <MenuStyle key="menu_list" mode="horizontal">
                    <Menu.Item key="home">
                        <Link href="/" scroll={false}>
                            <a>Home</a>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="profile">
                        <Link href="/profile" scroll={false}>
                            <a>Profile</a>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="shearch">
                        <SearchInput
                            key="input"
                            value={text}
                            onChange={onChangeText}
                            onSearch={onSearch}
                        />
                    </Menu.Item>
                </MenuStyle>
                {!me && (
                    <Button
                        onClick={() => {
                            setIsModalVisible(true);
                        }}
                        type="primary"
                        style={{
                            position: "absolute",
                            top: "7px",
                            right: "5px",
                        }}
                    >
                        로그인
                    </Button>
                )}
            </HeaderContainer>

            <Container>
                <Row gutter={5} className="row">
                    {" "}
                    {/*xs sm md lg xl xxl*/}
                    {userPrNone && userPrNone ? null : (
                        <Col xs={24} md={7} className={me && "info"}>
                            {loginDone || me ? (
                                <Sticky>
                                    <UserProfile className="profiles" />
                                </Sticky>
                            ) : (
                                <Sticky>
                                    <div className="login-form">
                                        <LoginForm />
                                    </div>
                                </Sticky>
                            )}
                        </Col>
                    )}
                    <Col xs={24} md={17} className="contants">
                        <PostIcon /> {children}{" "}
                    </Col>
                </Row>
            </Container>
        </Warapper>
    );
}
AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default AppLayout;
