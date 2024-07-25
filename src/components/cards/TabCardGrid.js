import React, { useState, useRef } from "react";
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

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const SearchForm = tw.form`mt-4 lg:mt-6 text-sm sm:flex max-w-xs sm:max-w-none mx-auto sm:mx-0 relative`;
const Input = tw.input`bg-gray-300 px-6 py-3 rounded sm:rounded-r-none border-2 sm:border-r-0 border-gray-400 hover:border-primary-500 focus:outline-none transition duration-300 w-full`;
const SearchButton = tw(PrimaryButtonBase)`mt-4 sm:mt-0 w-full sm:w-auto rounded sm:rounded-l-none px-8 py-3`;

const CardContainer = styled.div`
  ${tw`w-full sm:w-1/4 md:w-1/5 lg:w-1/6 sm:pr-4 md:pr-4 lg:pr-4 mb-4`};
`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0 p-2 relative`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-32 bg-center bg-cover relative rounded-t`};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const CardImage = styled.img`
  ${tw`w-full h-full object-cover`};
`;

const CardText = tw.div`p-2 text-gray-900 flex flex-col justify-between h-full`;
const CardTitle = tw.h5`text-sm font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-xs font-medium text-gray-600`;
const CardPrice = tw.p`mt-2 text-lg font-bold`;

const RatingAndReviews = styled.div`
  ${tw`absolute bottom-0 right-0 m-2 text-xs text-gray-600`};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const LoadingSpinner = styled(motion.div)`
  ${tw`border-t-4 border-primary-500 border-solid rounded-full w-8 h-8`};
`;

const ProductCard = ({ product, tag }) => (
  <CardContainer>
    <Card className="group" href={product.link} initial="rest" whileHover="hover" animate="rest">
      <CardImageContainer>
        <CardImage src={product.image} alt={product.title} />
      </CardImageContainer>
      <CardText>
        <div>
          <CardTitle>{truncate(product.title, 50)}</CardTitle>
          <CardContent>{truncate(product.content, 100)}</CardContent>
          <CardPrice>{product.price}</CardPrice>
          {tag && <span tw="bg-blue-500 text-white px-2 py-1 rounded text-xs">{tag}</span>}
        </div>
        <RatingAndReviews>
          <div>Rating: {product.rating}</div>
          <div>Reviews: {product.reviews}</div>
        </RatingAndReviews>
      </CardText>
    </Card>
  </CardContainer>
);

const truncate = (str, maxLength) => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};

const getBestProducts = (products) => {
  const filteredProducts = products.filter(product => {
    return product.price !== "N/A" && product.title !== "N/A" && product.image && product.link;
  });

  const validProducts = filteredProducts.map(product => ({
    ...product,
    rating: product.rating === "N/A" ? 0 : parseFloat(product.rating),
    reviews: product.reviews === "N/A" ? 0 : parseInt(product.reviews, 10),
    price: product.price
  }));

  const sortedProducts = validProducts.sort((a, b) => {
    const aScore = a.rating * 0.5 + a.reviews * 0.3 + a.price * 0.2;
    const bScore = b.rating * 0.5 + b.reviews * 0.3 + b.price * 0.2;
    return bScore - aScore;
  });
  
  return sortedProducts.slice(0, 3).map((product, index) => ({
    ...product,
    tag: index === 0 ? 'Best Buy' : index === 1 ? 'Great Value' : 'Top Choice',
  }));
};

export default ({ heading = "Compare MercadoLibre Products" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [apiResults, setApiResults] = useState([]); // To store raw API results for debugging
  const [currentBatch, setCurrentBatch] = useState(0);
  const [remainingCount, setRemainingCount] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const productsAnalyzedRef = useRef(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setHasSearched(false); // Hide the "No articles to display" label
    setSearchResults([]); // Hide the products and "Products analyzed" label
    setCurrentBatch(0);
    const results = await searchMercadoLibre(searchTerm);
    setApiResults(results); // Store raw API results for debugging
    setRemainingCount(results.length); // Set the initial count of analyzed products
    setSearchResults(getBestProducts(results));
    setHasSearched(true); // Indicate that a search has been performed
    setIsLoading(false);
  };

  const showMoreProducts = () => {
    const startIndex = (currentBatch + 1) * 3;
    const newBatch = getBestProducts(apiResults.slice(startIndex, startIndex + 3));
    setCurrentBatch(currentBatch + 1);
    setRemainingCount(apiResults.length - (currentBatch + 1) * 3); // Update the remaining count
    setSearchResults(newBatch);
    productsAnalyzedRef.current.scrollIntoView({ behavior: 'smooth' });
  };

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
              disabled={isLoading}
            />
            <SearchButton type="submit" disabled={isLoading}>
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
        {hasSearched && !isLoading && searchResults.length > 0 && (
          <>
            <div ref={productsAnalyzedRef} style={{ marginTop: "20px", padding: "10px", backgroundColor: "#e2e8f0", width: "100%", textAlign: "center" }}>
              Products analyzed: {remainingCount}
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", marginTop: "20px" }}>
              {searchResults.map((product, index) => (
                <ProductCard key={product.title} product={product} tag={product.tag} />
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button onClick={showMoreProducts} style={{ padding: "10px 20px", backgroundColor: "#4a90e2", color: "white", border: "none", borderRadius: "5px" }}>
                Not what I'm looking for? Show more
              </button>
            </div>
          </>
        )}
        {hasSearched && !isLoading && searchResults.length === 0 && (
          <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#e2e8f0", width: "100%", textAlign: "center" }}>
            No articles to display
          </div>
        )}
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};