import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/header.js";
import TabGrid from "components/cards/TabCardGrid.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

export default () => {
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const imageCss = tw`rounded-4xl`;
  return (
    <AnimationRevealPage>
      <Header />
      <TabGrid
        heading={
          <>
            Checkout our <HighlightedText>Products.</HighlightedText>
          </>
        }
      />
      <Footer />
    </AnimationRevealPage>
  );
}
