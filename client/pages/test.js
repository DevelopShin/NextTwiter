import React from 'react'
import styled from 'styled-components';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Container = styled.div`
  overflow:hidden;
  /* z-index: 2; */
  width: 600px;
  height: 700px;
`;

const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
`;

const ImageContainer = styled.div`
  margin: auto
`;

const Image = styled.img`
max-width:100%;
max-height:100%;
`;

function test() {
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2
  };

  const items = [
    { id: 1, url: "https://picsum.photos/600/600/?random" },
    { id: 2, url: "https://picsum.photos/600/600/?random" },
    { id: 3, url: "https://picsum.photos/600/600/?random" },
    { id: 4, url: "https://picsum.photos/600/600/?random" },
    { id: 5, url: "https://picsum.photos/600/600/?random" },
    { id: 6, url: "https://picsum.photos/600/600/?random" },
    { id: 7, url: "https://picsum.photos/600/600/?random" },
  ];
  return (
    <Container>
      <h2> Single Item</h2>
      <Slider {...settings}
      >
        {items.map(item => {
          return (
            <div key={item.id}>
              <ImageContainer>
                <Image src={item.url} />
              </ImageContainer>
            </div>
          );
        })}
      </Slider>
    </Container>
  );
}

export default test