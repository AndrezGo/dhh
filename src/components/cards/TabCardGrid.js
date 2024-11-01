import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import { searchMercadoLibre } from "../../mercadoLibreService";
import 'tailwindcss/tailwind.css';
import { ReactComponent as CameraIcon } from "../../images/photo-camera-svgrepo-com.svg"; 

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)`mt-0`;
const SearchForm = tw.form`mt-2 lg:mt-3 text-sm sm:flex max-w-xs sm:max-w-none mx-auto sm:mx-0 relative`;
const InputContainer = tw.div`relative w-full`;
const Input = tw.input`bg-gray-300 px-6 py-3 rounded sm:rounded-r-none border-2 sm:border-r-0 border-gray-400 hover:border-primary-500 focus:outline-none transition duration-300 w-full text-lg placeholder-gray-500`;
const SuggestionList = tw.ul`absolute bg-white border border-gray-400 w-full mt-1 z-10`;
const SuggestionItem = tw.li`px-4 py-2 cursor-pointer hover:bg-gray-200`;

const colors = {
  blue: '#007bff',
  red: '#ff4b5c',
  yellow: '#ffcb05',
  green: '#00d1b2'
};

const SearchButton = styled(PrimaryButtonBase)`
  ${({ disabled }) =>
    disabled
      ? css`
          ${tw`bg-gray-300 cursor-not-allowed`}
          &:hover {
            ${tw`bg-gray-300`}
          }
        `
      : css`
          ${tw`bg-blue-500 hover:bg-blue-700`}
        `}
`;

const CardContainer = styled(motion.div)`
  ${tw`w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto mb-4`};
`;
const Card = tw(motion.div)`bg-gray-200 rounded-lg block w-full p-4 relative`;
const CardImageContainer = styled.div`
  ${tw`h-32 sm:h-48 relative rounded-t-lg`};
  background: url("${props => props.imageSrc}") center center / contain no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  min-height: 200px;
`;
const CardImage = styled.img`
  display: none;
`;

const CardText = tw.div`p-2 text-gray-900 flex flex-col justify-between h-full`;
const CardTitle = tw.h5`text-sm font-semibold`;
const CardContent = tw.p`mt-1 text-xs font-medium text-gray-600`;
const CardPrice = tw.p`mt-2 text-lg font-bold`;

const RatingAndReviews = styled.div`
  ${tw`flex items-center mt-2`};
`;

const StarRating = styled.div`
  ${tw`flex`};
`;

const Star = styled.div`
  ${tw`w-4 h-4`};
  svg {
    width: 100%;
    height: 100%;
  }
`;

const FilledStar = () => (
  <Star>
    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffc107" viewBox="0 0 24 24" stroke="none">
      <path d="M12 .587l3.668 7.431 8.21 1.191-5.934 5.786 1.402 8.185L12 18.897l-7.346 3.883 1.402-8.185-5.934-5.786 8.21-1.191z" />
    </svg>
  </Star>
);

const HalfStar = () => (
  <Star>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="none">
      <defs>
        <linearGradient id="halfGrad">
          <stop offset="50%" style={{ stopColor: "#ffc107", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "white", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path fill="url(#halfGrad)" d="M12 .587l3.668 7.431 8.21 1.191-5.934 5.786 1.402 8.185L12 18.897V.587z" />
      <path fill="#ffc107" d="M12 18.897l-7.346 3.883 1.402-8.185-5.934-5.786 8.21-1.191L12 .587v18.31z" />
    </svg>
  </Star>
);

const EmptyStar = () => (
  <Star>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ffc107">
      <path d="M12 .587l3.668 7.431 8.21 1.191-5.934 5.786 1.402 8.185L12 18.897l-7.346 3.883 1.402-8.185-5.934-5.786 8.21-1.191z" />
    </svg>
  </Star>
);

const LoadingSpinner = styled(motion.div)`
  ${tw`border-t-4 border-primary-500 border-solid rounded-full w-8 h-8`};
`;

const Modal = ({ isOpen, onClose, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          tw="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex justify-center items-center"
        >
          <motion.div tw="relative p-8 bg-white w-full max-w-lg m-auto flex flex-col items-center rounded-lg">
            <span tw="absolute top-0 right-0 p-4 cursor-pointer" onClick={onClose}>
              &times;
            </span>
            <div tw="w-full h-96 flex items-center justify-center">
              <img src={images[currentIndex]} alt={`Product ${currentIndex}`} tw="max-h-full max-w-full object-contain" />
            </div>
            <div tw="flex justify-between w-full mt-4" style={{ position: 'absolute', bottom: '16px' }}>
  <button
    onClick={handlePrev}
    tw="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded text-sm"
  >
    Prev
  </button>
  <button
    onClick={handleNext}
    tw="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded text-sm"
  >
    Next
  </button>
</div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProductCard = ({ product, onLike, onDislike, isAnimating, animationDirection, onImageClick }) => {
  const fullStars = Math.floor(product.rating);
  const halfStars = product.rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <CardContainer
      initial={{ rotateY: 0 }}
      animate={
        isAnimating
          ? { rotateY: animationDirection > 0 ? 180 : -180, opacity: 0 }
          : { rotateY: 0, opacity: 1 }
      }
      exit={{ rotateY: animationDirection > 0 ? 180 : -180, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardImageContainer imageSrc={product.image}>
          <CardImage src={product.image} alt={product.title} />
          <button onClick={onImageClick} tw="absolute bg-yellow-500 hover:bg-yellow-700 text-white rounded-full p-2">
            <CameraIcon tw="w-6 h-6" />
          </button>
        </CardImageContainer>
        <CardText>
          <div>
            <CardTitle>{truncate(product.title, 50)}</CardTitle>
            <CardContent>{truncate(product.content, 100)}</CardContent>
            <CardPrice>{product.price}</CardPrice>
          </div>
          <RatingAndReviews>
            <StarRating>
              {[...Array(fullStars)].map((_, index) => (
                <FilledStar key={index} />
              ))}
              {halfStars === 1 && <HalfStar />}
              {[...Array(emptyStars)].map((_, index) => (
                <EmptyStar key={index + fullStars + halfStars} />
              ))}
            </StarRating>
            <div css={tw`ml-2 text-xs`}>{product.rating.toFixed(1)}</div>
            <div css={tw`ml-2 text-xs`}>({product.reviews} reviews)</div>
          </RatingAndReviews>
          <a href={product.link} target="_blank" rel="noopener noreferrer">
            <button css={tw`mb-4 w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded`}>
              Comprar
            </button>
          </a>
          <div css={tw`flex justify-center mt-4 space-x-4`}>
            <button onClick={onDislike} css={tw`px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded text-sm`}>
              ❌
            </button>
            <button onClick={onLike} css={tw`px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded text-sm`}>
              ✔️
            </button>
          </div>
        </CardText>
      </Card>
    </CardContainer>
  );
};

const truncate = (str, maxLength) => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const CustomContent = styled(ContentWithPaddingXl)`
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  ${tw`min-h-screen flex flex-col`}
`;

const Message = tw.div`mt-10 text-center text-gray-700 font-semibold text-lg`;

const categories = [
  "aspiradoras", "batidora", "cafetera", "camas", "chrome-cast", "colchon", "comedor",
  "cubiertos", "cubrelecho", "cuchillos", "escritorio", "estufa", "exprimidor", "juego-de-sabanas",
  "lamparas-mesa", "lamparas-piso", "lamparas-techo", "lavadora", "licuadora", "mesa-de-noche",
  "mini-split", "nevera", "parlante", "planchas", "portatil", "regaderas", "sofa", "tablets",
  "televisor", "tetera", "vajillas", "ventilador","playstation","xbox","nintendo","sillas"
];

const Footer = styled.div`
  ${tw`mt-auto py-4 text-center text-gray-500 text-sm`}
`;

export default () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [apiResults, setApiResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);

  useEffect(() => {
    if (!hasSearched) {
      setApiResults([]);
    }
  }, [hasSearched]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!selectedCategory) return;
    setIsLoading(true);
    setHasSearched(false);
    setCurrentIndex(0);
    const results = await searchMercadoLibre(selectedCategory);
    setApiResults(results);
    setHasSearched(true);
    setIsLoading(false);
  };

  const handleLike = () => {
    setAnimationDirection(1);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      if (currentIndex < apiResults.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setHasSearched(false);
      }
    }, 500);
  };

  const handleDislike = () => {
    setAnimationDirection(-1);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      if (currentIndex < apiResults.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setHasSearched(false);
      }
    }, 500);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const matchingCategory = categories.find(category =>
      category.toLowerCase() === value.toLowerCase()
    );
    setSelectedCategory(matchingCategory ? value : '');
    if (value) {
      const filteredSuggestions = categories.filter(category =>
        category.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSelectedCategory(suggestion);
    setSuggestions([]);
  };

  const handleImageClick = (images) => {
    setModalImages(images);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <CustomContent>
        <Header />
        <HeaderRow>
          <SearchForm onSubmit={handleSearch}>
            <InputContainer>
              <Input
                type="text"
                placeholder="Escribir: Nevera"
                value={searchTerm}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              {suggestions.length > 0 && (
                <SuggestionList>
                  {suggestions.map((suggestion, index) => (
                    <SuggestionItem
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </SuggestionItem>
                  ))}
                </SuggestionList>
              )}
            </InputContainer>
            <SearchButton type="submit" disabled={!selectedCategory || isLoading}>
              {isLoading ? (
                <LoadingSpinner
                  animate={{ x: [0, 20, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              ) : (
                "Get the best"
              )}
            </SearchButton>
          </SearchForm>
        </HeaderRow>
        {!hasSearched && (
          <Message>
            No hay productos para mostrar.
          </Message>
        )}
        <AnimatePresence>
          {hasSearched && !isLoading && currentIndex < apiResults.length && (
            <div css={tw`flex justify-center mt-10`}>
              <ProductCard
                key={apiResults[currentIndex].id}
                product={apiResults[currentIndex]}
                onLike={handleLike}
                onDislike={handleDislike}
                isAnimating={isAnimating}
                animationDirection={animationDirection}
                onImageClick={() => handleImageClick(apiResults[currentIndex].images)}
              />
            </div>
          )}
        </AnimatePresence>
        {hasSearched && !isLoading && currentIndex >= apiResults.length && (
          <Message>
            No hay más productos para mostrar.
          </Message>
        )}
        {hasSearched && !isLoading && apiResults.length === 0 && (
          <Message>
            No hay productos para mostrar.
          </Message>
        )}
        {hasSearched && !isLoading && apiResults.length > 0 && (
          <div css={tw`mt-5 p-4 bg-gray-100 text-secondary-700 w-full text-center font-bold text-lg`}>
            📊 Procesamos <span css={tw`text-primary-500`}>{apiResults.length}</span> productos.
          </div>
        )}
      </CustomContent>
      <Footer>
        © 2024 Digital Home Hub. All Rights Reserved.
      </Footer>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
      <Modal isOpen={isModalOpen} onClose={closeModal} images={modalImages} />
    </Container>
  );
};