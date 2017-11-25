/*React Core*/
"use strict";
import React from "react";
import ReactDOM from "react-dom";
import Text from "./Core/Controls/Text";
import Button from "./Core/Controls/Button";

class Application extends React.Component {
    render() {
        return<div>
                <Text fieldData={this.props.name} />
                <Button label="Load" />
            </div>;
    }
}

ReactDOM.render(
    <Application name="YO"/>,
    document.getElementById("application")
)