function Result({ solution }) {

    if (!solution) {
        return null;
    }

    if (solution.type === "no-solution") {
        return (
            <div className="result">
                <h2>Result</h2>
                <p>No solution</p>
            </div>
        );
    }

    if (solution.type === "unique") {
        return (
            <div className="result">

                <h2>Result</h2>

                {solution.values.map(
                    (value, index) => (
                        <p key={index}>
                            x{index + 1} ={" "}
                            {Number(value).toFixed(4)}
                        </p>
                    )
                )}

            </div>
        );
    }

    return null;
}

export default Result;