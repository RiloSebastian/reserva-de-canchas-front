import * as React from "react";
import AppAppBar from "./modules/views/AppAppBar";
import ProductHero from "./modules/views/ProductHero";
import withRoot from "./modules/withRoot";

const HomePage = () => {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />

      {/*
       <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
        <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
        */}
    </React.Fragment>
  );
};

export default withRoot(HomePage);
