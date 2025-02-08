import { useState } from "react";
import "./FaqQuestions.css";

const questionsAndAnswers = [
  {
    question:
      "What is validity to avail a Health check package or a test booked online?",
    Answer:
      "The validity of a health check package is 30 days from the date of invoice, for more detail to Terms & Condition of use section on our website.",
  },
  {
    question: "How to Prepare for Preventive Health Check-up?",
    Answer: "Watch This Video for Detailed Information",
  },
  {
    question:
      "Validity of my health check has expired and i did not visit AccessPathLabs Center within validity period, can I still avail the same package?",
    Answer:
      "Once the validity period is over for your registered package, the package cannot be availed. The amount paid by you during the registration process is non-refundable, non-transferable and gets forfeited if you do not visit the branch within the validity period. The amount paid by you during the registration of the special package cannot be utilized for availing other packages.",
  },
  {
    question:
      "Can I directly purchase Direct Marketing Packages from the branches of AccessPathLabs Centre?",
    Answer:
      "No. These are special promotional packages which are available for registration only during the specific campaigns and thus it is important for you to register there during the event/campaign. These are specially designed and discounted packages which are only available during the campaign with specific validity period.",
  },
  {
    question:
      "I have bought a Direct Marketing package for myself during the campaign and it is within the validity period of the package, I want to transfer this package to my wife/husband/mother/father/friend/relative.",
    Answer:
      "The package once registered, is non-transferable. One has to utilize the package for the registered customer only.",
  },
];
const sampleCollection = [
  {
    question:
      "Can I get my pathology (Blood, Urine and Stool) samples collected from home?",
    Answer:
      "Yes, you can book a Home Sample collection by filling form on our website or calling our customercare number at 7780 175 209.",
  },
  {
    question: "Can i prepone/postpone my Home Blood Collection appointment?",
    Answer:
      "Yes, you can prepone/postpone an appointment by calling our customercare number at 7780 175 209.",
  },
];
const reports = [
  {
    question: "How do i see my reports on www.accesspathlabs.com?",
    Answer:
      "Visit Home page of our website and click on Download reports icon. You need to login with mobile number and OTP. You will see your latest report in PDF format.",
  },
  {
    question: "Are my reports shared with anybody?",
    Answer:
      "No, your reports would not be shared with anybody else other than you.",
  },
];
const tests = [
  {
    question: "Is fasting necessary before undergoing a blood test?",
    Answer: "Yes, fasting is recommended before undergoing a blood test.",
  },
  {
    question: "How do Prepare for a blood test?",
    Answer: "Watch This Video for Detailed Information",
  },
  {
    question: "How to prepare for a CT scan?",
    Answer:
      "Important InstructionsGenerally, fasting is required prior to administering IV contrast. Fasting for ~ 4 hours (solid foods) is recommended.Kidney function test (serum creatinine) in cases of positive clinical history.Review of your medical history to determine that no issues exist preventing you from having a CT scan, such as pregnancy / contrast allergy or reaction (i.e., hives, rash, itching, breathing difficulty).A person accompany for IV contrast procedure.Pre-scan requirements:Some CT scans require drinking oral contrast, for approximately 30–60 minutes prior to your scan.Some CT scans involve an injection of contrast, for which an IV cannula will be inserted.Post-scan Requirement:You will be provided with post-procedure instructions at the centre",
  },
];

const FaqQuestions = () => {
  const [questionIndex, setQuestionIndex] = useState(null);
  const [questionIndex1, setQuestionIndex1] = useState(null);
  const [questionIndex2, setQuestionIndex2] = useState(null);
  const [questionIndex3, setQuestionIndex3] = useState(null);
  const onClickQuestion = (index) => {
    setQuestionIndex(index);
  };
  const onClickQuestionIndex1 = (index) => {
    setQuestionIndex1(index);
  };
  const onClickQuestionIndex2 = (index) => {
    setQuestionIndex2(index);
  };
  const onClickQuestionIndex3 = (index) => {
    setQuestionIndex3(index);
  };
  return (
    <div className="faq-container">
      <h2 className="faq-each-main-heading">Home Sample Collection</h2>
      <div>
        {sampleCollection.map((eachItem, index) => (
          <div
            key={eachItem.question}
            className="each-faq"
            onClick={() => onClickQuestionIndex1(index)}
          >
            <h3 className="each-question">{eachItem.question}</h3>
            {questionIndex1 === index && (
              <p className="each-answer">{eachItem.Answer}</p>
            )}
          </div>
        ))}
      </div>
      <h2 className="faq-each-main-heading">Health Checkup & Packages</h2>
      <div>
        {questionsAndAnswers.map((eachItem, index) => (
          <div
            key={eachItem.question}
            className="each-faq"
            onClick={() => onClickQuestion(index)}
          >
            <h3 className="each-question">{eachItem.question}</h3>
            {questionIndex === index && (
              <p className="each-answer">{eachItem.Answer}</p>
            )}
          </div>
        ))}
      </div>

      <h2 className="faq-each-main-heading">Reports</h2>
      <div>
        {reports.map((eachItem, index) => (
          <div
            key={eachItem.question}
            className="each-faq"
            onClick={() => onClickQuestionIndex2(index)}
          >
            <h3 className="each-question">{eachItem.question}</h3>
            {questionIndex2 === index && (
              <p className="each-answer">{eachItem.Answer}</p>
            )}
          </div>
        ))}
      </div>
      <h2 className="faq-each-main-heading">Tests Information & Instructions</h2>
      <div>
        {tests.map((eachItem, index) => (
          <div
            key={eachItem.question}
            className="each-faq"
            onClick={() => onClickQuestionIndex3(index)}
          >
            <h3 className="each-question">{eachItem.question}</h3>
            {questionIndex3 === index && (
              <p className="each-answer">{eachItem.Answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default FaqQuestions;
