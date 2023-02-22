import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

function Menu({ data = [], children, hideOnClick = false }) {
    const [menus, setMenus] = useState([{ data }]);

    const currentMenu = menus[menus.length - 1];

    function renderItem() {
        return currentMenu.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    item={item}
                    onClick={() => {
                        if (isParent) {
                            setMenus((prev) => [...prev, item.children]);
                        } else {
                            item.onChange();
                        }
                    }}
                />
            );
        });
    }

    const handleBack = () => {
        setMenus((prev) => prev.slice(0, prev.length - 1));
    };

    const handleReset = () => {
        setMenus((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            interactive
            // visible
            placement="bottom-end"
            offset={[12, 8]}
            delay={[0, 700]}
            hideOnClick={hideOnClick}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {menus.length > 1 && <Header onBack={handleBack} heading={currentMenu.heading} />}
                        <div className={cx('menu-body')}>{renderItem()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={handleReset}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    data: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func,
    hideOnClick: PropTypes.bool,
};

export default Menu;
