import {getUsersList} from './UserList.actions';
import {getUsers,checkIsFetching,getUsersTotal,getPages} from './UsersList.selectors';
import { connect } from 'react-redux';
import UserList from './UserList';

const mapStateToProps = state => ({
    users: getUsers(state),
    isFetching: checkIsFetching(state),
    usersTotal: getUsersTotal(state),
    pages: getPages(state)
});

const mapDispatchToProps = {
    getUsersList,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

