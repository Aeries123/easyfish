import { useEffect, useState } from "react";
import "./MemberList.css";

const MemberList = ({ members, duplicateTestIds }) => {
  const [testDetails, setTestDetails] = useState({});

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  console.log(duplicateTestIds, "testDetails 1");

  useEffect(() => {
    const fetchDuplicateTests = async () => {
      if (!duplicateTestIds || duplicateTestIds.length === 0) return;

      const uniqueTestIds = [...new Set(duplicateTestIds.flat())];
      console.log(uniqueTestIds,"ids 2")

      try {
        const responses = await Promise.all(
          uniqueTestIds.map((testId) =>
            fetch(`${BASE_URL}/api/tests/${testId}`).then((res) =>
              res.json()
            )
          )
        );

        const details = {};
        uniqueTestIds.forEach((testId, index) => {
          details[testId] = responses[index]; // Store response for each testId
        });

        setTestDetails(details);
      } catch (error) {
        console.error("Error fetching duplicate tests:", error);
      }
    };

    fetchDuplicateTests();
  }, [duplicateTestIds]);

  // ✅ Remove duplicates from test IDs
  const uniqueDuplicateTestIds = [...new Set(duplicateTestIds.flat())];

  return (
    <div className="member-list-container">
      {/* ✅ Display duplicate items only once */}
      <div className="duplicate-tests-container">
        <p className="duplicate-tests-title">
          Duplicate Items (Removed from cart)
        </p>
        <ul className="duplicate-tests-list">
          {uniqueDuplicateTestIds.map((testId) => (
            <li key={testId} className="duplicate-tests-list-item">
              {testDetails[testId] ? (
                <div className="duplicate-test-details">
                  <span className="test-name">
                    {testDetails[testId]?.data?.[0]?.test_name ||
                      "No details available"}
                  </span>
                  <span className="test-price">
                    ₹
                    {testDetails[testId]?.data?.[0]?.price ||
                      "No details available"}
                  </span>
                </div>
              ) : (
                <span className="loading-text">Loading...</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Render Members */}
      {/* <div className="members-container">
        {members.map((member) => (
          <div key={member.member_id} className="member-card">
            <h3 className="member-name">{member.name}</h3>
            <p className="member-info">Member ID: {member.member_id}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default MemberList;
