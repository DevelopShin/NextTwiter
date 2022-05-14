import React, { useState, useEffect } from "react";
import { default as FormOutlined } from "@ant-design/icons/lib/icons/FormOutlined";
import { useSelector } from "react-redux";
import { IconWrap } from "./PostIcon.Elements";

// import Reservation from "assets/icon-24-reservation.svg"

function PostIcon() {
  const { me } = useSelector((state) => state.user);

  const [iconShow, setIconShow] = useState(false);
  const handleFollow = () => {
    setIconShow(window.scrollY > 300);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  const goToEdit = (params) => {
    if (!me) {
      alert("로그인이 필요합니다.");
    } else {
      document.getElementById("newpost").focus();
    }
  };
  return (
    <>
      {iconShow && (
        <IconWrap onClick={goToEdit}>
          <FormOutlined /> 포스트 쓰기
        </IconWrap>
      )}
    </>
  );
}

export default PostIcon;
