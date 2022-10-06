/* eslint-disable no-restricted-globals */
import axios from 'axios';
import { loginFailed, loginStart, loginSuccess } from 'redux/Auth/authSlice';
import { changeRefreshTree } from 'redux/Refresh/refreshSlice';

export const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

//Token API call

export const getForgeToken = (callback) => {
    request
        .get('oauth/token')
        .then((res) => {
            callback(res.data.access_token);
        })
        .catch((err) => {
            console.log(err);
        });
};

// Auth Request

export const authRequest = (data, type, dispatch) => {
    dispatch(loginStart());
    request
        .post(`auth/${type}`, data)
        .then((res) => {
            dispatch(loginSuccess(res.data));
            location.reload();
        })
        .catch((err) => {
            console.log(err);
            dispatch(loginFailed());
        });
};

//Bucket API call

export const createNewBucket = (newBucket, dispatch) => {
    request
        .post('oss/bucket', newBucket)
        .then((res) => {
            alert(`Create new Bucket ${res.data}`);
            dispatch(changeRefreshTree(true));
        })
        .catch((err) => {
            console.log(err);
        });
};

export const removeBucket = (data, dispatch) => {
    request
        .delete(`oss/buckets/${data.id}`)
        .then((res) => {
            alert(res.data);
            location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
};

//Object API call

export const uploadObject = async (file, bucketId, dispatch) => {
    const formData = new FormData();
    formData.append('fileToUpload', file);
    formData.append('bucketKey', bucketId);
    request
        .post('oss/objects', formData)
        .then((res) => {
            alert('Add File successfully!');
            dispatch(changeRefreshTree(true));
        })
        .catch((err) => console.log(err));
};

export const removeObject = (data, dispatch) => {
    request
        .delete('oss/objects', {
            params: {
                bucketKey: data.parentId,
                objectKey: data.text,
            },
        })
        .then((res) => {
            alert(res.data);
            location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const translateObject = (data) => {
    request
        .post('modelderivative/jobs', {
            objectName: data.id,
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
