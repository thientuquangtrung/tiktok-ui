import PropTypes from 'prop-types';
import className from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';

const cx = className.bind(styles);

function DefaultLayout({ children, largeView, livestream }) {

    return (
        <div className={cx('wrapper')}>
            <Header largeView={largeView} livestream={livestream} />
            <div className={cx('container', { largeView })}>
                <Sidebar largeView={largeView} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
