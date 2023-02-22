import classNames from 'classnames/bind';
import styles from './Switcher.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Switcher({ width = '44px', height = '24px', className, onClick, ...props }) {
    const [isTurnOn, setIsTurnOn] = useState(false);

    const handleToggle = () => {
        onClick();
        setIsTurnOn((prev) => !prev);
    };

    return (
        <button className={cx('switch-btn', className)} onClick={handleToggle} {...props}>
            <div
                className={cx('wrapper', {
                    open: isTurnOn,
                })}
                style={{ width: { width }, height: { height } }}
            >
                <span
                    className={cx('thumb', {
                        open: isTurnOn,
                    })}
                    style={{ width: '20px', height: '20px' }}
                ></span>
            </div>
        </button>
    );
}

export default Switcher;
