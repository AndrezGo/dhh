import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import { searchMercadoLibre } from "../../mercadoLibreService";

const CACHE_DURATION = 600000; // 10 minutes in milliseconds

const homeKeywords = [
  // Electrodomésticos de Cocina
  "refrigerador", "frigorifico", "lavadora", "secadora", "lavavajillas", "microondas", "horno", "plancha", "licuadora", "batidora", "cafetera", "aspiradora", "aire acondicionado",
  // Muebles de Hogar
  "sofa", "silla", "mesa de comedor", "cama", "mesita de noche", "armario", "estante", "escritorio",
  // Decoración del Hogar
  "lámpara", "espejo", "alfombra", "cortina", "marco de fotos", "organizador de almacenamiento", "canasta de lavanderia",
  // Utensilios de Cocina
  "utensilio de cocina", "olla", "sarten", "plato", "vaso", "tabla de cortar", "tostadora", "hervidor eléctrico", "procesador de alimentos",
  // Baño
  "toalla", "alfombra", "cortina", "espejo", "estante", "dispensador", "organizador",
  // Ropa de Cama
  "colchón", "almohada", "ropa de cama", "edredón", "cojín", "mesita de noche",
  // Electrónica
  "televisión", "televisor", "sistema de sonido", "soporte para TV", "mesa de centro", "sillon",
  // Productos de Limpieza
  "producto de limpieza", "escoba", "recogedor", "fregona", "cubo", "limpiador a vapor",
  // Jardinería y Exterior
  "muebles exteriores", "barbacoa",
  // Tecnología
  "altavoz", "portatil", "tabletas"
];


const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const SearchForm = tw.form`mt-4 lg:mt-6 text-sm sm:flex max-w-xs sm:max-w-none mx-auto sm:mx-0 relative`;
const Input = tw.input`bg-gray-300 px-6 py-3 rounded sm:rounded-r-none border-2 sm:border-r-0 border-gray-400 hover:border-primary-500 focus:outline-none transition duration-300 w-full`;
const SuggestionsList = tw.ul`absolute left-0 right-0 bg-white shadow-lg max-h-40 overflow-y-auto mt-1 rounded z-10`;
const SuggestionItem = tw.li`px-4 py-2 cursor-pointer hover:bg-gray-200`;
const SearchButton = tw(PrimaryButtonBase)`mt-4 sm:mt-0 w-full sm:w-auto rounded sm:rounded-l-none px-8 py-3`;

const CardContainer = styled.div`
  ${tw`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`};
  ${props => props.rank === 1 && tw`order-1`};
  ${props => props.rank === 2 && tw`order-2`};
  ${props => props.rank === 3 && tw`order-3`};
`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const CardImage = styled.img`
  ${tw`w-full h-full object-cover`};
`;

const CustomCardRatingContainer = styled.div`
  ${tw`absolute bottom-0 left-0 ml-4 mb-4 rounded-full px-8 py-3`}
  background-color: rgba(128, 0, 128, 0.9); /* Purple with 90% opacity */
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const rankLabels = ["Best Buy", "Top Choice", "Great Value"];

const ProductCard = ({ product, rank }) => (
  <CardContainer rank={rank}>
    <Card className="group" href={product.link} initial="rest" whileHover="hover" animate="rest">
      <CardImageContainer>
        <CardImage src={product.image} alt={product.title} />
        <CustomCardRatingContainer>
          {rankLabels[rank - 1]}
        </CustomCardRatingContainer>
      </CardImageContainer>
      <CardText>
        <CardTitle>{truncate(product.title, 50)}</CardTitle>
        <CardContent>{truncate(product.content, 100)}</CardContent>
        <CardPrice>{ product.price }</CardPrice>
      </CardText>
    </Card>
  </CardContainer>
);

const truncate = (str, maxLength) => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};

const calculateScore = (product) => {
  const priceScore = 1 / (parseFloat(product.price) || 1);
  const ratingScore = parseFloat(product.rating) || 0;
  const reviewsScore = parseInt(product.reviews.replace(/,/g, '')) || 0;
  const content = product.content ? product.content.toLowerCase() : '';
  const offerScore = content.includes('offer') || content.includes('discount') ? 10 : 0;
  return priceScore + ratingScore + reviewsScore + offerScore;
};

const getTopProducts = (products, start = 0, count = 3) => {
  return products
    .filter(product => product.price && !isNaN(product.price))
    .sort((a, b) => calculateScore(b) - calculateScore(a))
    .slice(start, start + count);
};

const filterHomeProducts = (products) => {
  return products.filter(product => {
    const title = product.title ? product.title.toLowerCase() : '';
    const content = product.content ? product.content.toLowerCase() : '';
    return homeKeywords.some(keyword => title.includes(keyword) || content.includes(keyword));
  });
};

const renderTopThreeTable = (products) => (
  <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
    <thead>
      <tr style={{ backgroundColor: "#f8f8f8" }}>
        <th>Product</th>
        <th>Price</th>
        <th>Rating</th>
        <th>Reviews</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product, index) => {
        const rowColor = index === 0 ? "#ccffcc" : index === 1 ? "#ffffcc" : "#FFF";
        const price = `$${product.price}`;
        const rating = product.rating.split(' ')[0];
        const reviews = product.reviews.split(' ')[0];
        return (
          <tr key={product.title} style={{ backgroundColor: rowColor }}>
            <td style={{ padding: "10px" }}>
              <img src={product.image} alt={product.title} style={{ maxWidth: "50px", marginRight: "10px" }} />
              {product.title}
            </td>
            <td>{price}</td>
            <td>{rating}</td>
            <td>{reviews}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default ({
  heading = "Compare MercadoLibre Products"
}) => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState(JSON.parse(localStorage.getItem('searchResults')) || []);
  const [nonHomeProducts, setNonHomeProducts] = useState(false);
  const [productsDisplayed, setProductsDisplayed] = useState(3);
  const cache = useRef({});
  const cardsRef = useRef(null);

  useEffect(() => {
    if (searchTerm.length > 1) {
      setSuggestions(homeKeywords.filter(keyword => keyword.includes(searchTerm.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const now = Date.now();
    if (cache.current[searchTerm] && (now - cache.current[searchTerm].timestamp < CACHE_DURATION)) {
      setSearchResults(cache.current[searchTerm].results);
    } else {
      const results = await searchMercadoLibre(searchTerm);
      const filteredResults = filterHomeProducts(results);
      cache.current[searchTerm] = { results: filteredResults, timestamp: now };
      setSearchResults(filteredResults);
      setNonHomeProducts(filteredResults.length === 0);
      localStorage.setItem('searchTerm', searchTerm);
      localStorage.setItem('searchResults', JSON.stringify(filteredResults));
      setProductsDisplayed(3);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleShowMore = () => {
    setProductsDisplayed(productsDisplayed + 3);
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const topProductsToShow = getTopProducts(searchResults, productsDisplayed - 3, 3);
  const remainingProducts = searchResults.length - productsDisplayed;

  return (
    <Container>
      <ContentWithPaddingXl>
        <Header>{heading}</Header>
        <HeaderRow>
          <SearchForm onSubmit={handleSearch}>
            <Input
              type="text"
              placeholder="Type For example: dryer"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {suggestions.length > 0 && (
              <SuggestionsList>
                {suggestions.map((suggestion, index) => (
                  <SuggestionItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </SuggestionItem>
                ))}
              </SuggestionsList>
            )}
            <SearchButton type="submit">Get the best</SearchButton>
          </SearchForm>
        </HeaderRow>

        {searchResults.length > 0 && (
          <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#e2e8f0", width: "100%", textAlign: "center" }}>
            Products analyzed: {remainingProducts}
          </div>
        )}

        {nonHomeProducts && (
          <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#ffe2e2", width: "100%", textAlign: "center" }}>
            The search did not return any home-related products.
          </div>
        )}

        {searchResults.length > 0 ? (
          <>
            <div ref={cardsRef} style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", marginTop: "20px" }}>
              {topProductsToShow.map((product, index) => (
                <ProductCard key={product.title} product={product} rank={index + 1} />
              ))}
            </div>
            {renderTopThreeTable(topProductsToShow)}
            {remainingProducts > 0 && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <PrimaryButtonBase onClick={handleShowMore}>Didn't Find What You Like? View More</PrimaryButtonBase>
              </div>
            )}
          </>
        ) : null}
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};