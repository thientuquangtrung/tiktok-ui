import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Selector.module.scss';

const cx = classNames.bind(styles);

function Selector({ list, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const [chosen, setChosen] = useState(list[0]);

    useEffect(() => {
        const listE = document.querySelector('.selector-list');
        if (listE) {
            if (isOpen) {
                listE.style.transform = 'scale(1)';
            } else {
                listE.style.transform = 'scale(0)';
            }
        }
    }, [isOpen]);

    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('selected')} onClick={() => setIsOpen((prev) => !prev)}>
                <span className={cx('chosen-label')}>{chosen.label}</span>
                <div name="viewable" className={cx('list', 'selector-list')}>
                    {list.map((item, index) => (
                        <div
                            key={index}
                            value={item.value}
                            className={cx('item', {
                                active: chosen.value === item.value,
                                chosen: chosen.value === item.value,
                            })}
                            onClick={() => setChosen(item)}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
                <div className={cx('arrow-icon')} style={{ transform: isOpen && 'rotate(0)' }}>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 48 48"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M25.5187 35.2284C24.7205 36.1596 23.2798 36.1596 22.4816 35.2284L8.83008 19.3016C7.71807 18.0042 8.63988 16 10.3486 16H37.6517C39.3604 16 40.2822 18.0042 39.1702 19.3016L25.5187 35.2284Z"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Selector;
