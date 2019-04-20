import React, {Component} from 'react';
import Graph from "../Graph";
import Measurements from "../Measurements";

/**
 * Creates user.
 * @namespace User
 * @class User
 */
class User extends Component {
    render() {
        const id = this.props.match.params.id;
        return (
            <>
                <Graph userId={id}/>
                <Measurements userId={id}/>
            </>
        );
    }
}

export default User;
