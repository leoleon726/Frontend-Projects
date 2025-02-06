/* eslint-disable @next/next/no-img-element */

import React, { useContext } from "react";
import { LayoutContext } from "./context/layoutcontext";
import Image from "next/image";
import logoDark from "@presentation/images/logo-lehrer-dark.svg";
import logoLight from "@presentation/images/logo-lehrer-white.svg";

const AppFooter = () => {
  const { layoutConfig } = useContext(LayoutContext);

  return (
    <div className="layout-footer">
      <Image src={layoutConfig.colorScheme === "light" ? logoDark : logoLight} alt="Logo Lehrer" width={100} height={40} className="mr-2" />
      by
      <span className="font-medium ml-2">Lehrer</span>
    </div>
  );
};

export default AppFooter;
