import qs from 'query-string';
import { HOST } from './constants/index';

const get = (path, query, method) => {
    const stringifiedQuery = qs.stringify(query);
    let url = [HOST, path, '?q=', stringifiedQuery].join('');
    const opts = { method: method };

    return fetch(url, opts)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(err => console.error('error', err));
};

export const getFollowers = owner => {
    return get(`/users/${owner}/followers`, '', 'GET');
};

// fetch(`https://api.github.com/search/repositories?q=${queryProject}+language:assembly&sort=stars&order=desc`)
export const getRepos = keyword => {
    return get(
        '/search/repositories',
        {
            q: `${keyword}+language:assembly`,
            sort: 'stars',
            order: 'desc'
        },
        'GET'
    ).then(data => data.items);
};
