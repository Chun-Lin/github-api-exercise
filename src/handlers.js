import { getFollowers } from './api';

export const getOwnersAndFollowers = (repos) => {
    return repos.map((repo) => {
        const ownerName = repo.owner.login;

        return getFollowers(ownerName).then(followers => ({
            ownerName,
            followers,
        }));
    });
};
