import React,{useState} from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "./customersignup.css";

const CustomerSignup = () => {
  const [userDetails,setUserDetails]=useState({
    userName:"",
    userMobileNumber:"",
    userPassword:"",
    userGender:"",

  })
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const onChangeUserName=e=>{
    setUserDetails({
      ...userDetails,userName:e.target.value
    })
  }
  const onChangeUserMobileNumber=e=>{
    setUserDetails({
      ...userDetails,userMobileNumber:e.target.value
    })
  }
const onChangeUserPassword=e=>{
  setUserDetails({
    ...userDetails,userPassword:e.target.value
  })
}
const onChangeGender=e=>{
  setUserDetails({
    ...userDetails,userGender:e.target.value
  })
}
const onClickSubmit=async(e)=>{
  e.preventDefault()
  const registeredUrl="http://localhost:5000//api/customers/register"
  const options={
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json",
      

    },
    body:JSON.stringify({
      customer_name:userDetails.userName,
      password:userDetails.userPassword,
      phone:userDetails.userMobileNumber,
      gender:userDetails.userGender
    })
  }
  const response=await fetch(registeredUrl,options)
  console.log(response)
  try{
    if (response.ok){
      const postedData=await response.text()
      
      alert(`successfullly posted`)
    }
    else{
      alert("Not Posted")
    }
  }
  catch(e){
    alert(e.message)
  }

}
  return (
    <div className="signup-main-container">
      <div className="signup-slider-container">
        <Slider {...sliderSettings}>
          <div className="signup-slider-image-container">
            <img
              src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736427737/team_shgiay.jpg"
              alt="Slide 1"
              className="signup-images"
            />
          </div>
          <div className="signup-slider-image-container">
            <img
              src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736427737/team_shgiay.jpg"
              alt="Slide 2"
              className="signup-images"
            />
          </div>
        </Slider>
      </div>

      <div className="signup-form-container">
        <h2 className="signup-sub-heading">Sign Up</h2>
        <p className="signup-description">
          View your reports and upcoming health checkups at one place.
        </p>
        <form className="signup-form-container" onSubmit={onClickSubmit}>
          <label className="signup-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="signup-input"
            value={userDetails.userName}
            onChange={onChangeUserName}
          />

          <label className="signup-label" htmlFor="mobile">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            placeholder="Enter mobile number"
            className="signup-input"
            value={userDetails.userMobileNumber}
            onChange={onChangeUserMobileNumber}
          />

          <label className="signup-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="signup-input"
            value={userDetails.userPassword}
            onChange={onChangeUserPassword}
          />

          <label className="signup-label" htmlFor="sex">
            Gender
          </label>
          <select id="sex" name="sex" className="signup-input" value={userDetails.userGender} onChange={onChangeGender}>
            <option value="" disabled selected hidden>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="login-alternate">
          Already have an account?{" "}
          <Link to="/customer/login">Login Here</Link>
        </p>
        <p className="signup-terms">
          By proceeding, you agree to Access Path Labs T&C and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default CustomerSignup;
