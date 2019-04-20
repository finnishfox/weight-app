import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import './Landing.scss';

const MyLink = props => <Link to="/users" {...props} />;

/**
 * Creates Landing.
 * @namespace Landing
 * @class Landing
 */
class Landing extends Component {
    render() {
        return (
                <article className="Landing">
                    <h1 className="Landing__title">Weight Tracker App</h1>
                    <Button component={MyLink} color="primary" variant="contained">
                        Start
                    </Button>
                </article>
        );
    }
}

export default Landing;
