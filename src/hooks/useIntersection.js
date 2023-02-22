import { useState, useEffect } from 'react';

const useIntersection = (element, rootMargin) => {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        const elementRef = element.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setState(entry.isIntersecting);
            },
            { rootMargin },
        );

        elementRef && observer.observe(elementRef);

        return () => observer.unobserve(elementRef);
    }, []);

    return isVisible;
};

export default useIntersection;
