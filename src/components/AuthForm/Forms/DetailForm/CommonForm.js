import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './CommonForm.module.scss';
import Validator from './validator_2';
import './CommonForm.scss';
import { Button } from '~/components/Button';
import { useContext, useEffect } from 'react';
import AuthContext from '~/components/Contexts/AuthContext';
import Footer from '../Footer';

const cx = classNames.bind(styles);

function CommonForm({ title, isLogin, isSignup, formId }) {
    const { login, signup } = useContext(AuthContext);

    useEffect(() => {
        if (isLogin) {
            const form = new Validator('#login-with-mail');
            form.onSubmit = (data) => {
                login(data);
            };
        }
        else if (isSignup) {
            const form = new Validator('#signup-with-mail');
            form.onSubmit = (data) => {
                signup(data);
            };
        }

    });

    return (
        <>
            <div className={cx('wrapper')}>
                <h2 className={cx('title')}>{title}</h2>
                <p className={cx('desc')}>Email and password</p>
                <form className={cx('auth-form')} id={formId}>
                    <div className={cx('form-group', 'form-group--css')}>
                        <input
                            id="email"
                            name="email"
                            rules="required|email"
                            type="text"
                            placeholder="Email..."
                            className={cx('form-control', 'form-control--css')}
                        />
                        <span className={cx('form-message', 'form-message--css')}></span>
                    </div>
    
                    <div className={cx('form-group', 'form-group--css')}>
                        <input
                            id="password"
                            name="password"
                            rules="required|min:6"
                            type="password"
                            placeholder="Password..."
                            className={cx('form-control', 'form-control--css')}
                        />
                        <span className={cx('form-message', 'form-message--css')}></span>
                    </div>
    
                    {isLogin && (
                        <a href="#!" className={cx('form-link')}>
                            Forgot password?
                        </a>
                    )}
    
                    <Button primary large className={cx('form-btn', 'form-submit')}>
                        {isLogin ? 'Login' : 'Register'}
                    </Button>
                </form>
            </div>
            <Footer isLogin={isLogin}/>
        </>
    );
}

CommonForm.propTypes = {
    title: PropTypes.string,
    isLogin: PropTypes.bool,
    isSignup: PropTypes.bool,
    formId: PropTypes.string,
};

export default CommonForm;
