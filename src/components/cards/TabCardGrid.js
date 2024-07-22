import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-purple-500 text-white bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
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

export default ({
  heading = "Checkout the Products",
  tabs = {
    Top: getRandomCards(),
    Kitchen: [
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/71U8zXqhAPL._AC_SL1500_.jpg",
        title: "CHEFMAN Multifunctional Digital Air Fryer",
        content: "Rotisserie, Dehydrator, Convection Oven, 17 Touch Screen Presets Fry, Roast, Dehydrate, Bake, XL 10L Family Size, Auto Shutoff, Large Easy-View Window, Black",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/4fdZCZo"
      },
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/51dDd7k1OGL._AC_SL1000_.jpg",
        title: "COSORI Air Fryer Compact 5 Qt",
        content: "Max 450F for Juicy Meat, 9-in-1 with 130+ Nutrition Facts Included In-App & Paper Recipes for Quick Meal, Little to No Oil, Dishwasher Safe, Perfect for Small Family",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/4dbrOL0"
      }
      ,
      {
        imageSrc:"https://m.media-amazon.com/images/I/71J+Mv115IL._AC_SL1500_.jpg",
        title: "Aucma Stand Mixer,6.5-QT 660W 6",
        content: "Speed Tilt-Head Food Mixer, Kitchen Electric Mixer with Dough Hook, Wire Whip & Beater (6.5QT, Blue)",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/4fmGOaK"
      },
      {
        imageSrc:"https://m.media-amazon.com/images/I/61eqNRPW8mL._AC_SL1500_.jpg",
        title: "Kitchen Mama Auto Electric Can Opener",
        content: "Open Your Cans with A Simple Press of Button - Automatic, Hands Free, Smooth Edge, Food-Safe, Battery Operated, YES YOU CAN (Red)",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/3ShSf9L"
      }

    ],
    LivingRoom: [
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/619pHvEWo2L._AC_SL1500_.jpg",
        title: "【Upgraded】 Dimmable Floor Lamp",
        content: "1000 Lumens LED Edison Bulb Included, Arc Floor Lamps for Living Room Modern Standing Lamp with Linen Shade, Tall Lamp for Bedroom Office Dining Room- Black",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/3zOdCct"
      },
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/61eAl8qHCeL._AC_SL1500_.jpg",
        title: "Govee Floor Lamp",
        content: "Amazon Echo Show 5 (3rd Gen, 2023 release) | Smart display with 2x the bass and clearer sound | Charcoal",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/3WrL6pN"
      }
      ,
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/81O2z26JxIL._AC_SL1500_.jpg",
        title: "Modular Sectional Sofa",
        content: "Convertible U Shaped Sofa Couch with Storage, Flexible Modular Combinations Fabric Couch for Living Room",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/3WteRGy"
      }
      ,
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/81Hi60HNmcL._AC_SY879_.jpg",
        title: "Dreo Tower Fan 42 Inch",
        content: "Cruiser Pro T1 Quiet Oscillating Bladeless Fan with Remote, 6 Speeds, 4 Modes, LED Display, 12H Timer, Black Floor Standing Fan Powerful for Indoor Home Bedroom Office Room",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/3Wf8R2W"
      }
      ,
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/81THdTJBa1L._AC_SL1500_.jpg",
        title: "TCL 65-Inch Q65",
        content: "QLED 4K UHD Smart TV with Google TV (65Q651G, 2024 Model) Dolby Vision, Dolby Atmos, HDR Pro+, Game Accelerator Enhanced Gaming, Voice Remote, Works with Alexa, Streaming Television",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/46blZuG"
      }
      ,
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/71eJ+7YGeEL._AC_SL1500_.jpg",
        title: "CHYING Modern Pendant Light",
        content: " Dimmable LED 3-Leaves Irregular Ring Chandeliers 59 inch 44W 3080LM with Remote Control Adjustable Hanging Ceiling Lamp Fixture for Living Room Bedroom Dining Room",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/3SbWkfu"
      }
      ,
      {
        imageSrc:"https://m.media-amazon.com/images/I/71qqUx2NgGL._AC_SL1500_.jpg",
        title: "Clikuutory TV Stand",
        content: "with Large Storage Drawer for 50 55 60 65 70 75 Inch TVs, Black Wood TV Console with High Glossy Entertainment Center for Living Room, Bedroom, Black",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/3Wv1tll"
      }
      ,
      {
        imageSrc:"https://m.media-amazon.com/images/I/71oKQFUZfEL._AC_SL1500_.jpg",
        title: "POVISON TV Stand",
        content: "Assembly-Free Black TV Console for 65+ Inch TV, 70 Inch Slatted Wood Media Console with Storage for Living Room Bedroom, Tall TV Cabinet with Door & Metal Legs",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/3WfpKuB"
      }
      ,
      {
        imageSrc:"https://m.media-amazon.com/images/I/71Rg4IY3ikL._AC_SL1500_.jpg",
        title: "LED Desk Lamp for Home Office",
        content: "Remote Control Computer Desk Light Bright Table Lamp for Study Dimmable Desk Lighting with Clamp Adjustable Gooseneck, Double Head, 24W, Black",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/3Lxq2YA"
      }
      ,
      {
        imageSrc:"https://m.media-amazon.com/images/I/61bCXAJJg0L._AC_SL1500_.jpg",
        title: "Modern Chandelier",
        content: "Dimmable LED Pendant Light, Ring Chandelier for Living Room, Dining Room, Kitchen, Bedroom 39IN",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/3Y6uxAZ"
      }
    ],
    Portable: [
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/71d-khbgPLL._AC_SL1500_.jpg",
        title: "Ortizan Portable Bluetooth Speakers",
        content: "IPX7 Waterproof Wireless Speaker with 24W Loud Stereo Sound, Deep Bass, Bluetooth 5.3, RGB Lights, Dual Pairing, 30H Playtime for Home, Outdoor, Party, Beach",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/3SeNvBK"
      },
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/719UTf1RdPL._AC_SL1500_.jpg",
        title: "Tranquillo Ultimate Relaxation Portable Hammock Stand",
        content: "Foldable Hammock Stand with Canvas Hammock, Spreader Bar, Quick Fold Unfold in 30 Seconds Steel Frame Hammock 600 lbs Capacity, White/Blue",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/4cNdBnt"
      },
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/41KZtzhlK+L._AC_SL1500_.jpg",
        title: "Apple Magic Trackpad",
        content: "Wireless, Bluetooth, Rechargeable. Works with Mac or iPad; Multi-Touch Surface - White",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/3Wrh4m2"
      },
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/61oGAG5r7cL._AC_SL1500_.jpg",
        title: "JBL Tune 510BT",
        content: "Wireless On-Ear Headphones with Purebass Sound - Black",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/3LyYzG5"
      },
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/51Zfe-W-LSL._AC_SL1200_.jpg",
        title: "Tile Starter Pack",
        content: "Wireless On-Ear Headphones with Purebass Sound - Black",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/3Yc27FU"
      },
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/71BXvnYyDqL._AC_SL1500_.jpg",
        title: "Ultra Open Earbuds",
        content: "Comfort Clip-On Wireless Bluetooth 5.3 Earbuds for Sports, Waterproof Fitness Headphones for Running, Designed for Small Ears",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/4cNhMzF"
      },
      {
        imageSrc:
          "https://m.media-amazon.com/images/I/81sTVIqPynL._AC_SX679_.jpg",
        title: "Anker Soundcore 2 Portable",
        content: "Bluetooth Speaker with 12W Stereo Sound, Bluetooth 5, Bassup, IPX7 Waterproof, 24-Hour Playtime, Wireless Stereo Pairing, Speaker for Home, Outdoors, Travel",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://amzn.to/4bLldWo"
      }
    ],
  }
}) => {
  /*
   * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
   * as the key and value of the key will be its content (as an array of objects).
   * To see what attributes are configurable of each object inside this array see the example above for "Starters".
   */
  const tabsKeys = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(tabsKeys[0]);

  return (
    <Container>
      <ContentWithPaddingXl>
        <Header>{heading}</Header>
        <HeaderRow>
          <div>Search </div>
          <TabsControl>
            {Object.keys(tabs).map((tabName, index) => (
              <TabControl key={index} active={activeTab === tabName} onClick={() => setActiveTab(tabName)}>
                {tabName}
              </TabControl>
            ))}
          </TabsControl>
        </HeaderRow>

        {tabsKeys.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale:1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale:0.8,
                display: "none",
              }
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? "current" : "hidden"}
            animate={activeTab === tabKey ? "current" : "hidden"}
          >
            {tabs[tabKey].map((card, index) => (
              <CardContainer key={index}>
                <Card className="group" href={card.url} initial="rest" whileHover="hover" animate="rest">
                  <CardImageContainer imageSrc={card.imageSrc}>
                    <CardRatingContainer>
                      Buy Now
                    </CardRatingContainer>
                  </CardImageContainer>
                  <CardText>
                    <CardTitle>{card.title}</CardTitle>
                    <CardContent>{card.content}</CardContent>
                  </CardText>
                </Card>
              </CardContainer>
            ))}
          </TabContent>
        ))}
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};

const getRandomCards = () => {
  const cards = [
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/61eAl8qHCeL._AC_SL1500_.jpg",
      title: "Govee Floor Lamp",
      content: "Govee Floor Lamp 2 with Matter, RGBIC Warm Cool White LED Floor Lamp Works with Alexa, 1725lm Corner Floor Lamp with Music Sync, Scene Modes, Smart Floor Lamp for Bedroom, Living Room, Studio, Black",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/46aC6Zq"
    },
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/71j-zo5SuhL._AC_SL1000_.jpg",
      title: "Govee Floor Lamp",
      content: "Amazon Echo Show 5 (3rd Gen, 2023 release) | Smart display with 2x the bass and clearer sound | Charcoal",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/3WrL6pN"
    },
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/71d-khbgPLL._AC_SL1500_.jpg",
      title: "Ortizan Portable Bluetooth Speakers",
      content: "IPX7 Waterproof Wireless Speaker with 24W Loud Stereo Sound, Deep Bass, Bluetooth 5.3, RGB Lights, Dual Pairing, 30H Playtime for Home, Outdoor, Party, Beach",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/3SeNvBK"
    },
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/719UTf1RdPL._AC_SL1500_.jpg",
      title: "Tranquillo Ultimate Relaxation Portable Hammock Stand",
      content: "Foldable Hammock Stand with Canvas Hammock, Spreader Bar, Quick Fold Unfold in 30 Seconds Steel Frame Hammock 600 lbs Capacity, White/Blue",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/4cNdBnt"
    },
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/41KZtzhlK+L._AC_SL1500_.jpg",
      title: "Apple Magic Trackpad",
      content: "Wireless, Bluetooth, Rechargeable. Works with Mac or iPad; Multi-Touch Surface - White",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/3Wrh4m2"
    },
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/61oGAG5r7cL._AC_SL1500_.jpg",
      title: "JBL Tune 510BT",
      content: "Wireless On-Ear Headphones with Purebass Sound - Black",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/3LyYzG5"
    },
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/51Zfe-W-LSL._AC_SL1200_.jpg",
      title: "Tile Starter Pack",
      content: "Wireless On-Ear Headphones with Purebass Sound - Black",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/3Yc27FU"
    },
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/71BXvnYyDqL._AC_SL1500_.jpg",
      title: "Ultra Open Earbuds",
      content: "Comfort Clip-On Wireless Bluetooth 5.3 Earbuds for Sports, Waterproof Fitness Headphones for Running, Designed for Small Ears",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/4cNhMzF"
    },
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/81sTVIqPynL._AC_SX679_.jpg",
      title: "Anker Soundcore 2 Portable",
      content: "Bluetooth Speaker with 12W Stereo Sound, Bluetooth 5, Bassup, IPX7 Waterproof, 24-Hour Playtime, Wireless Stereo Pairing, Speaker for Home, Outdoors, Travel",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/4bLldWo"
    },
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/619pHvEWo2L._AC_SL1500_.jpg",
      title: "【Upgraded】 Dimmable Floor Lamp",
      content: "1000 Lumens LED Edison Bulb Included, Arc Floor Lamps for Living Room Modern Standing Lamp with Linen Shade, Tall Lamp for Bedroom Office Dining Room- Black",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/3zOdCct"
    }
    ,
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/81O2z26JxIL._AC_SL1500_.jpg",
      title: "Modular Sectional Sofa",
      content: "Convertible U Shaped Sofa Couch with Storage, Flexible Modular Combinations Fabric Couch for Living Room",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/3WteRGy"
    }
    ,
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/81Hi60HNmcL._AC_SY879_.jpg",
      title: "Dreo Tower Fan 42 Inch",
      content: "Cruiser Pro T1 Quiet Oscillating Bladeless Fan with Remote, 6 Speeds, 4 Modes, LED Display, 12H Timer, Black Floor Standing Fan Powerful for Indoor Home Bedroom Office Room",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/3Wf8R2W"
    }
    ,
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/81THdTJBa1L._AC_SL1500_.jpg",
      title: "TCL 65-Inch Q65",
      content: "QLED 4K UHD Smart TV with Google TV (65Q651G, 2024 Model) Dolby Vision, Dolby Atmos, HDR Pro+, Game Accelerator Enhanced Gaming, Voice Remote, Works with Alexa, Streaming Television",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/46blZuG"
    }
    ,
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/71eJ+7YGeEL._AC_SL1500_.jpg",
      title: "CHYING Modern Pendant Light",
      content: " Dimmable LED 3-Leaves Irregular Ring Chandeliers 59 inch 44W 3080LM with Remote Control Adjustable Hanging Ceiling Lamp Fixture for Living Room Bedroom Dining Room",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/3SbWkfu"
    }
    ,
    {
      imageSrc:"https://m.media-amazon.com/images/I/71qqUx2NgGL._AC_SL1500_.jpg",
      title: "Clikuutory TV Stand",
      content: "with Large Storage Drawer for 50 55 60 65 70 75 Inch TVs, Black Wood TV Console with High Glossy Entertainment Center for Living Room, Bedroom, Black",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/3Wv1tll"
    }
    ,
    {
      imageSrc:"https://m.media-amazon.com/images/I/71oKQFUZfEL._AC_SL1500_.jpg",
      title: "POVISON TV Stand",
      content: "Assembly-Free Black TV Console for 65+ Inch TV, 70 Inch Slatted Wood Media Console with Storage for Living Room Bedroom, Tall TV Cabinet with Door & Metal Legs",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/3WfpKuB"
    }
    ,
    {
      imageSrc:"https://m.media-amazon.com/images/I/71Rg4IY3ikL._AC_SL1500_.jpg",
      title: "LED Desk Lamp for Home Office",
      content: "Remote Control Computer Desk Light Bright Table Lamp for Study Dimmable Desk Lighting with Clamp Adjustable Gooseneck, Double Head, 24W, Black",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/3Lxq2YA"
    }
    ,
    {
      imageSrc:"https://m.media-amazon.com/images/I/61bCXAJJg0L._AC_SL1500_.jpg",
      title: "Modern Chandelier",
      content: "Dimmable LED Pendant Light, Ring Chandelier for Living Room, Dining Room, Kitchen, Bedroom 39IN",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/3Y6uxAZ"
    },
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/71U8zXqhAPL._AC_SL1500_.jpg",
      title: "CHEFMAN Multifunctional Digital Air Fryer",
      content: "Rotisserie, Dehydrator, Convection Oven, 17 Touch Screen Presets Fry, Roast, Dehydrate, Bake, XL 10L Family Size, Auto Shutoff, Large Easy-View Window, Black",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/4fdZCZo"
    },
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/51dDd7k1OGL._AC_SL1000_.jpg",
      title: "COSORI Air Fryer Compact 5 Qt",
      content: "Max 450F for Juicy Meat, 9-in-1 with 130+ Nutrition Facts Included In-App & Paper Recipes for Quick Meal, Little to No Oil, Dishwasher Safe, Perfect for Small Family",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/4dbrOL0"
    }
    ,
    {
      imageSrc:"https://m.media-amazon.com/images/I/71J+Mv115IL._AC_SL1500_.jpg",
      title: "Aucma Stand Mixer,6.5-QT 660W 6",
      content: "Speed Tilt-Head Food Mixer, Kitchen Electric Mixer with Dough Hook, Wire Whip & Beater (6.5QT, Blue)",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/4fmGOaK"
    }
    ,
    {
      imageSrc:"https://m.media-amazon.com/images/I/61eqNRPW8mL._AC_SL1500_.jpg",
      title: "Kitchen Mama Auto Electric Can Opener",
      content: "Open Your Cans with A Simple Press of Button - Automatic, Hands Free, Smooth Edge, Food-Safe, Battery Operated, YES YOU CAN (Red)",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "https://amzn.to/3ShSf9L"
    }
  ];

  // Shuffle array
  return cards.sort(() => Math.random() - 0.5);
};