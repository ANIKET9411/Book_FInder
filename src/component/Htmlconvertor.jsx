import React from "react";

const Htmlconvertor = ({ htmlContent }) => {
  return (
    <div
      className="h-[90%]  w-[90%] mx-auto  p-[2%] overflow-scroll mb-16 lg:mb-0 md:mb-0"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default Htmlconvertor;
