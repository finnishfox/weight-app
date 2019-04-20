import React, {Component} from 'react';
import {Link as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';
import './UserList.scss';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

/**
 * Creates list of users.
 * @namespace UserList
 * @class UserList
 */
class UserList extends Component {
    state = {page: 1, perPage: 5};

    /** @function componentDidMount
     * requests users when component did mount
     * @memberof UserList#
     */
    componentDidMount() {
        const {users, isFetching, getUsersList} = this.props;
        if (users.length === 0 && !isFetching) {
            getUsersList(1);
        }
    }

    /** @function handleFirstPageButtonClick
     * request users
     * sets page in state to 1
     * @memberof UserList#
     */
    handleFirstPageButtonClick = () => {
        this.loadPage(1);
    };

    /** @function handleBackButtonClick
     * request users
     * sets page in state to previous number
     * @memberof UserList#
     */
    handleBackButtonClick = () => {
        const page = this.state.page - 1;
        this.loadPage(page);
    };

    /** @function handleNextButtonClick
     * request users
     * sets page in state to next number
     * @memberof UserList#
     */
    handleNextButtonClick = () => {
        const page = this.state.page + 1;
            this.loadPage(page);
    };

    /** @function handleLastPageButtonClick
     * request users
     * sets page in state to count of pages
     * @memberof UserList#
     */
    handleLastPageButtonClick = () => {
        const {usersTotal} = this.props;
        const page = Math.ceil(usersTotal / this.state.perPage);
        this.loadPage(page);
    };

    /**
     * loades defined page of users
     * @param {number} page - number of page to load
     * @memberof UserList#
     */
    loadPage = (page)=>{
        const {pages, getUsersList} = this.props;
        if (!pages.includes(page)) {
            getUsersList(page);
        }
        this.setState({page: page});
    };

    render() {
        const {users, usersTotal, pages} = this.props;
        return (
            <section className="UserList">
                <h2 className="UserList__title">Users</h2>
                {
                    users
                        .slice(pages.indexOf(this.state.page) * this.state.perPage,
                            pages.indexOf(this.state.page) * this.state.perPage + this.state.perPage)
                        .map(({id, first_name, last_name}) => {
                                const MyLink = props => <RouterLink {...props} to={`/users/${id}`}/>;
                                return (<Link component={MyLink} key={id} color="primary" className="UserList__link">
                                    {first_name} {last_name}
                                </Link>)
                            }
                        )
                }
                <nav className="UserList__pagination">
                    <IconButton
                        onClick={this.handleFirstPageButtonClick}
                        disabled={this.state.page === 1}
                        aria-label="First Page">
                        <FirstPageIcon/>
                    </IconButton>
                    <IconButton
                        onClick={this.handleBackButtonClick}
                        disabled={this.state.page === 1}
                        aria-label="Previous Page">
                        <KeyboardArrowLeft/>
                    </IconButton>
                    <IconButton
                        onClick={this.handleNextButtonClick}
                        disabled={usersTotal === 0 ||
                        this.state.page === (Math.ceil(usersTotal / this.state.perPage))}
                        aria-label="Next Page">
                        <KeyboardArrowRight/>
                    </IconButton>
                    <IconButton
                        onClick={this.handleLastPageButtonClick}
                        disabled={usersTotal === 0 ||
                        this.state.page === (Math.ceil(usersTotal / this.state.perPage))}
                        aria-label="Last Page">
                        <LastPageIcon/>
                    </IconButton>
                </nav>
            </section>
        );
    }
}

export default UserList;
