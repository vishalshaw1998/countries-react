import React, { useRef } from "react";

function Input(props) {
    let disableRight = false;
    let disableLeft = false;
    const inputRef = useRef();
    function setDropvalue(value) {
        props.value.dispatchFn({ do: "CHANGE_DROP_VALUE", data: value });
    }
    function handleRight() {
        props.value.dispatchFn({ do: "RIGHT_CLICKED", data: null });
    }
    function handleLeft() {
        props.value.dispatchFn({ do: "LEFT_CLICKED", data: null });
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.value.dispatchFn({ do: "SUBMIT", data: inputRef.current.value });
    }
    if (props.value.currState.last >= 250) {
        disableRight = true;
    } else {
        disableRight = false;
    }
    if (props.value.currState.first <= 0) {
        disableLeft = true;
    } else {
        disableLeft = false;
    }
    return (
        <div className="row space-around mt-4">
            <div className="col-4">
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Country Or population"
                        ref={inputRef}
                        type="text"
                    />
                    <button className="ml-3 btn btn-dark" type="submit">
                        Search
                    </button>
                </form>
            </div>
            <div className="col-4 text-right">
                <button
                    disabled={disableLeft}
                    className="mr-2 btn"
                    onClick={() => {
                        handleLeft();
                    }}
                >
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </button>
                <select
                    onChange={(e) => {
                        setDropvalue(e.target.value);
                    }}
                    name="value"
                    id="value"
                >
                    <option>Select</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                <button
                    disabled={disableRight}
                    className="ml-2 btn"
                    onClick={() => {
                        handleRight();
                    }}
                >
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
}

export default Input;
