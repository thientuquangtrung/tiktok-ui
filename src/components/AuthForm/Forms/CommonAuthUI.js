import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Button } from '~/components/Button';
import styles from './CommonAuthUI.module.scss';
import Footer from './Footer';

const cx = classNames.bind(styles);

function CommonAuthUI({ title, data, isLogin }) {
    return (
        <>
            <div className={cx('body')}>
                <div className={cx('body-wrapper')}>
                    <h2 className={cx('title')}>{title}</h2>
                    {data.map((item, index) => {
                        if (item.children) {
                            return (
                                <Button
                                    key={index}
                                    href={item.children.href}
                                    data-auth-modal={item.children.type}
                                    className={cx('btn')}
                                    large
                                    squared
                                >
                                    <i className={cx('icon')}>{item.icon}</i>
                                    {item.label}
                                </Button>
                            );
                        }

                        return (
                            <Button key={index} className={cx('btn')} large squared>
                                <i className={cx('icon')}>{item.icon}</i>
                                {item.label}
                            </Button>
                        );
                    })}
                </div>
            </div>
            <Footer isLogin={isLogin} />
        </>
    );
}

CommonAuthUI.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    cta: PropTypes.object,
    ctaLink: PropTypes.string,
    dataAuthModal: PropTypes.string,
};

export default CommonAuthUI;
