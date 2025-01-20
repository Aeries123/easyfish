import "./header.css";
import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"
const headerElements = [
  {
    elementName:"Home",
    elementPath:"/"
  },
  {
    elementName: "About us",
    elementPath: "/about-us",
  },
  {
    elementName: "Book a Test",
    elementPath: "/book-test",
  },
  {
    elementName: "Test Menu",
    elementPath: "/test/menu",
  },
  { elementName: "Home Sample Collection", elementPath: "/sample" },
  { elementName: "Download Report", elementPath: "/reports" },
  {
    elementName: "Upload Prescription",
    elementPath: "/prescption",
  },
];
export const Header = (props) => {
  console.log("H Updated")
  const jwtToken= Cookies.get("jwtToken")
  // const e=Cookies.get("userName") 
  // console.log(e)
  // console.log(jwtToken)
  const {userName,setUserName}=props
  const [isNameVisible,setIsNameVisible]=useState(false)
  useEffect(()=>{
      // const jwtToken=Cookies.get("jwtToken")
      console.log(jwtToken)
      // setIsNameVisible(true)
      if (jwtToken!==undefined){
        setIsNameVisible(true)
      const getDetails=async ()=>{
        const getUrl="http://127.0.0.1:5000/api/get/profile"
        const options={
          method:"GET",
          headers:{
            "Authorization":`Bearer ${jwtToken}`
  
          }
          
  
  
        }
        const fetchDetails=await fetch(getUrl,options)
        try{
        if (fetchDetails.ok){
          const response=await fetchDetails.json()
          console.log(response)
          
          setUserName(response.profile.customer_name)
          
          // Cookies.set("userName",response.profile.customer_name,{expires:7})
          console.log(response.profile.customer_name)
          
  
        }
        else{
          console.error("user is not found")
        }
      }
      catch(e){
        console.log(e.message)
      }
  
      }
      getDetails()
    }
  
    },[])
  
  // jwtToken?setIsNameVisible(true):setIsNameVisible(false)
  console.log(userName)
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const onClickNavButton = () => {
    setIsMenuVisible((prev) => !prev);
  };
  console.log(isNameVisible)
  return (
    <>
      <div>
        <div className="header-img">
          <div>
            <input
              type="search"
              className="hidden-input header-input"
              id="header-input"
              placeholder="Search Tests Here"
              // className="header-input"
            />
          </div>
          <div className="header-img-content-container">
            <div style={{ display: "flex" }}>
              <img
                src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736432518/support_wcadty.png"
                height="30px"
                width="30px"
              />
              <p style={{marginLeft: "10px",fontSize:"20px"}}>914 227 1111</p>
            </div>
            {!isNameVisible?
            <button className="login-sign-up-button">
              <Link className="login-signup-link" to="/customer/login">Login/Signup</Link>

            </button>:

            <div>
              <Link to="/my-dashboard">
              <img src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1731648394/user_rw5sru.png" height="50px" width="50px"/>
              </Link>
            <p style={{color:"black"}}>{userName}</p>
            </div>}
          </div>
        </div>

        <header className="header-container">
          <div className="navbar-toggle">
            <img
              src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736163989/menu_tyorem.png"
              height="30px"
              width="30px"
              onClick={onClickNavButton}
            />
          </div>
          <div
            className={`header-elements-container ${
              isMenuVisible ? "active" : ""
            }`}
          >
            {headerElements.map((each) => (
              <Link
                to={each.elementPath}
                style={{ textDecoration: "none", color: "white" }}
              >
                <h6 key={each.elementName} className="header-elements">
                  {each.elementName}
                </h6>
              </Link>
            ))}
          </div>
          {/* <button className="btn btn-primary header-btn"> */}
          <Link to="/cart">
            <img
              src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736573349/shopping_mapkoe.png"
              height="70px"
              width="70px"
              className="cart-icon"
            />
          </Link>
          {/* </button>  */}
        </header>
      </div>
    </>
  );
};
