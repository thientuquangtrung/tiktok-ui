import { useEffect, useState } from 'react';

function useInfinityList(callbackService, param) {
    const [loadMore, setLoadMore] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        try {
            const fetchApi = async () => {
                setLoadMore(true);
                setError(false);

                const result = await callbackService(param);

                setHasMore(result.data.length > 0);
                setData((prev) => [...prev, ...result.data]);
                setTotalPages(result.meta.pagination.total_pages);
                setLoadMore(false);
            };

            fetchApi();
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }, [...Object.values(param)]);

    return { loadMore, error, data, hasMore, totalPages };
}

export default useInfinityList;
