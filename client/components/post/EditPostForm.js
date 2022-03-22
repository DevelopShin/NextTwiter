import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Button, Form, Input, } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import { UploadStyle } from './style';
import { ADD_POST_REQUEST, } from '../../store/types';
function EditPost({ post, setShowEdit, showEdit }) {

  const dispatch = useDispatch()
  const { editPostDone, editPostLoading } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user)

  const [text, setText] = useState(post.content)
  const onChangeText = useCallback((e) => {
    setText(e.target.value)
  })

  useEffect(() => {
    if (editPostLoading) {
      setShowEdit(false)
      setText('')
      setFileList([])
    }
  }, [editPostLoading])


  /////////////////////////////////////////////////////////////////
  const [isShow, setIsShow] = useState(false)
  const showImage = useCallback(() => {
    setIsShow(!isShow)
  },[isShow])

  const [fileList, setFileList] = useState([]);
  useEffect( async ()=>{
    console.log(post.Images)
    if(post.Images.length > 0){
      setFileList(post.Images.map((image)=>{return ({url:image.src, status:'done',id:image.id})}))
    }
  },[showEdit])

  const onChange = ({ fileList: newFileList }) => {

    setFileList(newFileList)

  }
//이미지 제거 
  const [rmImageId, setRmImageId] = useState([])
  const getRmImageId = useCallback((e) => {
    const result =confirm('정말 삭제하시겠습니까 ?')
    if(!result){
      return false
    }
    setRmImageId([...rmImageId, e.id])
  },[])
  /////////////////////////////////////////////////////////////////
  const onsubmit = useCallback(async () => {
    if (fileList[0] && fileList[fileList.length - 1].originFileObj) {
      const formData = new FormData();
      await [].forEach.call(fileList, (f) => {
        formData.append('image', f.originFileObj && f.originFileObj)
      })
      formData.append('content', text)
      formData.append('PostId', post.id)
      formData.append('rmImageId', rmImageId)

      dispatch({
        type: "EDIT_POST_REQUEST",
        payload: formData
      })
    } else {
      dispatch(
        {
          type: "EDIT_POST_REQUEST",
          payload: {
            content: text,
            PostId: post.id,
            rmImageId:rmImageId
          }
        })
    }
  }, [text, fileList, rmImageId])




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
          <Button type='primary' onClick={showImage}> 이미지 수정</Button>
          <Button type='primary' style={{ float: 'right' }}
            htmlType='submit' loading={editPostLoading}
            disabled={fileList.length && fileList[fileList.length - 1].status === "uploading" && "disabled"} >저장</Button>
          <Button style={{float:'right', marginRight:"10px"}} onClick={()=>setShowEdit(false)}> 취소</Button>
          
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
          showUploadList={{showPreviewIcon:false}}
          // action={BACK_URL}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onRemove={(e)=>getRmImageId(e)}
          multiple
        >
          {fileList.length < 5 && '+ Upload'}
        </UploadStyle>
        // </ImgCrop>
      }

    </>
  );
}

export default EditPost;

