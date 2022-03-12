import styled from "styled-components";
import Slider from 'react-slick';
import {default as ZoomInOutlined}from '@ant-design/icons/lib/icons/ZoomInOutlined';

import { Image } from "antd";

export const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 25px;
  /* margin: 30px; */

  /* background-color: gray; */
  cursor: default;
  @media screen and (max-width: 768px) {
  flex-direction: column;
  padding: 10px;

  }
`


export const ImageStyled = styled(Image)`
  .ant-image-mask{
    top: 50;
    right: 30;
  }
`




export const ImageContainer = styled.div`
  overflow : hidden;
  width: 100%;
  max-height: 600px;
`;

export const StyledSlider = styled(Slider)`
  margin-bottom: 10px;
  .slick-dots{
    position: absolute;
    bottom: -10px;
    z-index: 1;
    /* margin-bottom:20px ; */
  }
`

export const CornnerBox = styled.div`
  position: absolute;
  right: 10px;
  top: ${props=>props.retweet? '66px': '10px'};
  z-index: 1;
  display: flex;

  .imageIndex {
  width: 50px;
  background: #0009; 
  color: #fff;
  text-align: center;
  border-radius: 10px; 
  }
`

export const ZoomIcorn = styled(ZoomInOutlined)`

  margin-right: 10px; 
  width: 50px;
  background: #0009; 
  border-radius: 10px; 

  color: #fff;
  
  svg{  
    width: 30px;
    height: 22px;
  font-weight:900 ;

  }
`