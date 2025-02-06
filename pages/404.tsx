import React from "react";
import NotFound from "../pages/pages/notfound/index";
import { Page } from "@utils/types/types";

const Custom404: Page = () => {
  return <NotFound />;
};

Custom404.getLayout = function getLayout(page) {
  return page;
};

export default Custom404;
