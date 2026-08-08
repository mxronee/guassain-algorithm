import { useState } from "react";

import MatrixDisplay from "./component/MatrixDisplay.jsx";
import MatrixInput from "./component/MatrixInput.jsx";
import StepDisplay from "./component/StepDisplay.jsx";
import Result from "./component/Result.jsx";

function App() {

    const [matrix, setMatrix] = useState([
        [2, 1, 5],
        [4, 3, 11]
    ]);

    const [result, setResult] = useState(null);

    const calculate = async () => {

        try {

            const response = await fetch(
                "http://localhost:3000/api/gaussian",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        matrix
                    })
                }
            );

            const text = await response.text();

console.log("STATUS:", response.status);
console.log("RESPONSE:", text);

try {
    const data = JSON.parse(text);
    setResult(data);
} catch (error) {
    console.error("Response is not JSON:", text);
}

        } catch (error) {

            console.error(
                "Cannot connect to backend:",
                error
            );

        }
    };

    return (
        <div className="container">

            <h1>
                Gaussian Elimination
            </h1>

            <h2>
                Input Matrix
            </h2>

            <MatrixInput
                matrix={matrix}
                setMatrix={setMatrix}
            />

            <button onClick={calculate}>
                Calculate
            </button>


            {result && (
                <>
                    <h2>
                        Final Matrix
                    </h2>

                    <MatrixDisplay
                        matrix={result.matrix}
                    />

                    <StepDisplay
                        steps={result.steps}
                    />

                    <Result
                        solution={result.solution}
                    />
                </>
            )}

        </div>
    );
}

export default App;