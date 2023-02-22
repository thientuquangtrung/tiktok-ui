import classNames from 'classnames/bind';
import styles from './CommonAuthUI.module.scss';

const cx = classNames.bind(styles);

function Footer({ isLogin }) {
    return (
        <div className={cx('footer')}>
            <p className={cx('cta-text')}>{isLogin ? 'Don’t have an account?' : 'Already have an account?'}</p>
            <a
                className={cx('cta-link')}
                href={isLogin ? '/signup' : '/login'}
                data-auth-modal={isLogin ? 'signup' : 'login'}
            >
                {isLogin ? 'Sign up' : 'Log in'}
            </a>
        </div>
    );
}

export default Footer;
