import React from "react";
import Banner from "../Banner/Banner";
import SearchBar from "../SearchBar/SearchBar";

const Test = (props) => {
  const {testsData,setCartData,cartData,clickedIds,setClickedIds}=props
  console.log("test data",testsData)
  return (
    <div>
      <Banner testData={testsData} setCartData={setCartData} cartData={cartData} clickedIds={clickedIds} setClickedIds={setClickedIds}/>
      
      {/* <SearchBar /> */}
    </div>
  );
};

export default Test;