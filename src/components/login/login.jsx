import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import requiredField from "../../Helpers/validators/validator";
import {connect} from "react-redux";
import {login} from "../../redux/auth_reducer";
import {Redirect} from "react-router-dom";
import styles from '../../common/FormsControls/FormsControl.Module.css'

const LoginForm = (props) => {
    return (
        <form onSubmit={ props.handleSubmit} >
            <div>
                <Field placeholder={'email'} name = {'email'} component={Input}
                validate = {[requiredField]} />
            </div>
            <div>
                <Field placeholder={'password'} name = {'password'} component={Input} type={'password'}
                       validate = {[requiredField]} />
            </div>
            <div>
                <Field component={Input} name = {'rememberMe'} type={'checkbox'} /> remember me
            </div>
            { props.error &&
                <div className={styles.formSummaryError }>
                {props.error}
            </div>
            }
            <div>
                <button>log in</button>
            </div>
        </form>
    )

};

const LoginReduxForm = reduxForm({form: 'loginForm'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    };
    if (props.isAuth) {
        return <Redirect to = {'/profile'} />
    }
    return <div>
                <h1>Login</h1>
                <LoginReduxForm onSubmit = { onSubmit } />
           </div>

};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});
export default connect(mapStateToProps, {login}) (Login);