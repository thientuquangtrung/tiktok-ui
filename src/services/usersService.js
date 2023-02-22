import * as request from '~/utils/makeRequest';

export const getSuggested = async (page, perPage) => {
    try {
        const res = await request.get('users/suggested', {
            params: {
                page,
                per_page: perPage,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getFollowing = async (page) => {
    try {
        const res = await request.get('me/followings', {
            params: {
                page,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getAnUser = async (nickname) => {
    try {
        const res = await request.get(`users/${nickname}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const followAnUser = async (id) => {
    try {
        const res = await request.post(`users/${id}/follow`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const unFollowAnUser = async (id) => {
    try {
        const res = await request.post(`users/${id}/unfollow`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
