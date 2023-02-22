import { Link } from 'react-router-dom';
import images from '~/assets/images';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from './NoHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function NoHeader({ children }) {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('heading')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="tiktok" />
                </Link>
                <Link to={config.routes.feedback} className={cx('feedback')}>
                    <FontAwesomeIcon icon={faQuestionCircle} className={cx('icon')} />
                    Feedback and help
                </Link>
            </header>
            <div className={cx('body')}>{children}</div>
            <footer className={cx('footer')}>© {new Date().getFullYear()} TikTok</footer>
        </div>
    );
}

export default NoHeader;
