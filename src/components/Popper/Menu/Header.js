import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Header({ heading, onBack }) {
    return ( 
        <header className={cx('header')}>
            <button onClick={onBack} className={cx('back-btn')}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h4 className={cx('heading')}>{heading}</h4>
        </header>
     );
}

Header.propTypes = {
    heading: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
}

export default Header;