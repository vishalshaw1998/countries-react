import React from "react";
import ReactDOM from "react-dom";
import Heading from "./Heading";
import Input from "./Input";
import Body from "./Body";
import { useEffect } from "react";
import { useReducer } from "react";

function App() {
    const [countries, dispatch] = useReducer(
        (state, action) => {
            switch (action.do) {
                case "INIT":
                    return { ...state, countriesOfWorld: action.data };
                case "CHANGE_DROP_VALUE":
                    return {
                        ...state,
                        countriesToDisplay: state.countriesOfWorld.slice(
                            0,
                            action.data
                        ),
                        last: action.data,
                        first: 0,
                        valueInDrop: action.data,
                    };
                case "CHANGE_INPUT_VALUE":
                    return { ...state, inputValue: action.data };
                case "RIGHT_CLICKED":
                    return {
                        ...state,
                        last:
                            parseInt(state.last) + parseInt(state.valueInDrop),
                        first: state.first + parseInt(state.valueInDrop),
                        countriesToDisplay: state.countriesOfWorld.slice(
                            state.first + parseInt(state.valueInDrop),
                            parseInt(state.last) + parseInt(state.valueInDrop)
                        ),
                    };
                case "LEFT_CLICKED":
                    return {
                        ...state,
                        countriesToDisplay: state.countriesOfWorld.slice(
                            parseInt(state.first) - parseInt(state.valueInDrop),
                            parseInt(state.last) - parseInt(state.valueInDrop)
                        ),
                        last:
                            parseInt(state.last) - parseInt(state.valueInDrop),
                        first:
                            parseInt(state.first) - parseInt(state.valueInDrop),
                    };
                case "SUBMIT":
                    return {
                        ...state,
                        countriesToDisplay: state.countriesOfWorld.filter(
                            (items) => {
                                return (
                                    items.name === action.data ||
                                    items.population === action.data ||
                                    items.alpha2Code === action.data ||
                                    items.alpha3Code === action.data
                                );
                            }
                        ),
                        first: 0,
                        last: 250,
                    };
                default:
                    break;
            }
        },
        {
            countriesOfWorld: [],
            countriesToDisplay: [],
            inputValue: "",
            valueInDrop: "",
            first: 0,
            last: 250,
        }
    );
    useEffect(() => {
        fetch("https://restcountries.eu/rest/v2/all")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch({ do: "INIT", data: data });
            });
    }, []);
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Heading />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Input
                        value={{
                            currState: countries,
                            dispatchFn: dispatch,
                        }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Body
                        value={{
                            currState: countries,
                            dispatchFn: dispatch,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
