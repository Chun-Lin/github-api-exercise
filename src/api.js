import qs from 'query-string';
import { HOST } from './constants/index';

const get = (path, query) => {
    const stringifiedQuery = qs.stringify(query);
    const url = [HOST, path, '?', stringifiedQuery].join('');

    return fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error('status is not 200');
            } else {
                return res.json();
            }
        })
        .catch(err => console.error('error', err));
};

export const getFollowers = owner => get(`/users/${owner}/followers`, '');

// fetch(`https://api.github.com/search/repositories?q=${queryProject}+language:assembly&sort=stars&order=desc`)
export const getRepos = keyword =>
    get('/search/repositories', {
        q: `${keyword}+language:assembly`,
        sort: 'stars',
        order: 'desc',
    }).then(data => data.items);
