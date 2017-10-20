import { getRepos } from './api';
import { getOwnersAndFollowers } from './handlers';
import { renderOwnerAndFollowers } from './render';

const searchProjectHandler = keyword => {
    console.log(keyword);
    getRepos(keyword)
        .then(repos => Promise.all(getOwnersAndFollowers(repos)))
        .then(ownersWithFollowers =>
            ownersWithFollowers.map(ownerAndFollowers =>
                renderOwnerAndFollowers(ownerAndFollowers)
            )
        );
};

searchProjectHandler('test');
