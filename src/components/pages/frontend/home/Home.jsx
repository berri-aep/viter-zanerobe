import React from "react";
import Header from "../partials/header";
import Footer from "../partials/Footer";
import BannerSlider from "./BannerSlider";
import NewArrival from "./NewArrival";
import FullPageLink from "./FullPageLink";
import WinterCollection from "./WinterCollection";

const Home = () => {
  return (
    <>
        <Header/>
        <BannerSlider/>
        <NewArrival/>
        <FullPageLink img="fullpage.jpg" header="in pursuit" subheader="latest collection"/>
        <WinterCollection/>
        <Footer/> 
    </>
    
  );
};

export default Home;
