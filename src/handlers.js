import { getFollowers, getRepos } from './api.js';

export const getOwnerAndFollowers = repo => {
    const ownerName = repo.owner.login;

    return getFollowers(ownerName).then(followers => ({
        ownerName,
        followers
    }));
};

export const getOwnersAndFollowers = repos => {
    return repos.map(repo => {
        const ownerName = repo.owner.login;
        return getFollowers(ownerName).then(followers => ({
            ownerName,
            followers
        }));
    });
};
