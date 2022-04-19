import React, { useState, useEffect} from 'react'
import { default as FormOutlined } from '@ant-design/icons/lib/icons/FormOutlined'

import { IconWrap } from './PostIcon.Elements'
function PostIcon() {
  const [iconShow, setIconShow] = useState(false)
  const handleFollow = () => {
    setIconShow(window.scrollY > 300)
  }


  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow)
    }
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow)
    }
  })

  const goToEdit = (params) => {
    document.getElementById('newpost').focus()
  }
  return (
    <>
      {iconShow &&

        <IconWrap onClick={goToEdit}>
          <FormOutlined /> 
          {" "}포스트 쓰기
        </IconWrap>
      }
    </>
  )
}

export default PostIcon