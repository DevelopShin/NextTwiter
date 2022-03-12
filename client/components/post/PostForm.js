import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Button, Form, Input, } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import { UploadStyle } from './style';
import { ADD_POST_REQUEST, } from '../../store/types';
function PostForm() {

  const dispatch = useDispatch()
  const { imagePath, imageUploadDone, postAddLoading, postAddDone } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user)

  const [text, setText] = useState('')
  const onChangeText = useCallback((e) => {
    setText(e.target.value)
  })

  useEffect(() => {
    if (postAddDone) {
      setText('')
      setFileList([])
    }
  }, [postAddDone])


  /////////////////////////////////////////////////////////////////

  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)

  }


  /////////////////////////////////////////////
  const onPreview = async file => {

    let src = await new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const [isShow, setIsShow] = useState(false)
  const showImage = () => {
    setIsShow(!isShow)
  }


  /////////////////////////////////////////////////////////////////
  const onsubmit = useCallback(async () => {

    if (fileList.length > 0) {
      const formData = new FormData();
      [].forEach.call(fileList, (f) => {
        formData.append('image', f.originFileObj)
      })
      formData.append('content', text)
      dispatch({
        type: ADD_POST_REQUEST,
        payload: formData
      })
    } else {
      dispatch(
        {
          type: ADD_POST_REQUEST,
          payload: { content: text },
        })
    }
  }, [text, fileList])




  /////////////////////////////////////////////////////////////////

  return (
    <>
      <Form style={{ margin: '0 0 20px', borderBottom: 'solid 2px gray' }} encType="multipart/form-data" onFinish={onsubmit}>
        <Input.TextArea
          value={text}
          onChange={onChangeText}
          maxLength={140}
          rows={4}
          placeholder="내용을 입렵해주세요"
          required
        />
        <div>
          <Button type='primary' onClick={showImage}> 이미지 업로드</Button>
          <Button type='primary' style={{ float: 'right' }}
            htmlType='submit' loading={postAddLoading}
            disabled={fileList.length && fileList[fileList.length - 1].status === "uploading" && "disabled"} >작성</Button>
        </div>

      </Form>

      {isShow &&
        // <ImgCrop >
        <UploadStyle
          progress={{
            strokeWidth: 3,
            strokeColor: {
              "0%": "#f0f",
              "100%": "#ff0"
            },
            style: { top: 12 },
          }}

          // beforeUpload={}

          style={{ position: 'relative', top: "-20px" }}
          // action={BACK_URL}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          multiple
        >
          {fileList.length < 5 && '+ Upload'}
        </UploadStyle>
        // </ImgCrop>
      }

    </>
  );
}

export default PostForm;

