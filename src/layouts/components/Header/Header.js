import { useContext, useState } from 'react';
import className from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faQuestionCircle,
    faEarthAsia,
    faKeyboard,
    faMoon,
    faVideoCamera,
    faGear,
    faSignOut,
    faCoins,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import images from '~/assets/images';
import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import config from '~/config';
import { Button } from '~/components/Button';
import { CoinIcon, InboxIcon, MessagesIcon, PlusIcon } from '~/components/Icons';
import Avatar from '~/components/Avatar';
import AuthContext from '~/components/Contexts/AuthContext';
import { ThemeContext } from '~/App';
import Modal from '~/components/Modal';
import { AuthModal } from '~/components/AuthForm';
import Switcher from '~/components/Button/Switcher';

const cx = className.bind(styles);

function Header({ largeView, livestream }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { currentUser, logout } = useContext(AuthContext);
    const { switchTheme, theme } = useContext(ThemeContext);

    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            title: 'English',
            children: {
                heading: 'Language',
                data: [
                    {
                        type: 'language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'language',
                        code: 'vi',
                        title: 'Tiếng Việt',
                    },
                ],  
            },
        },
        {
            icon: <FontAwesomeIcon icon={faQuestionCircle} />,
            title: 'Feedback and help',
            to: config.routes.feedback,
        },
        {
            icon: <FontAwesomeIcon icon={faKeyboard} />,
            title: 'Keyboard shortcuts',
        },
        {
            icon: <FontAwesomeIcon icon={faMoon} />,
            title: 'Dark mode',
            extraComp: <Switcher onClick={switchTheme}/>
        },
    ];

    let userItem = [];
    if (currentUser) {
        userItem = [
            {
                icon: <FontAwesomeIcon icon={faUser} />,
                title: 'View profile',
            },
            {
                icon: <FontAwesomeIcon icon={faCoins} />,
                title: 'Get coins',
            },
            {
                icon: <FontAwesomeIcon icon={faVideoCamera} />,
                title: 'LIVE studio',
            },
            {
                icon: <FontAwesomeIcon icon={faGear} />,
                title: 'Settings',
            },
            ...MENU_ITEMS,
            {
                icon: <FontAwesomeIcon icon={faSignOut} />,
                title: 'Log out',
                onChange: logout,
                separator: true,
            },
        ];
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('content', { largeView })}>
                <Link to={config.routes.home} className={cx('logo')}>
                    {theme === 'light' ? (
                        <img src={images.logo} alt="tiktok" />
                    ) : (
                        <img src={images.darkLogo} alt="tiktok" />
                    )}
                </Link>

                {/* search */}
                <Search />
                {/* actions */}
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button squared leftIcon={<PlusIcon width="2rem" height="2rem" />}>
                                Upload
                            </Button>
                            <Tippy content="Messages" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessagesIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon width="3.2rem" height="3.2rem" />
                                </button>
                            </Tippy>

                            {livestream && (
                                <Button squared leftIcon={<CoinIcon />}>
                                    Get coins
                                </Button>
                            )}

                            <Menu data={userItem}>
                                <Avatar
                                    className={cx('avatar')}
                                    src={currentUser?.avatar}
                                    alt={currentUser?.nickname}
                                />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                squared
                                leftIcon={<PlusIcon width="2rem" height="2rem" />}
                            >
                                Upload
                            </Button>
                            <Button onClick={() => setIsModalOpen(true)} primary>
                                Log in
                            </Button>
                            <Menu data={MENU_ITEMS}>
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            </Menu>
                        </>
                    )}
                </div>
            </div>

            <Modal handleClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
                <AuthModal />
            </Modal>
        </header>
    );
}

export default Header;
