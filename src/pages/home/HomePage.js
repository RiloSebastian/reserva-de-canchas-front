import * as React from "react";
import AppFooter from "../../components/footer/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import ProductHero from "./modules/views/ProductHero";
import withRoot from "./modules/withRoot";

const HomePage = () => {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
    </React.Fragment>
  );
};

export default withRoot(HomePage);
