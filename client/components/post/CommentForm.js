import { Button, Form, Input } from 'antd';
import React, { useCallback, useState, useEffect } from 'react';
import useInput from '../../hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { NotButton } from './style';
import { addComment } from '../../store/actionList';

function CommentForm(props) {
  const dispatch = useDispatch()

  const notLoginOption = [
    <Input.TextArea placeholder='로그인 유저만 가능합니다.' rows="1" key='ctext' disabled="disabled" />,
    <NotButton key='cButton' type="primary" htmlType='submit' disabled="disabled">Send</NotButton>
  ]
  const post = props.post
  const { me } = useSelector((state) => state.user)
  const mailId = me?.mailId

  const { commentAddDone, commentAddLoading } = useSelector((state) => state.post)
  const [commentText, onChangeCommentText, setCommentText] = useInput('')

  useEffect(() => {
    if (commentAddDone) {
      setCommentText('')
    }
  }, [commentAddDone])

  const onSubmitComment = useCallback(() => {
    dispatch(addComment({
      content: commentText,
      PostId: post.id,
    }))
  }, [commentText])

  return (
    <div >
      <Form onFinish={onSubmitComment} style={{ marginBottom: "10px" }}>
        <Form.Item style={{ position: 'relative', margin: '5px 0 0 0', zIndex: 1 }}>
          {mailId
            ? <div >
              <Input.TextArea value={commentText} onChange={onChangeCommentText}
                placeholder='댓글을 입력해주세요'
                required
              />
              <Button style={{ position: 'absolute', right: '10px', bottom: -40 }} loading={commentAddLoading} type="primary" htmlType='submit'>Send</Button>
            </div>
            : notLoginOption}

        </Form.Item>
      </Form>
    </div>);
}

// CommentForm.propTypes = {
//   post: PropTypes.object.isRequire,
// }
export default CommentForm;
