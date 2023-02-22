import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import UserLoader from '~/components/Loaders/UserLoader';
import * as usersService from '~/services/usersService';
import classNames from 'classnames/bind';
import SideAccountItem from './SideAccountItem';
import styles from './SidebarAccounts.module.scss';

const cx = classNames.bind(styles);

function SidebarAccounts({ heading, following }) {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);

            if (following) {
                const result = await usersService.getFollowing(page);
                setData((prev) => [...new Set([...prev, ...result.data])]);
                setMore(result.meta.pagination.current_page !== result.meta.pagination.total_pages);
            } else {
                setData(await usersService.getSuggested(2, 15));
            }
            setLoading(false);
        };
        fetchApi();
    }, [page]);

    useEffect(() => {
        if (following) {
            setCurrentData(data);
        } else {
            if (data) {
                setCurrentData((prev) => [...new Set([...prev, ...data.slice(0, 5)])]);
            }
        }
    }, [data]);

    const [show, setShow] = useState(false);

    const handleSeeLess = () => {
        setCurrentData(data.slice(0, 5));
        setShow(false);
    };

    // use for  suggested users
    const handleSeeAll = () => {
        setCurrentData(data);
        setShow(true);
    };

    // use for following users
    const [more, setMore] = useState(true);

    const handleSeeMore = () => {
        if (more) {
            setPage((prev) => prev + 1);
            setShow(true);
        } else {
            setCurrentData(data);
            setShow(true);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <p className={cx('heading')}>{heading}</p>
            {/* common */}
            {currentData.map((user) => (
                <SideAccountItem key={user.id} data={user} following={following} />
            ))}

            {loading && <UserLoader />}

            {following ? (
                more || !show ? (
                    <p onClick={handleSeeMore} className={cx('more-btn')}>
                        See more
                    </p>
                ) : (
                    <p onClick={handleSeeLess} className={cx('more-btn')}>
                        See less
                    </p>
                )
            ) : show ? (
                <p onClick={handleSeeLess} className={cx('more-btn')}>
                    See less
                </p>
            ) : (
                <p onClick={handleSeeAll} className={cx('more-btn')}>
                    See all
                </p>
            )}
        </div>
    );
}

SidebarAccounts.propTypes = {
    heading: PropTypes.string,
    following: PropTypes.bool,
};

export default SidebarAccounts;
