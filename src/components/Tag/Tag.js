import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Tag.module.scss';
import { HashIcon, MusicIcon } from '../Icons';

const cx = classNames.bind(styles);

function Tag({ path = '', music = false, label, texted }) {
    let to = '/tag/' + path;
    let icon = <HashIcon />;

    if (music) {
        icon = <MusicIcon />;
        to = '/music/' + path;
    }

    return (
        <Link to={to} className={cx('wrapper', { texted })}>
            {/* icon */}
            {icon}

            <p className={cx('label')}>{label}</p>
        </Link>
    );
}

Tag.propTypes = {
    path: PropTypes.string.isRequired,
    music: PropTypes.bool,
    label: PropTypes.string.isRequired,
    texted: PropTypes.bool,
};

export default Tag;
