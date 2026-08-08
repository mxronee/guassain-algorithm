import MatrixDisplay from "./MatrixDisplay.jsx";

function StepDisplay({ steps }) {

    return (
        <div className="steps">

            <h2>Calculation Steps</h2>

            {steps.map((step, index) => (
                <div className="step" key={index}>

                    <h3>
                        Step {index + 1}
                    </h3>

                    <p>
                        {step.operation}
                    </p>

                    <MatrixDisplay
                        matrix={step.matrix}
                    />

                </div>
            ))}

        </div>
    );
}

export default StepDisplay;