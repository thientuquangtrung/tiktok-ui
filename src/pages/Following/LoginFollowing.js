import { useState, useRef, useCallback, useEffect } from 'react';
import { VideoLoader } from '~/components/Loaders';
import MainDisplay from '~/components/MainDisplay';
import { useInfinityList } from '~/hooks';
import * as videosService from '~/services/videosService';

function LoginFollowing() {

    const randomInitPage = 1
    useEffect(() => {
        localStorage.setItem('renderFollowingPages', JSON.stringify([randomInitPage]));
    }, []);

    const [page, setPage] = useState(randomInitPage);

    const { data, loadMore, error, hasMore, totalPages } = useInfinityList(videosService.getVideos, {
        type: 'following',
        page,
    });

    const getRandomPage = () => {
        const oldRenderedPages = JSON.parse(localStorage.getItem('renderFollowingPages'));
        let newRenderedPages = new Set(oldRenderedPages);

        if (newRenderedPages.size === totalPages) {
            newRenderedPages.clear();
        }

        let result;
        do {
            result = Math.floor(Math.random() * totalPages) + 1;
        } while (newRenderedPages.has(result));

        newRenderedPages.add(result);
        localStorage.setItem('renderFollowingPages', JSON.stringify([...newRenderedPages]));

        return result;
    };

    const observer = useRef();
    const lastItem = useCallback(
        (node) => {
            if (loadMore) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage(getRandomPage);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loadMore, hasMore],
    );

    return loadMore && page === randomInitPage ? (
        <VideoLoader />
    ) : (
        <MainDisplay ref={lastItem} data={data} loadMore={loadMore} />
    );
}

export default LoginFollowing;
