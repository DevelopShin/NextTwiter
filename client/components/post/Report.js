import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Input, Form, message } from 'antd';
import useInput from '../../hooks/useInput';
function Report({ post, isModalVisible, setIsModalVisible }) {
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const { reportDone, reportLoading, reportPostId } = useSelector((state) => state.post)

  const [reportText, onChangeReportText, setReportText] = useInput('')

  const onSubmitReport = useCallback(() => {
    console.log('reports', reportText)
    dispatch({
      type: "REPORT_POST_REQUEST",
      payload: {
        content: reportText,
        PostId: post.id,
        UserId: me.id
      }
    })
  }, [reportText,])

  useEffect(() => {
    if (reportDone && reportPostId == post.id) {
      setReportText("")
      setIsModalVisible(false)
      message.success('정상적으로 신고접수 되었습니다.')
    }
  }, [reportDone, reportPostId])
  return (
    <Modal
      title="!!!"
      visible={isModalVisible}
      onOk={onSubmitReport}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button key="back" onClick={() => setIsModalVisible(false)}>
          취소
        </Button>,
        <Button key="submit" type="danger" loading={reportLoading} onClick={onSubmitReport}>
          신고
        </Button>,
      ]}
    >
      <Form >
        <Form.Item >

          <Input.TextArea value={reportText} onChange={onChangeReportText}
            placeholder='내용을 입력해주세요'
            rows={5}
            cols={40}
            required
          />

        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Report