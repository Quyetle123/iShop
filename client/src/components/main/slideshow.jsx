// Slideshow.js
import { useState } from "react";
import styled from "styled-components";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

// Define styled components
const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

const SlidesContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
  transform: translateX(-${(props) => props.translate}%);
`;

const Slide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #333; /* Màu nền */
  color: white;
  border: none;
  padding: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    background-color: rgba(51, 51, 51, 0.7);
    cursor: not-allowed;
  }

  &:first-of-type {
    left: 10px;
  }

  &:last-of-type {
    right: 10px;
  }
`;

const DotsContainer = styled.div`
  text-align: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Dot = styled.div`
  height: 10px;
  width: 10px;
  background-color: ${(props) => (props.active ? "black" : "gray")};
  border-radius: 50%;
  display: inline-block;
  margin: 0 5px;
  cursor: pointer;
`;

const images = [
  "https://cdnv2.tgdd.vn/mwg-static/common/Banner/da/8e/da8eba2f63bb581e77876158d035764f.png",
  "https://cdnv2.tgdd.vn/mwg-static/common/Banner/70/07/7007476ab205d1e806b3079d4d3eaceb.png",
  "https://cdnv2.tgdd.vn/mwg-static/common/Banner/66/b2/66b2b0735f5c40fdab7da671a4056754.png",
  "https://cdnv2.tgdd.vn/mwg-static/common/Banner/9c/80/9c8001c1c10c2482545a84346cb63846.png",
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Container>
      <SlidesContainer translate={currentIndex * 100}>
        {images.map((src, index) => (
          <Slide key={index}>
            <Image src={src} alt={`Slide ${index + 1}`} />
          </Slide>
        ))}
      </SlidesContainer>
      <Button onClick={goToPrev} disabled={images.length <= 1}>
        <FaAngleLeft />
      </Button>
      <Button onClick={goToNext} disabled={images.length <= 1}>
        <FaChevronRight />
      </Button>
      <DotsContainer>
        {images.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => goToSlide(index)}
          />
        ))}
      </DotsContainer>
    </Container>
  );
};

export default Slideshow;
