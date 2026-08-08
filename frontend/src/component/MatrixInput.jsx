function MatrixInput({ matrix, setMatrix }) {

    const handleChange = (row, col, value) => {
        const newMatrix = matrix.map(row => [...row]);

        newMatrix[row][col] =
            value === "" ? "" : Number(value);

        setMatrix(newMatrix);
    };

    return (
        <div className="matrix-input">

            {matrix.map((row, rowIndex) => (
                <div className="matrix-row" key={rowIndex}>

                    {row.map((value, colIndex) => (
                        <input
                            key={colIndex}
                            type="number"
                            value={value}
                            onChange={(e) =>
                                handleChange(
                                    rowIndex,
                                    colIndex,
                                    e.target.value
                                )
                            }
                        />
                    ))}

                </div>
            ))}

        </div>
    );
}

export default MatrixInput;