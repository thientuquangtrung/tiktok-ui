import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Button } from '~/components/Button';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

function MenuItem({ item, onClick }) {
    const classes = cx('menu-item', {
        separator: item.separator,
    });

    return (
        <div className={cx('menu-item-wrapper')}>
            <Button onClick={onClick} to={item.to} leftIcon={item.icon} className={classes}>
                {item.title}
            </Button>
            <span className={cx('extra')}>{item.extraComp}</span>
        </div>
    );
}

MenuItem.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
