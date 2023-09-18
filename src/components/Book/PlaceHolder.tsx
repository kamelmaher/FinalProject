const PlaceHolder = () => {
    return (
        <div className="col-md-6 p-3">
            <div className="card m-auto w-75 mt-4" aria-hidden="true">
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                    <a className="btn btn-success disabled placeholder col-6" aria-disabled="true"></a>
                </div>
            </div>
        </div>
    )
}

export default PlaceHolder
