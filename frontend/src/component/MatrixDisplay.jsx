function MatrixDisplay({ matrix }) {

    return (
        <div className="matrix-display">

            {matrix.map((row, rowIndex) => (
                <div
                    className="matrix-row"
                    key={rowIndex}
                >

                    {row.map((value, colIndex) => (
                        <span key={colIndex}>
                            {Number(value).toFixed(2)}
                        </span>
                    ))}

                </div>
            ))}

        </div>
    );
}

export default MatrixDisplay;