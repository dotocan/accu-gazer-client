import React from 'react';
import LoginForm from '../Auth/LoginForm';
import { connect } from "react-redux";
import TestContainer from './TestContainer';

class Main extends React.Component {

    render() {
        return this.props.auth.auth.signedIn ? <TestContainer /> : <LoginForm />;
    }
}

const mapStateToProps = state => {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Main);