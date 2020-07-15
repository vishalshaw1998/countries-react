import React from "react";

function Body(props) {
    return (
        <div className="body">
            {props.value.currState.countriesToDisplay.map((item) => {
                return (
                    <div
                        key={item.name}
                        className="card-body"
                        style={{ border: "2px solid black" }}
                    >
                        <div className="row">
                            <div className="col-4">
                                <img
                                    src={item.flag}
                                    height="150px"
                                    width="150px"
                                    alt="Img Unavailable"
                                />
                            </div>
                            <div className="col-4 name">
                                <h4>{item.name}</h4>
                                <h5>{item.capital}</h5>
                            </div>
                            <div className="col-4 borders">
                                {item.borders.length ? (
                                    <div>
                                        <h3>Borders Shared</h3>
                                        {item.borders.map((items, index) => {
                                            return <li key={index}>{items}</li>;
                                        })}
                                    </div>
                                ) : (
                                    <h2>Borders Are Not Shared</h2>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Body;
