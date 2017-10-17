import {HOST} from './Host';

/**
 * get() is a function for getting GitHub-api info, there are three parameters to input
 * @param {*} path api url directory path
 * @param {*} query query string from user
 * @param {*} method "GET", "POST", or "Put" method
 * 
 * then return a function which append rest url string after path and query,
 * if response.status is 200, then return the response in json format
 */
const get = (path, query, method) => {
    let url = [HOST, path, "?q=", query].join("");
    const opts = { method: method };

    return (restPara = "") => {
        url = `${url}${restPara}`;
        return fetch(url, opts)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .catch(err => console.error("error", err));
    };
};

const getOwnerAndFollowers = owner => {
    return get(`/users/${owner}/followers`, "", "GET")("")
        .then(followers => ({ owner, followers })) // arrow function return object term -> (para
        .catch(err => console.error("error", err));
};

export {get , getOwnerAndFollowers}

