import React from "react";
import Footer from "./Footer";

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="page-wrapper">
    {children}
    <Footer />
  </div>
);

export default PageWrapper;
