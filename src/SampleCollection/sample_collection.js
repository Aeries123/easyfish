import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Import Bootstrap JS
import "./sample_collection.css";

function Samplecollection() {
  const [showExtraContent, setShowExtraContent] = useState(false); // State to toggle visibility

  const handleReadMoreClick = () => {
    setShowExtraContent(!showExtraContent); // Toggle the visibility
  };

  return (
    <div className="container-fluid">
      <div className="sample-main-container">
        <div className="row">
          <h1 className="head text-center text-purple underline">
            Book Lab Test at Home
          </h1>
        </div>
        <div className="sample-card-container">
          <div className="row">
            <div className="col-md-8">
              <p>
                Many people are put off by the concept of waiting in line for
                hours at a diagnostic lab or hospital or, at the very least,
                postponing diagnostic lab tests.
              </p>
              <p>
                Vijaya Diagnostic Centre recognises the value of health tests
                and recognises the need to make diagnostic services more
                convenient and user-friendly, hence Vijaya Diagnostic Centre
                provides a Home Sample Collection service to get tested at home.
              </p>
              <p>
                After getting a call or receiving a home sample collection
                request from customers, our medically certified professional
                arrives at the customer's door to collect blood test samples.
              </p>
              <p>
                Reports are submitted via WhatsApp and text messages and can
                even be picked up at our centre. Now you can download blood test
                reports at home.
              </p>
            </div>

            <div className="col-md-4 d-flex justify-content-center border border-purple p-3">
              <div className="w-75">
                <h5 className="text-center mb-4 text-purple">Enquiry Form</h5>
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control border-purple"
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control border-purple"
                      placeholder="Mobile Number"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control border-purple"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control border-purple"
                      placeholder="Enquiry"
                      rows="3"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-purple w-100">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 sample-card-data">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-purple text-center">
              What is a Home Blood Collection Test?
            </h2>

            <p className="mt-4">
              A home blood collection test is a convenient way to get your blood
              drawn from the comfort of your own home. A healthcare professional
              will schedule a time for a trained phlebotomist to visit you. The
              phlebotomist will collect your blood sample using sterile
              equipment and send it to a lab for analysis.
            </p>

            <h5 className="mt-4">
              Here are some situations where home blood collection tests might
              be beneficial:
            </h5>
            <ul>
              <li>
                If you have limited mobility or difficulty traveling to a clinic
                or lab due to illness, injury, or disability.
              </li>
              <li>
                For those with hectic schedules, home blood collection
                eliminates the need to schedule an appointment and travel to a
                lab.
              </li>
              <li>
                A familiar home environment can be less anxiety-provoking for
                individuals with a fear of needles.
              </li>
            </ul>

            <h5 className="mt-4">
              Beyond blood tests, several other home testing options or home
              sample collection options are available, offering a wider net for
              monitoring your health. Here are a few examples:
            </h5>
            <ul>
              <li>
                Swab tests which can be used to screen for allergies, infections
                like COVID-19, or strep throat.
              </li>
              <li>
                Urine tests which can be used to detect urinary tract problems,
                monitor conditions such as diabetes, and screen for pregnancy or
                drug abuse.
              </li>
              <li>
                Stool tests which can be helpful in diagnosing digestive
                problems or identifying parasites.
              </li>
              <li>
                Sputum samples for tuberculosis (TB) testing and respiratory
                tract infection can be collected at home with proper
                instructions.
              </li>
            </ul>

            {/* Read More Button */}
            <button
              className="btn btn-purple mt-4 d-flex justify-content-center align-items-center mx-auto"
              onClick={handleReadMoreClick}
            >
              {showExtraContent ? "Read Less" : "Read More"}
            </button>

            {/* Extra Content */}
            {showExtraContent && (
              <div className="mt-4">
                <h3>How does at-home blood testing work?</h3>
                <p>
                  At Vijaya Diagnostics, we understand that convenience
                  shouldn't compromise quality. That's why our home lab sample
                  collection process is designed to be easy, safe, and
                  efficient, ensuring the integrity of your sample and
                  delivering reliable results quickly.
                </p>
                <p>
                  Scheduling a home blood collection with Vijaya Diagnostics
                  just takes seconds! Simply book your test online or through
                  our app, and our trained and certified phlebotomists will be
                  dispatched directly to your doorstep. Best of all, you can
                  expect them to arrive as soon as possible or at your precisely
                  scheduled time, ensuring a convenient and stress-free
                  experience.
                </p>
                <p>
                  Our phlebotomists will show you the clearly marked
                  manufactured and expiry dates on the branded, sealed and
                  sterilized single-use kits before starting the home blood
                  sample collection process. The clearly marked manufactured and
                  expiry dates provide transparency and peace of mind.
                </p>
                <p>
                  Immediately after the home sample collection, our focus is
                  getting your sample back to the lab for processing as quickly
                  as possible. Our dedicated logistics team is your silent
                  partner in speed!
                </p>
                <p>
                  Rest assured, we adhere to strict NABL guidelines for proper
                  storage and transportation of your sample. Digital loggers
                  continuously monitor temperature throughout the entire
                  process, guaranteeing optimal conditions.
                </p>
                <p>
                  The collected samples reach our state-of-the-art ISO
                  Certified, NABL and NABH Accredited labs within 2 hours of
                  collection, minimizing wait times and expediting analysis.
                </p>
                <p>
                  Our commitment to speed and accuracy extends beyond the
                  collection process. Automated sorting systems help streamline
                  the handling of samples, ensuring they are efficiently
                  directed to the appropriate department for analysis, such as
                  Biochemistry or Microbiology. Cutting-edge equipment then
                  facilitates the analysis process, enabling accurate and timely
                  results. This integration of technology helps minimize delays
                  and ensures that samples are processed efficiently,
                  contributing to both the speed and accuracy of diagnostic
                  testing.
                </p>

                {/* More content... */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Samplecollection;
