import { useState, useRef, useCallback, useEffect } from 'react';
import { VideoLoader } from '~/components/Loaders';
import MainDisplay from '~/components/MainDisplay';
import { useInfinityList } from '~/hooks';
import * as videosService from '~/services/videosService';

function Home() {
    const randomInitPage = Math.floor(Math.random() * 15) + 1;
    useEffect(() => {
        localStorage.setItem('renderHomePages', JSON.stringify([randomInitPage]));
    }, []);

    const [page, setPage] = useState(randomInitPage);

    const { data, loadMore, error, hasMore, totalPages } = useInfinityList(videosService.getVideos, {
        type: 'for-you',
        page,
    });

    const getRandomPage = () => {
        const oldRenderedPages = JSON.parse(localStorage.getItem('renderHomePages'));
        let newRenderedPages = new Set(oldRenderedPages);

        let result;
        do {
            result = Math.floor(Math.random() * totalPages) + 1;
        } while (newRenderedPages.has(result));

        if (newRenderedPages.size + 1 === totalPages) {
            newRenderedPages.clear();
        }

        newRenderedPages.add(result);
        localStorage.setItem('renderHomePages', JSON.stringify([...newRenderedPages]));

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
       <div style={{width: '692px'}}> <VideoLoader /></div>
    ) : (
        <MainDisplay ref={lastItem} data={data} loadMore={loadMore} />
    );
}

export default Home;
