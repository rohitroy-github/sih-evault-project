import React, {useState, useEffect} from "react";
import getCaseDetailsByCaseID from "../blockchain-api/getCaseDetailsByCaseID";

const CaseDetailsComponent = ({caseID}) => {
  const [caseDetails, setCaseDetails] = useState(null);

  useEffect(() => {
    // Function to fetch case details based on the caseID
    const fetchCaseDetails = async () => {
      try {
        const caseDetails = await getCaseDetailsByCaseID(caseID);
        setCaseDetails(caseDetails);
      } catch (error) {
        console.error("Error while fetching case details:", error);
      }
    };

    fetchCaseDetails();
  }, [caseID]);

  // Function to create a snake-like pattern of progress cells
  const createSnakePattern = (progressArray) => {
    const rows = [];
    const numColumns = 3;

    for (let i = 0; i < progressArray.length; i += numColumns) {
      const row = progressArray.slice(i, i + numColumns);

      if ((i / numColumns) % 2 === 1) {
        // Reverse order for odd rows to create a snake pattern
        row.reverse();
      }

      rows.push(row);
    }

    return rows;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <div>
        <h2 className="text-3xl font-montserrat mb-4 text-center">
          Case Details
        </h2>
      </div>
      <div className="w-[80%] flex items-center justify-center">
        {caseDetails ? (
          <table className="min-w-full border border-gray-200">
            <tbody>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  Case ID
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  {caseDetails.caseId}
                </td>
              </tr>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  UID Of Party 1
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  {caseDetails.UIDOfParty1}
                </td>
              </tr>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  UID Of Party 2
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  {caseDetails.UIDOfParty2}
                </td>
              </tr>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  Filed On Date
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  {caseDetails.filedOnDate.toString()}
                </td>
              </tr>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  Associated Lawyers
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  <ul className="list-disc pl-6">
                    {caseDetails.associatedLawyers.map((lawyer, index) => (
                      <li key={index}>{lawyer}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  Associated Judge
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  {caseDetails.associatedJudge}
                </td>
              </tr>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  Case Subject
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  {caseDetails.caseSubject}
                </td>
              </tr>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  Latest Case Update
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  {
                    caseDetails.caseProgress[
                      caseDetails.caseProgress.length - 1
                    ]
                  }
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Loading case details...</p>
        )}
      </div>
      <div className="flex w-[80%] mb-5 mt-10">
        <div className="w-[20%] flex flex-col justify-center">
          <h2 className="text-2xl font-montserrat">Case Progress</h2>
        </div>
        <div className="w-[80%]">
          {caseDetails ? (
            <div className="flex flex-col">
              {createSnakePattern(caseDetails.caseProgress).map(
                (row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex insideLoop1 justify-evenly items-center w-full"
                  >
                    {row.map((progress, index) => (
                      <div
                        key={index}
                        className={`insideLoop2 w-1/3 h-[75px] p-3 mb-3 ml-3 border rounded-lg ${
                          caseDetails.caseProgress.indexOf(progress) + 1 ===
                          caseDetails.caseProgress.length
                            ? "bg-blue-300 animate-blink"
                            : "bg-blue-100"
                        } hover:border-2 hover:border-blue-500 border-white-500 border-2 cursor-pointer`}
                      >
                        {/* {index < row.length - 1 && (
                        <div className="absolute top-1/2 right-0 -mr-2 w-4 h-4 bg-gray-300 rounded-full" />
                      )} */}
                        <div className="font-montserrat flex justify-between">
                          <div className="text-sm order-first">{progress}</div>
                          <div className="text-xs order-last ml-5">
                            {caseDetails.caseProgress.indexOf(progress)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          ) : (
            <p>Loading case progress...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsComponent;
