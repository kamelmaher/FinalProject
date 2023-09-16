const TablePlaceHolder = () => {
    return (
        <>
            <div className="text-center">
                <div className="placeholder-glow mb-3 mt-4">
                    <span className="placeholder col-6"></span>
                    <span className="placeholder w-75"></span>
                    <span className="placeholder" style={{ width: "50%" }}></span>
                </div>
                <div className="placeholder-glow mb-3">
                    <span className="placeholder col-6"></span>
                    <span className="placeholder w-75"></span>
                    <span className="placeholder" style={{ width: "50%" }}></span>
                </div>
                <div className="placeholder-glow mb-3">
                    <span className="placeholder col-6"></span>
                    <span className="placeholder w-75"></span>
                    <span className="placeholder" style={{ width: "50%" }}></span>
                </div>
            </div>
        </>
    );
};

export default TablePlaceHolder