import React from "react";
import { Link } from "react-router-dom";
import { Chrono } from "react-chrono";
import Services from "../Services/Services";
import Slider from "react-slick";
import FaqQuestions from "../FaqQuestions/FaqQuestions";

import {
  FaRegFlag,
  FaRegCompass,
  FaUsers,
  FaConciergeBell,
} from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import "./AboutUs.css";

const Timeline = () => {
  const items = [
    {
      title: "2005",
      cardTitle: "The Beginning",
      cardSubtitle: "Lokhandwala, Andheri West, Mumbai",
      cardDetailedText:
        "Patlabs launched its first state-of-the-art diagnostic lab and center at Lokhandwala, Andheri West, Mumbai, marking the beginning of its journey towards reliable and accurate medical diagnostics.",
    },
    {
      title: "2008",
      cardTitle: "Expansion Phase",
      cardSubtitle: "Thakur Village, Kandivali West",
      cardDetailedText:
        "Patlabs expanded its operations with a new center at Thakur Village, Kandivali West, strengthening its presence and serving more communities with advanced diagnostic services.",
    },
    {
      title: "2014",
      cardTitle: "Emerging Phase",
      cardSubtitle: "Radiology & Cardiology",
      cardDetailedText:
        "Recognizing the need for comprehensive healthcare diagnostics, Patlabs expanded its offerings from pathology services to include cutting-edge radiology and cardiology diagnostics.",
    },
    {
      title: "2016",
      cardTitle: "Expansion Outside Mumbai",
      cardSubtitle: "Pune City",
      cardDetailedText:
        "Patlabs took a significant step by opening its first center outside Mumbai in Pune City, bringing its trusted diagnostic services to a wider audience.",
    },
    {
      title: "2021",
      cardTitle: "Expansion Phase",
      cardSubtitle: "Maharashtra, Goa, Madhya Pradesh",
      cardDetailedText:
        "Patlabs rapidly expanded its footprint across Maharashtra, Goa, and Madhya Pradesh, achieving NABL and CAP certifications for its unwavering commitment to quality and excellence.",
    },
    {
      title: "2022",
      cardTitle: "Expansion Phase",
      cardSubtitle: "Maharashtra, Goa, Madhya Pradesh",
      cardDetailedText:
        "Building on its momentum, Patlabs solidified its position as a trusted name in diagnostics by expanding further in Maharashtra, Goa, and Madhya Pradesh, ensuring accessible and top-notch healthcare diagnostics.",
    },
  ];

  const stats = [
    {
      number: "200+",
      label: "Professionals",
      description: "Radiologists, Pathologists & Microbiologists",
    },
    {
      number: "50+",
      label: "Million Customers and Counting",
      description: "Trusted by Every Age Group",
    },
    {
      number: "40+",
      label: "Years of Experience",
      description: "in Delivering Quality Diagnostic Services",
    },
    {
      number: "140+",
      label: "Diagnostic Centres and Counting",
      description: "State-of-the-art Facilities with Best Customer Service",
    },
    {
      number: "20+",
      label: "Cities Across India",
      description: "India's Largest Comprehensive Diagnostic Centre",
    },
    {
      number: "250+",
      label: "Corporate Clients and Counting",
      description: "Most Preferred Diagnostic Partner",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="about-us-header-container">
        <a href="#vision-mission">
          <div className="about-us-heading-container">
            <FaRegFlag className="about-us-icons" />
            <p className="about-us-heading">Our Vision Mission</p>
          </div>
        </a>
        <a href="#our-journey">
          <div className="about-us-heading-container">
            <FaRegCompass className="about-us-icons" />

            <p className="about-us-heading">Our Journey</p>
          </div>
        </a>
        <a href="#our-director">
          <div className="about-us-heading-container">
            <FaUsers className="about-us-icons" />

            <p className="about-us-heading">Our Management</p>
          </div>
        </a>
        <a href="#our-services">
          <div className="about-us-heading-container">
            <MdMedicalServices className="about-us-icons" />

            <p className="about-us-heading">Our Services</p>
          </div>
        </a>
      </div>

      <div className="timeline-container">
        <div>
          <div className="aboutus-image-container">
            <img
              src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736490752/about-banner_n82wjj.webp"
              alt="about"
              className="aboutus-image"
            />
          </div>
          <div className="about-timeline-container">
            <h1 className="about-us-main-heading">
              Access Pathlabs is one of India’s Leading Diagnostic Centre
              Networks.
            </h1>
            <p className="aboutus-main-description">
              We are a health-first diagnostic center that has 125
              state-of-the-art diagnostic centers located in 20 Indian cities.
              All the diagnostic centres brandishing our banner have
              NABL-certified diagnostic labs. Each diagnostic centre is headed
              by India’s best certified, skilled and experienced personnel. We
              have an in-house team that consists of 2200+ professionals. Our
              in-house team consist of India’s top pathologists, radiologists,
              and microbiologists. We periodically send a small team of our
              in-house healthcare professionals to every diagnostic centre
              scattered all over India to train and retrain the professionals at
              that centre. This team of healthcare professionals are also sent
              occasionally without prior notice to ensure that our diagnostic
              centres are upholding the quality standards we have set to ensure
              the deliverance of international-grade diagnostic services.
            </p>
          </div>
        </div>

        <div id="vision-mission" className="vision-mission-container">
          <div className="about-timeline-container-2">
            <h1 className="values-heading">About Us</h1>
            <p id="values-description">
              The story of Access Pathlabs is much like any other healthcare
              institution in India. We deliver innovative, comprehensive and
              high-quality diagnostic services at reasonable rates. Access
              Pathlabs Limited is the brainchild of Dr . We opened up our doors
              back in 1981 and for the last 4+ decades; we have had the
              privilege to become one of the top-rated diagnostic centre chains
              in India. We are dedicated to people who choose us to avail our
              quality-assured diagnostic services.
            </p>
          </div>
          <div className="vision-mission-section">
            <div className="vision-section">
              <div className="vision-icon-container">
                {/* <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-12 h-12 text-yellow-400 fill-current vision-mission-icons"
                  >
                    <path d="M12 2.5c-1.5 0-2.7 1.2-2.7 2.7v8.2c0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7V5.2c0-1.5-1.2-2.7-2.7-2.7zm0 15.3c-2.4 0-4.4-2-4.4-4.4V5.2c0-2.4 2-4.4 4.4-4.4s4.4 2 4.4 4.4v8.2c0 2.4-2 4.4-4.4 4.4zm7.3-4.4c0 4-3.3 7.3-7.3 7.3s-7.3-3.3-7.3-7.3h1.6c0 3.1 2.5 5.7 5.7 5.7s5.7-2.5 5.7-5.7h1.6z" />
                  </svg>
                </div> */}
              </div>
              <h2 className="vision-title">OUR VISION</h2>
              <p className="vision-description text-gray-600">
                Be the most trusted healthcare partner, enabling healthier lives
                by delivering accurate, reliable, and timely diagnostic
                solutions, fostering a commitment to excellence, innovation, and
                compassionate care.
              </p>
            </div>

            {/* Mission Section */}
            <div className="mission-section">
              <div className="mission-icon-container">
                {/* <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-12 h-12 text-blue-600 fill-current"
                  >
                    <path d="M19.5 10c0-3.3-2.7-6-6-6s-6 2.7-6 6c0 2.9 2.1 5.3 4.8 5.9v3.1c0 .6.4 1 1 1s1-.4 1-1v-3.1c2.7-.6 4.8-3 4.8-5.9zm-6 4c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
                    <path d="M12 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
                  </svg>
                </div> */}
              </div>
              <h2 className="mission-title">OUR MISSION</h2>
              <p className="mission-description">
                To be the undisputed market leader by providing accessible,
                affordable, timely and quality healthcare diagnostics, applying
                insights and cutting edge technology to create value for all
                stakeholders.
              </p>
            </div>
          </div>
        </div>

        <div id="our-journey" className="about-journey-main-container">
          <div className="about-journey-container">
            <h2 className="timeline-heading">Our Journey</h2>
            <Chrono
              items={items}
              mode="VERTICAL"
              cardHeight={150}
              scrollable
              slideShow={true}
              theme={{
                primary: "#6a0dad",
                secondary: "#F0F4F7",
                cardBgColor: "#ffffff",
                cardForeColor: "#6a0dad",
                titleColor: "#6a0dad",
              }}
              cardCustomClasses={{
                card: "timeline-card",
                cardTitle: "timeline-card-title",
                cardSubtitle: "timeline-card-subtitle",
              }}
            />
          </div>
        </div>

        <div id="our-values" className="values-container">
          <h1 className="values-heading">Our Values</h1>
          <div className="values-images">
            <div className="value-card">
              <img
                src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736447260/integrity_nphltn.jpg"
                alt="Value 1"
                className="value-image"
              />
              <h2 className="values-sub-heading">Integrity</h2>
              <p className="values-description">
                We adhere to the highest standards of honesty and transparency,
                ensuring accurate and reliable results with ethical
                responsibility.
              </p>
            </div>
            <div className="value-card">
              <img
                src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736447276/innovation_dljzjt.jpg"
                alt="Value 2"
                className="value-image"
              />
              <h1 className="values-sub-heading">Innovation</h1>
              <p className="values-description">
                We embrace cutting-edge technologies to provide advanced
                diagnostic solutions, empowering better health decisions.
              </p>
            </div>
            <div className="value-card">
              <img
                src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736447276/quality_kih4du.jpg"
                alt="Value 3"
                className="value-image"
              />
              <h1 className="values-sub-heading">Quality</h1>
              <p className="values-description">
                We are committed to delivering precise and reliable results
                through rigorous quality assurance and state-of-the-art
                equipment.
              </p>
            </div>
            <div className="value-card">
              <img
                src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736447276/customer-centric_dto55a.jpg"
                alt="Value 4"
                className="value-image"
              />
              <h1 className="values-sub-heading">Customer-Centric</h1>
              <p className="values-description">
                We focus on providing personalized care and seamless service,
                ensuring a compassionate and accessible healthcare experience
                for all patients.
              </p>
            </div>
          </div>
        </div>

        <div id="our-director" className="about-us-our-team-container">
          <h1 className="values-heading">Our Management</h1>
          <div className="about-us-our-team-images-container">
            <div className="about-us-our-team-image-container">
              <img
                className="about-us-our-team-image"
                src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736427737/team_shgiay.jpg"
                alt="team"
              />
              <h1 className="team-heading">Director</h1>
            </div>
            <div className="about-us-our-team-image-container">
              <img
                className="about-us-our-team-image"
                src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736427737/team_shgiay.jpg"
                alt="team"
              />
              <h1 className="team-heading">Director</h1>
            </div>
            <div className="about-us-our-team-image-container">
              <img
                className="about-us-our-team-image"
                src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736427737/team_shgiay.jpg"
                alt="team"
              />
              <h1 className="team-heading">Manager</h1>
            </div>
            <div className="about-us-our-team-image-container">
              <img
                className="about-us-our-team-image"
                src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736427737/team_shgiay.jpg"
                alt="team"
              />
              <h1 className="team-heading">Manager</h1>
            </div>
          </div>
        </div>

        <div id="our-services" className="services-container">
          <Services />
        </div>

        <div>
          <div className="healthcare-stats">
            <h1>INDIA'S LARGEST HEALTHCARE PLATFORM</h1>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div className="stat-card" key={index}>
                  <h2 className="stat-card-main-heading">{stat.number}</h2>
                  <h3 className="stat-card-sub-heading">{stat.label}</h3>
                  <p className="stat-card-description">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <FaqQuestions /> */}
      </div>
    </>
  );
};

export default Timeline;
