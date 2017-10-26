import { getRepos } from './api';
import { getOwnersAndFollowers } from './handlers';
import { renderOwnerAndFollowers } from './render';

async function searchProjectHandler(keyword) {
    const repos = await getRepos(keyword);
    const ownersWithFollowers = await Promise.all(getOwnersAndFollowers(repos));
    ownersWithFollowers.map(ownerAndFollowers => renderOwnerAndFollowers(ownerAndFollowers));
}

searchProjectHandler('test').catch(err => console.error('error', err));
