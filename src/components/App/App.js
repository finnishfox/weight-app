import React, {Component} from 'react';
import UserList from '../UserList';
import User from '../User';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from "react-router-dom";
import store from '../../store';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import Landing from "../Landing";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
    },
    typography: {
        useNextVariants: true,
    },
});

/**
 * Creates app.
 * @namespace App
 * @class App
 */
class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                        <>
                            <Route path="/" exact component={Landing}/>
                            <Route path="/users" exact component={UserList}/>
                            <Route path="/users/:id" exact component={User}/>
                        </>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;

