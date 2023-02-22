import ContentLoader from 'react-content-loader';
function VideoLoader(props) {
    return (
        <ContentLoader
            speed={2}
            width={476}
            height={124}
            viewBox="0 0 476 124"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="76" y="11" rx="3" ry="3" width="88" height="6" />
            <rect x="76" y="33" rx="3" ry="3" width="52" height="6" />
            <circle cx="35" cy="31" r="29" />
            <rect x="12" y="71" rx="6" ry="6" width="378" height="15" />
            <rect x="12" y="97" rx="6" ry="6" width="378" height="15" />
        </ContentLoader>
    );
}

export default VideoLoader;
