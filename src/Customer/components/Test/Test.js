import React from "react";
import Banner from "../Banner/Banner";
import SearchBar from "../SearchBar/SearchBar";

const Test = (props) => {
  const {testsData,setCartData,cartData}=props
  console.log("test data",testsData)
  return (
    <div>
      <Banner testData={testsData} setCartData={setCartData} cartData={cartData}/>
      
      {/* <SearchBar /> */}
    </div>
  );
};

export default Test;