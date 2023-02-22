import Scrollbars from 'react-custom-scrollbars';
import className from 'classnames/bind';

import { useContext, useState } from 'react';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';
import SidebarAccounts from './SidebarAccounts';
import TagGroup from './TagGroup';
import Footer from '~/layouts/components/Footer';
import { Button } from '~/components/Button';
import AuthContext from '~/components/Contexts/AuthContext';
import Modal from '~/components/Modal';
import { AuthModal } from '~/components/AuthForm';

const cx = className.bind(styles);

function Sidebar({ largeView }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { currentUser } = useContext(AuthContext);

    return (
        <div className={cx('scroll-wrap', { largeView })}>
            <Scrollbars
                className={cx('scroll-bar')}
                renderThumbVertical={(style, ...props) => (
                    <div
                        style={{
                            ...style,
                            backgroundColor: 'rgba(22, 24, 35, .06)',
                            borderRadius: 3,
                            transition: 'opacity .5s',
                        }}
                        {...props}
                    />
                )}
                autoHide
                thumbSize={180}
                style={{
                    width: 'inherit',
                    height: 'calc(100vh - var(--default-layout-header-height))',
                    position: 'fixed',
                    top: 'var(--default-layout-header-height)',
                    bottom: 0,
                    overflowY: 'overlay',
                    overflowX: 'unset',
                    overscrollBehavior: 'contain',
                }}
            >
                <aside className={cx('wrapper')}>
                    <Menu>
                        <MenuItem to="/" title="For You" icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                        <MenuItem
                            to="/following"
                            title="Following"
                            icon={<UserGroupIcon />}
                            activeIcon={<UserGroupActiveIcon />}
                        />
                        <MenuItem to="/live" title="LIVE" icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
                    </Menu>

                    {!currentUser && (
                        <div className={cx('sidebar-cta')}>
                            <p className={cx('cta-text')}>Log in to follow creators, like videos, and view comments.</p>
                            <Button className={cx('cta-btn')} outline large onClick={() => setIsModalOpen(true)}>
                                Log in
                            </Button>
                        </div>
                    )}

                    <SidebarAccounts heading="Suggested accounts" />
                    {currentUser && <SidebarAccounts heading="Following accounts" following />}

                    <TagGroup heading="Discover" />

                    <Footer />
                </aside>
            </Scrollbars>

            <Modal handleClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
                <AuthModal />
            </Modal>
        </div>
    );
}

export default Sidebar;
