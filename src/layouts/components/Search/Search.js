import { useEffect, useRef, useState } from 'react';
import className from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import * as searchService from '~/services/searchService.js';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { AccountItem } from '~/components/AccountItem';
import styles from './Search.module.scss';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';

const cx = className.bind(styles);

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);

    const searchRef = useRef();

    const debounceValue = useDebounce(searchInput, 500);

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResults([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchService.search(debounceValue);

            setSearchResults(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounceValue]);

    const handleClear = () => {
        searchRef.current.focus();
        setSearchInput('');
        setSearchResults([]);
    };

    const handleInputChange = (e) => {
        if (e.target.value.startsWith(' ')) {
            return;
        }
        setSearchInput(e.target.value);
    };

    return (
        <TippyHeadless
            interactive
            visible={showResults && searchResults.length > 0}
            render={(attrs) => (
                <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Acccount</h4>
                        {searchResults.map((result) => (
                            <AccountItem
                                avaW="40px"
                                avaH="40px"
                                key={result.id}
                                data={result}
                                onClick={() => setShowResults(false)}
                            />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={() => setShowResults(false)}
        >
            <div className={cx('search')}>
                <input
                    ref={searchRef}
                    value={searchInput}
                    type="text"
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onChange={handleInputChange}
                    onFocus={() => setShowResults(true)}
                />

                {!!searchInput && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    <SearchIcon width="2.4rem" height="2.4rem" />
                </button>
            </div>
        </TippyHeadless>
    );
}

export default Search;
