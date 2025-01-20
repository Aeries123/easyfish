import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TestsForm = () => {
  const [formData, setFormData] = useState({
    test_name: "",
    description: "",
    price: "",
    preparation_instructions: "",
    test_code: "",
    sample_type: "",
    visit_type: "",
    parameters: "",
    duration: "",
    status: "",
    speciality: "",
    category_id: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // Here, you would typically send the form data to an API or a server
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Create Test</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6">
            <div className="form-group">
              <label>Test Name</label>
              <input
                type="text"
                className="form-control"
                name="test_name"
                value={formData.test_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label>Test Code</label>
              <input
                type="number"
                className="form-control"
                name="test_code"
                value={formData.test_code}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Sample Type</label>
              <textarea
                className="form-control"
                name="sample_type"
                value={formData.sample_type}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Visit Type</label>
              <textarea
                className="form-control"
                name="visit_type"
                value={formData.visit_type}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                className="form-control"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Preparation Instructions</label>
              <textarea
                className="form-control"
                name="preparation_instructions"
                value={formData.preparation_instructions}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Parameters</label>
              <textarea
                className="form-control"
                name="parameters"
                value={formData.parameters}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                className="form-control"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="form-group">
              <label>Speciality</label>
              <input
                type="text"
                className="form-control"
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category ID</label>
              <input
                type="number"
                className="form-control"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
       
        <div className="form-group col-md-12 text-center mt-4">
            <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>Submit</button>
          </div>
      </form>
    </div>
  );
};

export default TestsForm;





// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min'; 
// import './tests.css'; // Import custom CSS file

// // Array with test image and test name
// const testArray = [
//     { id: 1, name: "Blood Test", image: "https://res.cloudinary.com/dkujcnlcs/image/upload/v1736244083/esxulmxd2la2di93ytgv.jpg" },
//     { id: 2, name: "X-Ray", image: "https://res.cloudinary.com/dkujcnlcs/image/upload/v1736244083/esxulmxd2la2di93ytgv.jpg" },
//     { id: 3, name: "MRI Scan", image: "https://res.cloudinary.com/dkujcnlcs/image/upload/v1736244083/esxulmxd2la2di93ytgv.jpg" },
//     { id: 4, name: "CT Scan", image: "https://res.cloudinary.com/dkujcnlcs/image/upload/v1736244083/esxulmxd2la2di93ytgv.jpg" },
//     { id: 5, name: "ECG", image: "https://res.cloudinary.com/dkujcnlcs/image/upload/v1736244083/esxulmxd2la2di93ytgv.jpg" },
//     { id: 6, name: "Ultrasound", image: "https://res.cloudinary.com/dkujcnlcs/image/upload/v1736244083/esxulmxd2la2di93ytgv.jpg" },
//     { id: 7, name: "Liver Function", image: "https://res.cloudinary.com/dkujcnlcs/image/upload/v1736244083/esxulmxd2la2di93ytgv.jpg" },
//     { id: 8, name: "Kidney Function", image: "https://res.cloudinary.com/dkujcnlcs/image/upload/v1736244083/esxulmxd2la2di93ytgv.jpg" },
//     { id: 9, name: "Liver Function", image: "https://res.cloudinary.com/dkujcnlcs/image/upload/v1736244083/esxulmxd2la2di93ytgv.jpg" },
//     { id: 10, name: "Kidney Function", image: "https://res.cloudinary.com/dkujcnlcs/image/upload/v1736244083/esxulmxd2la2di93ytgv.jpg" }
// ];

// function Tests() {
//     return (
//         <div className="container">
//             <div className="row text-center my-4">
//                 <h2>Book Lab Tests Online</h2>
//             </div>
//             <div 
//                 className="row justify-content-center"
//                 style={{ gap: '10px' }} // Apply gap between items
//             >
//                 {testArray.map((test) => (
//                     <div 
//                         className="col-6 col-md-3 col-lg-1 mb-3" 
//                         key={test.id} 
//                         style={{ margin: '0px' }}
//                     >
//                         <img 
//                             src={test.image} 
//                             alt={test.name} 
//                             className="img-fluid test-image" 
//                         />
//                         <p 
//                             className="text-center text-sm text-black font-sans font-normal mt-2 mb-2 test-name"
//                         >
//                             {test.name}
//                         </p>
//                     </div>
//                 ))}
//             </div>

//            {/* Search Section */}
// <div className="row justify-content-center text-center">
//     <div className="col-sm-12 col-md-2">
//         <h4 className="text-secondary font-bold text-2xl text-center lg:text-left pb-4 pt-1 lg:pb-0">
//         Heart
//         </h4>
//     </div>
//     <div className="col-sm-12 col-md-6 px-5 sm:px-0 text-start">
//         <div className="hssearchx-input hs_search">
//             <input
//                 id="searchTest"
//                 placeholder="Search for test and health checkup"
//                 autoComplete="off"
//                 aria-label="Search for test and health checkup"
//                 className="input input-bordered border-primary border-2 w-full bg-white rounded-none focus:outline-0 font-sans"
//                 type="search"
//                 value=""
//             />
//         </div>
//     </div>
// </div>
// <div class="row">
//   <div class="d-flex justify-content-end mb-2">
//     <div class="p-2 bg-[#EDEEF0] rounded-md">
//       <span>Sort by:
//         <select name="sort" class="bg-transparent">
//           <option value="popular">Popular</option>
//           <option value="name">Name</option>
//           <option value="price">Price</option>
//         </select>
//       </span>
//     </div>
//   </div>
// </div>

// <div class="row">
 
//   <div class="col-sm-6 col-md-4 mb-3">
//     <div class="card">
//       <div class="card-body">
//         <h5 class="card-title">FASTING PLASMA GLUCOSE</h5>
//         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//       </div>
     
//       <div class="card-footer d-flex justify-content-between align-items-center">
//         <span class="price">₹500</span> 
//         <button class="btn btn-primary">
//           <i class="bi bi-bookmark-fill"></i> Book 
//         </button>
//       </div>
//     </div>
//   </div>
  
//   <div class="col-sm-6 col-md-4 mb-3">
//     <div class="card">
//       <div class="card-body">
//         <h5 class="card-title">COMPLETE BLOOD PICTURE (CBP)</h5>
//         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//       </div>
      
//       <div class="card-footer d-flex justify-content-between align-items-center">
//         <span class="price">₹400</span>
//         <button class="btn btn-primary">
//           <i class="bi bi-bookmark-fill"></i> Book 
//         </button>
//       </div>
//     </div>
//   </div>


//   <div class="col-sm-6 col-md-4 mb-3">
//     <div class="card">
//       <div class="card-body">
//         <h5 class="card-title">CREATININE</h5>
//         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//       </div>
  
//       <div class="card-footer d-flex justify-content-between align-items-center">
//         <span class="price">₹300</span>
//         <button class="btn btn-primary">
//           <i class="bi bi-bookmark-fill"></i> Book 
//         </button>
//       </div>
//     </div>
//   </div>
//   <div class="col-sm-6 col-md-4 mb-3">
//     <div class="card">
//       <div class="card-body">
//         <h5 class="card-title">FASTING PLASMA GLUCOSE</h5>
//         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//       </div>
     
//       <div class="card-footer d-flex justify-content-between align-items-center">
//         <span class="price">₹500</span> 
//         <button class="btn btn-primary">
//           <i class="bi bi-bookmark-fill"></i> Book 
//         </button>
//       </div>
//     </div>
//   </div>
  
//   <div class="col-sm-6 col-md-4 mb-3">
//     <div class="card">
//       <div class="card-body">
//         <h5 class="card-title">COMPLETE BLOOD PICTURE (CBP)</h5>
//         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//       </div>
      
//       <div class="card-footer d-flex justify-content-between align-items-center">
//         <span class="price">₹400</span>
//         <button class="btn btn-primary">
//           <i class="bi bi-bookmark-fill"></i> Book 
//         </button>
//       </div>
//     </div>
//   </div>


//   <div class="col-sm-6 col-md-4 mb-3">
//     <div class="card">
//       <div class="card-body">
//         <h5 class="card-title">CREATININE</h5>
//         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//       </div>
  
//       <div class="card-footer d-flex justify-content-between align-items-center">
//         <span class="price">₹300</span>
//         <button class="btn btn-primary">
//           <i class="bi bi-bookmark-fill"></i> Book 
//         </button>
//       </div>
//     </div>
//   </div>

// </div>



// </div>




       
//     );
// }

// export default Tests;
