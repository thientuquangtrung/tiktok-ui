import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { FlagIcon, MuteSoundIcon, PauseIcon, PlayIcon, SoundIcon } from '~/components/Icons';
import { useEffect, useRef, useState } from 'react';
import { useIntersection } from '~/hooks';

const cx = classNames.bind(styles);

function Video({ data, large }) {
    const [playing, setPlaying] = useState(false);
    const [current, setCurrent] = useState('00:00');
    const [timePercent, setTimePercent] = useState(0);

    const [muted, setMuted] = useState(true);
    const [volume, setVolume] = useState(0);

    const videoRef = useRef();
    const prevVolume = useRef();

    // play video in viewport (pause when out)
    const inViewport = useIntersection(videoRef, '-240px');
    useEffect(() => {
        if (inViewport) {
            setPlaying(true);
        } else {
            setPlaying(false);
        }
    }, [inViewport]);

    // fire when video run, time video update
    const handleTimeUpdate = () => {
        if (videoRef.current.played) {
            const timeString =
                Math.floor(videoRef.current.currentTime / 60) +
                ':' +
                ('0' + Math.floor(videoRef.current.currentTime % 60)).slice(-2);

            const durationPercent = Math.floor((videoRef.current.currentTime / data.meta.playtime_seconds) * 100);

            setCurrent(timeString);
            setTimePercent(durationPercent);
        }
    };

    // handle when change the input (progress bar)
    const handleSeekBarChange = (e) => {
        const manualChange = Number(e.target.value);
        videoRef.current.currentTime = (data.meta.playtime_seconds / 100) * manualChange;
    };

    // fire when play/pause btn is clicked
    const handlePlayPause = () => {
        setPlaying((prev) => !prev);
    };

    useEffect(() => {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                if (!playing) videoRef.current.pause();
            });
        }
    }, [playing]);
    // if (playing) {
    //     videoRef.current.play();
    //     console.log(videoRef.current.played);
    // } else {
    //     const playPromise = videoRef.current.play();
    //     if (playPromise !== undefined) {
    //         playPromise.then(() => videoRef.current.pause());
    //     }
    //     // videoRef.current.pause();
    // }

    // handle sound btn is clicked (muted/unmuted)
    const handleSound = (e) => {
        if (e.target.tagName !== 'INPUT') {
            setMuted((prev) => !prev);
        }
    };

    useEffect(() => {
        if (muted) {
            videoRef.current.muted = true;
            prevVolume.current = videoRef.current.volume;
            videoRef.current.volume = 0;
        } else {
            videoRef.current.muted = false;
            videoRef.current.volume = prevVolume.current;
        }
    }, [muted]);

    // handle sound when input (progress bar) changes
    const handleVolume = (e) => {
        videoRef.current.volume = Number(e.target.value) / 100;
        if (videoRef.current.volume !== 0) {
            setMuted(false);
        } else {
            setMuted(true);
        }
    };

    return (
        <div className={cx('wrapper')}>
            
            {/* main video */}
            <video
                ref={videoRef}
                id={data.id}
                className={cx('video')}
                loop
                muted={muted}
                playsInline
                poster={data.thumb_url}
                onVolumeChange={() => setVolume(videoRef.current.volume * 100)}
                onTimeUpdate={handleTimeUpdate}
            >
                <source src={data.file_url} type="video/mp4" />
            </video>

            {/* report */}
            <div className={cx('report')}>
                <FlagIcon className={cx('icon')} />
                <span className={cx('text')}>Report</span>
            </div>

            {/* play/pause */}
            <div className={cx('play-btn')} onClick={handlePlayPause}>
                {playing ? <PauseIcon width="20px" height="20px" /> : <PlayIcon width="20px" height="20px" />}
            </div>

            {/* sound area */}
            <div className={cx('sound')} onClick={handleSound}>
                <div className={cx('sound-progress')}>
                    <div className={cx('progress-bar')}>
                        <div className={cx('track')}>
                            <div className={cx('done-track')} style={{ width: `${volume}%` }}>
                                <div className={cx('thumb')} style={{ left: `calc(${volume}% - 6px)` }}></div>
                            </div>
                        </div>
                        <input
                            type="range"
                            className={cx('progress')}
                            value={volume}
                            onChange={handleVolume}
                            step="1"
                            min="0"
                            max="100"
                        />
                    </div>
                </div>

                {/* sound icon */}
                {muted ? <MuteSoundIcon width="24px" height="24px" /> : <SoundIcon width="24px" height="24px" />}
            </div>

            {/* seek bar */}
            <div className={cx('seekbar')}>
                <div className={cx('progress-bar')}>
                    <div className={cx('track')}>
                        <div className={cx('done-track')} style={{ width: `${timePercent}%` }}>
                            <div className={cx('thumb')} style={{ left: `calc(${timePercent}% - 6px)` }}></div>
                        </div>
                    </div>
                    <input
                        type="range"
                        className={cx('progress')}
                        value={timePercent}
                        onChange={handleSeekBarChange}
                        step="1"
                        min="0"
                        max="100"
                    />
                </div>
                <div className={cx('timer')}>
                    {current}/{data.meta.playtime_string}
                </div>
            </div>
        </div>
    );
}

Video.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Video;
