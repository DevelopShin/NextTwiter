import React, { useState, useCallback } from 'react';
import { Image } from 'antd';
import { StyledSlider, ImageContainer, ZoomIcorn, CornnerBox } from './PostImages.Elements';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick'
import styled from 'styled-components';
import { BACK_URL } from '../../config/config';


function PostImages(props) {
  const images = props.images
  const [imgIndex, setImageIndex] = useState(1)
  const [visible, setVisible] = useState(false);
  const onZoom = useCallback(() => {
    setVisible(true);
  }, [])

  // const slickOpt = {
  //   dots: true,
  //   lazyLoad: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   initialSlide: 1,
  //   afterChange={(index) => setImageIndex(index)}
  // };

  return (
    <>
      <ImageContainer>
        <CornnerBox retweet={props.retweet}>
          <ZoomIcorn onClick={() => setVisible(true)} />

          {images.length > 1 &&
            <div className='imageIndex' >
              {imgIndex} / {images.length}
            </div>
          }

        </CornnerBox>


        <StyledSlider
          dots={false}
          lazyLoad={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          initialSlide={0}
          afterChange={(i) => setImageIndex(i + 1)}
        // beforeChange={}
        >

          {images.map((item, index) => {
            return (
              <div key={item.id} >
                <Image
                  width='100%'
                  preview={false}
                  src={item.src.replace('uploads','thumb')} //`${BACK_URL}/${item.src}`
                />
              </div>
            );
          })}
        </StyledSlider>
      </ImageContainer>
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          {images.map((image) => {
            return (
              <Image key={image.id} src={image.src} />
            )
          })}

        </Image.PreviewGroup>
      </div>
    </>
  )

}

export default PostImages;


