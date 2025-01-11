import "./alltests.css";
import { useState, useEffect } from "react";
const testButtons = [
  { testName: "AllTests(s)", testId: "AllTests" },
  { testName: "Speciality", testId: "Speciality" },
  { testName: "Condition", testId: "Condition" },
];
const AllTests = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const Speciality = [
  "Andrologist",
  "Cardiologist",
  "Chest Physician",
  "Dermatologist",
  "Diabetologist",
  "Endocrinologist",
  "ENT",
  "Gastroenterologist",
  "Gynecologist",
  "Hemato-oncologist",
  "Hematologist",
  "Hepatologist",
  "Infectious Disease Specialist",
  "Nephrologist",
  "Neurologist",
  "Neurosurgeon",
  "Oncologist",
  "Oncologist Surgeon",
  "Ophthalmologist",
  "Orthopedician",
  "Pathologist",
  "Pediatrician",
  "Physician",
  "Psychiatrist",
  "Rheumatologist",
  "Surgeon",
  "Transplant Surgeon",
  "Urologist",
];
const Condition = [
  "ABO Incompatibility",
  "Acid Base Imbalance",
  "Acute Phase Reactant",
  "Adrenal gland function",
  "AIDS",
  "Allergy",
  "Alzheimer's Disease",
  "Amyloidosis",
  "Anemia",
  "Anemia - Diagnosis",
  "Antenatal Health Check Up",
  "Arthritis",
  "Autoimmune disorders",
  "Autoimmune disorders - Skin",
  "Autoimmune Hepatitis",
  "Blood Cancer",
  "Blood Infections",
  "Bone & Mineral Metabolism",
  "Bone Function & Disorders",
  "Cancer",
  "Cancer Monitoring",
  "Cancer Screen",
  "Cardiac disorders",
  "Celiac Disease",
  "Central Nervous System Disorders",
  "Cirrhosis",
  "Clotting Disorders",
  "Complement system Function",
  "Congenital Enzyme Deficiency",
  "Congenital Metabolic Disorders",
  "Connective Tissue Disorders",
  "Coronary Artery Disease",
  "Dengue",
  "Diabetes",
  "Diabetes insipidus",
  "Dialysis",
  "Dialysis Adequacy",
  "DIC",
  "Diptheria",
  "Disease Association",
  "Disorders of Coagulation",
  "Disorders of Complement system",
  "Disorders of Endocrine System",
  "Disorders of Eyes",
  "Disorders of Gastrointestinal system",
  "Disorders of Gastrointestinal Tract",
  "Disorders of Growth",
  "Disorders of Muscle",
  "Disorders of Nervous System",
  "Disorders of Nutrition",
  "Disorders of Reproductive system",
  "Disorders of Skin",
  "Drug abuse",
  "Drug Sensitivity",
  "Drugs of Abuse",
  "Effusion",
  "Electrolyte Imbalance",
  "Enzyme deficiency",
  "Establishing Paternity",
  "Ewing's Sarcoma",
  "Fever",
  "Filariasis",
  "For Affymetrix chip only",
  "Gastrointestinal Infection",
  "Gaucher Disease",
  "Genetic Disorders",
  "Gestational Diabetes",
  "GIST",
  "Glomerulonephritis",
  "Gluten sensitivity",
  "Gout",
  "Gynecological Disorders",
  "Health Checkup",
  "Heart Diseases",
  "Hematological Function & Disorders",
  "Hematolymphoid Tumors",
  "Hematuria",
  "Hemolytic Anemia",
  "Hemophilia",
  "Histiocytic Lesions",
  "Hormone disorder",
  "Hormone Function",
  "Hypercalcemia",
  "Hyperparathyroidism",
  "Hypertension",
  "Hyperviscosity syndrome",
  "Identification of crystals",
  "Immunization Status",
  "Immunization status- DPT",
  "Immunodeficiency Disorders",
  "Immunodeficiency States",
  "Inborn errors of metabolism",
  "Infections",
  "Infectious Mononucleosis",
  "Infertility",
  "Inflammatory Diseases",
  "Kidney Diseases",
  "Kidney Injury",
  "Kidney Stone",
  "Leprosy",
  "Leukemia",
  "Lipid function",
  "Lipomatous lesions",
  "Liver",
  "Liver Fibrosis",
  "Lymphoma",
  "Lymphoma Diagnosis",
  "Male Infertility",
  "Malnutrition",
  "Meningitis",
  "Menorrhagia",
  "Metabolic Disorders",
  "Metal Poisoning",
  "Metal Toxicity",
  "Micronutrient deficiency",
  "Multiple myeloma",
  "Multiple Sclerosis",
  "Musculoskeletal disorders",
  "Myasthenia Gravis",
  "Myelodysplastic syndrome",
  "Myeloproliferative disorders",
  "Neurodegenerative Disorder",
  "Neurological Disorders",
  "Nutritional disorders",
  "Osteoporosis",
  "Ovarian Function",
  "Pancreatic Function",
  "Paraneoplastic Syndromes",
  "Parasitic Infections",
  "Paroxysmal Nocturnal Hemoglobinuria",
  "Pemphigus",
  "Pernicious Anemia",
  "Pharmacogenomics",
  "Phenol Poisoning",
  "Phenylketonuria",
  "Pituitary Adenoma",
  "Pituitary gland Function",
  "Plasma Cell tumors",
  "Pneumonia",
  "Poisoning - Insecticide",
  "Polycythemia",
  "Porphyrias",
  "Pre-eclampsia",
  "Pregnancy",
  "Prenatal Diagnosis",
  "Recurrent Abortions",
  "Respiratory Infection",
  "Rheumatoid",
  "Sarcoidosis",
  "Scleroderma",
  "Screening for metal toxicity",
  "Sexually Transmitted Diseases",
  "SIADH",
  "Sports medicine",
  "Surgical Pathology",
  "Synovial Sarcoma",
  "Syphilis",
  "Therapeutic Drug Monitoring",
  "Thromboembolic disorders",
  "Thrombotic Disorders",
  "Thyroid Function",
  "Thyroid gland Function",
  "Trace Elements",
  "Transplant",
  "Trauma",
  "Tuberculosis",
  "Typhoid",
  "Vascular Tumors",
  "Vitamin Assays",
  "Vitamin B12 Deficiency",
  "Von Willebrand Disease",
  "Whooping Cough",
  "Wilson Disease",
];
const miniConditions = [
  "ABO Incompatibility",
  "Acid Base Imbalance",
  "Acute Phase Reactant",
  "Adrenal gland function",
  "AIDS",
  "Allergy",
  "Alzheimer's Disease",
  "Amyloidosis",
];
let testNames = [
  {
    testName: "ALLERGY, COCKROACH",
    testParagraph: "No special preparation required.",
    testParameter: "2 Parameter(s) Covered",
    category: "Andrologist",
    condition: "ABO Incompatibility",
  },
  {
    testName: "HbA1c; GLYCOSYLATED HEMOGLOBIN",
    testParagraph: "No special preparation required.",
    testParameter: "2 Parameter(s) Covered",
    category: "Cardiologist",
    condition: "Acid Base Imbalance",
  },
  {
    testName: "TROPONIN - T, HIGH SENSITIVE",
    testParagraph: "No special preparation required.",
    testParameter: "2 Parameter(s) Covered",
    category: "Chest Physician",
    condition: "Acute Phase Reactant",
  },
  {
    testName: "BETA 2 GLYCOPROTEIN 1, IgA",
    testParagraph: "No special preparation required.",
    testParameter: "2 Parameter(s) Covered",
    category: "Dermatologist",
    condition: "Adrenal gland function",
  },
  {
    testName: "LITHIUM",
    testParagraph: "No special preparation required.",
    testParameter: "2 Parameter(s) Covered",
    category: "Diabetologist",
    condition: "AIDS",
  },
];
const balu = testNames;
let allTestNames = [...balu];

export const AllTestsPage = () => {
  const [name, setName] = useState("AllTests");
  const [charachter, setCharacter] = useState("");
  const [filteredList, setFilteredList] = useState(testNames);
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const onClickViewButton = () => {
    setIsVisible((prev) => !prev);
  };
  const visibleConditions = isVisible ? Condition : miniConditions;
  const viewContent = isVisible ? "view less" : "view more";

  const onChangeCharacter = (e) => {
    setCharacter(e.target.value);
    setCategory("");
    setCondition("");
  };
  const onChangeCategory = (e) => {
    setCategory(e.target.value);
    setCharacter("");
    setCondition("");
  };
  const onChangeCondition = (e) => {
    setCondition(e.target.value);
    setCategory("");
    setCharacter("");
  };
  useEffect(() => {
    let updatedFilters =
      charachter || category || condition
        ? testNames.filter(
            (each) =>
              each.testName[0] === charachter ||
              each.category === category ||
              each.condition === condition
          )
        : testNames;
    setFilteredList(updatedFilters);
  }, [charachter, category, condition]);
  //let filteredList=charachter?testNames.filter(each=>each.testName[0]===charachter):testNames
  // setFilteredList(updatedFilters)

  const onClickButton = (i) => {
    if (i === "AllTests") {
      setFilteredList(testNames);
    }
    setName(i);
  };
  return (
    <div className="all-container">
      <div className="all-tests-container">
        <div className="tests-filter">
          <h2 className="search-tests-package">Search Tests and Packages</h2>
          <div>
            {testButtons.map((each) => (
              <button
                className="buttons"
                id={each.testId}
                onClick={() => onClickButton(each.testId)}
                style={{
                  backgroundColor: name === each.testId ? "purple" : "#D3D3D3",
                  color: name === each.testId ? "white" : "black",
                }}
              >
                {each.testName}
              </button>
            ))}
          </div>
          {name !== "" && name === "AllTests" && (
            <div>
              {AllTests.map((each) => (
                <input
                  type="button"
                  className="buttons"
                  value={each}
                  style={{ backgroundColor: "#D3D3D3" }}
                  onClick={onChangeCharacter}
                />
              ))}
            </div>
          )}
          {name !== "" && name === "Speciality" && (
            <div>
              {Speciality.map((each) => (
                <input
                  type="button"
                  className="buttons"
                  value={each}
                  style={{ backgroundColor: "#D3D3D3" }}
                  onClick={onChangeCategory}
                />
              ))}
            </div>
          )}
          {name !== "" && name === "Condition" && (
            <div>
              {visibleConditions.map((each) => (
                <input
                  type="button"
                  className="buttons"
                  value={each}
                  style={{ backgroundColor: "#D3D3D3" }}
                  onClick={onChangeCondition}
                />
              ))}
              <button
                onClick={onClickViewButton}
                className="all-visible-button buttons"
              >
                {viewContent}
              </button>
            </div>
          )}
        </div>
        <div className="all-tests-container">
          {filteredList.length > 0 ? (
            filteredList.map((each) => (
              <>
                <div className="individual-test-card">
                  <h2 className="test-heading">{each.testName}</h2>
                  <div className="test-parameter">
                    <img
                      src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png"
                      height="20px"
                      width="20px"
                    />
                    <p className="parameter-paragraph">{each.testParagraph}</p>
                  </div>
                  <div className="know-more-button-container">
                    <p className="parameter-paragraph">{each.testParameter}</p>
                    <button className="test-know-more-button">Know More</button>
                  </div>
                </div>
              </>
            ))
          ) : (
            <h1>No Data Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};
