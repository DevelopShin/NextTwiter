import React, { useMemo, useCallback, useEffect } from "react";
import { Input, Form, Button } from "antd";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { CHANGENICKNAME_REQUEST } from "../../store/types";
function NicknameEditForm() {
  const { changeNicknameDone, me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const style = useMemo(
    () => ({
      marginBottom: "20px",
      border: "3px solid #d9d9d9",
      padding: "28px",
    }),
    []
  );

  const [nickname, onChageNick, setNick] = useInput(me?.nickname);
  const [descrip, onChageDescrip, setDesc] = useInput(me?.descrip);
  const onSubmit = useCallback(() => {
    if (nickname || descrip) {
      dispatch({
        type: CHANGENICKNAME_REQUEST,
        payload: { nickname: nickname, descrip: descrip },
      });
    } else {
      alert("변경된 내용이 없습니다.");
    }
  }, [nickname, descrip]);

  return (
    <div>
      <Form style={style} onFinish={onSubmit}>
        <Input placeholder="닉네임" value={nickname} onChange={onChageNick} />
        <Input.TextArea
          placeholder="소개 글"
          value={descrip}
          onChange={onChageDescrip}
        />
        <Button
          type="primary"
          htmlType="submit"
          disabled={nickname || descrip ? "" : "disabled"}
        >
          저장
        </Button>
      </Form>
    </div>
  );
}

export default NicknameEditForm;
