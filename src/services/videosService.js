import * as request from '~/utils/makeRequest';

export const getVideos = async (param) => {
    try {
        const res = await request.get('videos', {
            params: {
                ...param,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const upVideos = async (body) => {
    try {
        const res = await request.post('videos', body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
