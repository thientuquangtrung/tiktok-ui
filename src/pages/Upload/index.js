import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '~/components/Button';
import Switcher from '~/components/Button/Switcher';
import { Selector } from '~/components/Selector';
import styles from './Upload.module.scss';
import * as videosService from '~/services/videosService';
import { CheckAuth } from '~/components/CheckAuth';

const cx = classNames.bind(styles);

const allowList = [
    {
        value: 'public',
        label: 'Public',
    },
    {
        value: 'friends',
        label: 'Friends',
    },
    {
        value: 'private',
        label: 'Private',
    },
];

function Upload() {
    const [videoSrc, setVideoSrc] = useState(null);
    const [thumbFrame, setThumbFrame] = useState(0);
    const [uploadFile, setUploadFile] = useState(null);

    const videoRef = useRef();

    const handleSelectFile = (e) => {
        const file = e.target.files[0];
        setUploadFile(file);

        const url = URL.createObjectURL(file);
        setVideoSrc(url);
    };

    const handleDropFile = (e) => {
        const file = e.dataTransfer.files[0];
        setUploadFile(file);

        const url = URL.createObjectURL(file);
        setVideoSrc(url);

        e.preventDefault();
    };

    const handleChangeThumbnail = (e) => {
        if (videoRef.current?.duration) {
            const thumb = (e.target.value / 100) * videoRef.current.duration;
            setThumbFrame(Math.floor(thumb));
        }
    };

    const handlePost = async () => {
        const description = document.querySelector('input[name="description"]').value;

        const fileUpload = uploadFile;

        const thumbnail = thumbFrame;

        const viewableList = document.querySelector('div[name="viewable"]');
        let viewable = '';
        for (var i of viewableList.children) {
            if (i.classList.contains('chosen')) {
                viewable = i.getAttribute('value');
                break;
            }
        }

        const allowsList = document.querySelectorAll('input[name="allows"]');
        let allows = [];
        for (var j of allowsList) {
            if (j.checked) {
                allows.push(j.value);
            }
        }

        const formData = new FormData();
        formData.append('description', description);
        formData.append('upload_file', fileUpload);
        formData.append('thumbnail_time', thumbnail);
        formData.append('viewable', viewable);
        formData.append('allows[]', allows[0]);
        formData.append('allows[]', allows[1]);
        formData.append('allows[]', allows[2]);

        try {
            const res = await videosService.upVideos(formData);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CheckAuth>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <header className={cx('header')}>
                        <div className={cx('title')}>Upload video</div>
                        <div className={cx('sub-title')}>Post a video to your account</div>
                    </header>
                    <div className={cx('body')}>
                        <div className={cx('upload')}>
                            {!videoSrc && (
                                <label
                                    className={cx('upload-card')}
                                    onDrop={handleDropFile}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDragEnter={(e) => e.preventDefault()}
                                >
                                    <input type="file" accept="video/*" onChange={handleSelectFile} />
                                    <FontAwesomeIcon icon={faCloudArrowUp} className={cx('upload-icon')} />
                                    <div className={cx('guide')}>Select video to upload</div>
                                    <div className={cx('sub-guide')}>Or drag and drop a file</div>
                                    <div className={cx('guide-desc')}>MP4 or WebM</div>
                                    <div className={cx('guide-desc')}>720x1280 resolution or higher</div>
                                    <div className={cx('guide-desc')}>Up to 30 minutes</div>
                                    <div className={cx('guide-desc')}>Less than 2 GB</div>
                                    <Button
                                        primary
                                        large
                                        className={cx('file-select-btn')}
                                        onClick={() => {
                                            document.querySelector("input[type='file']").click();
                                        }}
                                    >
                                        Select file
                                    </Button>
                                </label>
                            )}
                            {videoSrc && (
                                <div className={cx('preview')}>
                                    <video
                                        ref={videoRef}
                                        id="upload-video"
                                        src={videoSrc}
                                        controls
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={cx('editor')}>
                            <label className={cx('label')}>
                                Caption <br />
                                <input type="text" name="description" className={cx('caption')} />
                            </label>
                            <label className={cx('label')}>
                                Cover <br />
                                <input
                                    type="range"
                                    name="thumbnail_time"
                                    className={cx('cover')}
                                    min="0"
                                    max="100"
                                    step="1"
                                    onChange={handleChangeThumbnail}
                                />
                                <div style={{ marginTop: '10px', fontWeight: '400', fontSize: '14px' }}>
                                    Extract thumbnail at second: {thumbFrame}
                                </div>
                            </label>
                            <label className={cx('label')}>
                                Who can watch this video <br />
                                <Selector list={allowList} className={cx('selector')} />
                            </label>
                            <div className={cx('label')}>
                                Allow users to:
                                <div className={cx('check-wrapper')}>
                                    <label className={cx('check-label')}>
                                        <input type="checkbox" name="allows" value="comment" />
                                        <span className={cx('checkmark')}></span>
                                        Comment
                                    </label>
                                    <label className={cx('check-label')}>
                                        <input type="checkbox" name="allows" value="duet" />
                                        <span className={cx('checkmark')}></span>
                                        Duet
                                    </label>
                                    <label className={cx('check-label')}>
                                        <input type="checkbox" name="allows" value="stitch" />
                                        <span className={cx('checkmark')}></span>
                                        Stitch
                                    </label>
                                </div>
                            </div>

                            <div className={cx('copyright-check')}>
                                <div className={cx('label')}>
                                    Run a copyright check <Switcher className={cx('btn')} />
                                </div>
                                <p className={cx('desc')}>
                                    We'll check your video for potential copyright infringements on used sounds. If
                                    infringements are found, you can edit the video before posting.
                                </p>
                            </div>

                            <div className={cx('btns')}>
                                <Button squared large>
                                    Discard
                                </Button>
                                <Button primary large onClick={handlePost}>
                                    Post
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </CheckAuth>
    );
}

export default Upload;
