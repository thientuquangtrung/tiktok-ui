import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Avatar from '~/components/Avatar';
import styles from './AccountItem.module.scss';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

const AccountItem = forwardRef(({ avaW, avaH, data, small, onClick }, ref) => {
    let name = '';
    if (data.full_name) {
        name = data.full_name;
    } else {
        name = data.first_name + ' ' + data.last_name;
    }

    return (
        <Link ref={ref} onClick={onClick} to={`/@${data.nickname}`} className={cx('wrapper', { small })}>
            <Avatar width={avaW} height={avaH} className={cx('avatar')} src={data.avatar} alt={data.full_name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    {data.nickname}
                    {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
                </h4>
                <span className={cx('username')}>{name}</span>
            </div>
        </Link>
    );
});

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default AccountItem;
