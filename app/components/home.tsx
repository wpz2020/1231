"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";

import { IconButton } from "./button";
import styles from "./home.module.scss";

import SettingsIcon from "../icons/settings.svg";
import GithubIcon from "../icons/github.svg";
import ChatGptIcon from "../icons/chatgpt.svg";

import BotIcon from "../icons/bot.svg";
import AddIcon from "../icons/add.svg";
import LoadingIcon from "../icons/three-dots.svg";
import CloseIcon from "../icons/close.svg";

import {
  Message,
  SubmitKey,
  useChatStore,
  ChatSession,
  BOT_HELLO,
} from "../store";
import {
  copyToClipboard,
  downloadAs,
  isMobileScreen,
  selectOrCopy,
} from "../utils";
import Locale from "../locales";
import { ChatList } from "./chat-list";
import { Chat } from "./chat";

import dynamic from "next/dynamic";
import { REPO_URL } from "../constant";

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"]}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}

const Settings = dynamic(async () => (await import("./settings")).Settings, {
  loading: () => <Loading noLogo />,
});

function useSwitchTheme() {
  const config = useChatStore((state) => state.config);

  useEffect(() => {
    document.body.classList.remove("light");
    document.body.classList.remove("dark");

    if (config.theme === "dark") {
      document.body.classList.add("dark");
    } else if (config.theme === "light") {
      document.body.classList.add("light");
    }

    const themeColor = getComputedStyle(document.body)
      .getPropertyValue("--theme-color")
      .trim();
    const metaDescription = document.querySelector('meta[name="theme-color"]');
    metaDescription?.setAttribute("content", themeColor);
  }, [config.theme]);
}

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

export function CDKModal() {
  const [CDK, SetCDK] = useState("");
  let cdkdb = [
    {
      "cdk": "13579yzb.",
      "time": "2024-04-7"
  },
  {
      "cdk": "ququaijkhhjkggjksj",
      "time": "2023-05-7"
  },
  {
      "cdk": "ququaihjhkihdjslks",
      "time": "2023-4-8"
  },
  {
      "cdk": "ququailjkjbghgyguh",
      "time": "2023-4-14"
  },
  {
      "cdk": "ququaijnjnhkjisopo",
      "time": "2023-10-7"
  },
  ];
  import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, Card } from "antd";
import "antd/dist/antd.css";

const Login = () => {
  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    console.log("login", values);
    message.success("登录成功");
  };

  return (
    <Card title="用户登录">
      <Form
        name="login-form"
        form={form}
        onFinish={onSubmit}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const Register = () => {
  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    console.log("register", values);
    message.success("注册成功");
  };

  return (
    <Card title="用户注册">
      <Form
        name="register-form"
        form={form}
        onFinish={onSubmit}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            { required: true, message: "请再次输入密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不一致"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const ForgotPassword = () => {
  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    console.log("forgot-password", values);
    message.success("密码找回邮件已发送，请在邮箱中查收");
  };

  return (
    <Card title="找回密码">
      <Form
        name="forgot-password-form"
        form={form}
        onFinish={onSubmit}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: "请输入邮箱" },
            { type: "email", message: "请输入正确的邮箱地址" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type="primary" htmlType="submit">
            发送邮件
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", marginTop: 50 }}>
      <Card
        tabList={[
          { key: "login", tab: "登录" },
          { key: "register", tab: "注册" },
          { key: "forgot-password", tab: "忘记密码" },
        ]}
        activeTabKey={activeTab}
        onTabChange={(key) => setActiveTab(key as string)}
      >
        {activeTab === "login" && <Login />}
        {activeTab === "register" && <Register />}
        {activeTab === "forgot-password" && <ForgotPassword />}
      </Card>
    </div>
  );
};

export default LoginPage;


  const login = () => {
    let cdkArray = cdkdb.filter((item) => item.cdk === CDK);
    console.log(cdkArray);
    if (
      cdkArray.length > 0 &&
      new Date(cdkArray[0].time).getTime() > new Date().getTime()
    ) {
      window.localStorage.setItem("cdk", JSON.stringify(cdkArray[0]));
      document.getElementsByClassName("modal-mask")?.[0]?.remove();
      alert("登录成功");
    } else {
      alert("授权码错误或失效,请联系微信：JamesYu_888!");
    }
  };
  let loaclcdk: any = window.localStorage.getItem("cdk");
  let time: any = JSON.parse(loaclcdk)?.time;
  if (!time || new Date(time).getTime() < new Date().getTime()) {
    window.localStorage.removeItem("cdk");
  }
  return !window.localStorage.getItem("cdk") ? (
    <div className="modal-mask">
      <div className={styles["modal-container"]}>
        <div className={styles["modal-header"]}>
          <div className={styles["modal-title"]}>请输入授权码</div>
        </div>

        <div className={styles["modal-content"]}>
          <input
            className={styles["modal-input"]}
            onInput={(e) => SetCDK(e.currentTarget.value)}
            value={CDK}
          />
        </div> 
        <p>   <a target="_blank" href="http://www.baidu.com" type="decoration:none">自助购买授权码，暂不可用！</a></p>
        <p>如有疑问请联系微信号：JamesYu_888</p>
        <div className={styles["modal-footer"]}>
          <div className={styles["modal-actions"]}>
            <IconButton
              icon={<AddIcon />}
              bordered
              text="确定"
              onClick={() => login()}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export function Home() {
  const [createNewSession, currentIndex, removeSession] = useChatStore(
    (state) => [
      state.newSession,
      state.currentSessionIndex,
      state.removeSession,
    ],
  );
  const loading = !useHasHydrated();
  const [showSideBar, setShowSideBar] = useState(true);

  // setting
  const [openSettings, setOpenSettings] = useState(false);
  const config = useChatStore((state) => state.config);

  useSwitchTheme();

  if (loading) {
    return <Loading />;
  }
  return (
    <div
      className={`${
        config.tightBorder && !isMobileScreen()
          ? styles["tight-container"]
          : styles.container
      }`}
    >
      <CDKModal />
      <div
        className={styles.sidebar + ` ${showSideBar && styles["sidebar-show"]}`}
      >
        <div className={styles["sidebar-header"]}>
          <div className={styles["sidebar-title"]}>ChatGPT-QUQUAI</div>
          <div className={styles["sidebar-sub-title"]}>
            quying_global
          </div>
          <div className={styles["sidebar-sub-title"]}>
            获取更多请关注公众号：趣盈全球
          </div>
          <div className={styles["sidebar-logo"]}>
            <ChatGptIcon />
          </div>
        </div>

        <div
          className={styles["sidebar-body"]}
          onClick={() => {
            setOpenSettings(false);
            setShowSideBar(false);
          }}
        >
          <ChatList />
        </div>

        <div className={styles["sidebar-tail"]}>
          <div className={styles["sidebar-actions"]}>
            <div className={styles["sidebar-action"] + " " + styles.mobile}>
              <IconButton
                icon={<CloseIcon />}
                onClick={() => {
                  if (confirm(Locale.Home.DeleteChat)) {
                    removeSession(currentIndex);
                  }
                }}
              />
            </div>
            <div className={styles["sidebar-action"]}>
              <IconButton
                icon={<SettingsIcon />}
                onClick={() => {
                  setOpenSettings(true);
                  setShowSideBar(false);
                }}
                shadow
              />
            </div>
 
          </div>
          <div>
            <IconButton
              icon={<AddIcon />}
              text={Locale.Home.NewChat}
              onClick={() => {
                createNewSession();
                setShowSideBar(false);
              }}
              shadow
            />
          </div>
        </div>
      </div>

      <div className={styles["window-content"]}>
        {openSettings ? (
          <Settings
            closeSettings={() => {
              setOpenSettings(false);
              setShowSideBar(true);
            }}
          />
        ) : (
          <Chat
            key="chat"
            showSideBar={() => setShowSideBar(true)}
            sideBarShowing={showSideBar}
          />
        )}
      </div>
    </div>
  );
}
