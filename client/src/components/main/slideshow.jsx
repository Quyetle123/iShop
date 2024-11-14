/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

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
  background-color: #333;
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

const Slideshow = ({ images = [] }) => {
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

  if (images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <Container>
      <SlidesContainer translate={currentIndex * 100}>
        {images.map((src, index) => (
          <Slide key={index}>
            <Image src={src.image} alt={`Slide ${index + 1}`} />
          </Slide>
        ))}
      </SlidesContainer>
      <Button onClick={goToPrev} disabled={images.length <= 1}>
        <FaAngleLeft className="text-[15px]" />
      </Button>
      <Button onClick={goToNext} disabled={images.length <= 1}>
        <FaAngleRight className="text-[15px]" />
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
