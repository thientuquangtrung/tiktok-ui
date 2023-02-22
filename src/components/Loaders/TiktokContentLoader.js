import images from '~/assets/images';

function TiktokContentLoader({ className }) {
    return (
        <div style={{ display: 'flex', margin: '0 auto' }}>
            <img
                className={className}
                src={images.loader}
                alt="tiktokloader"
                style={{ width: '72px', margin: '0 auto' }}
            />
        </div>
    );
}

export default TiktokContentLoader;
