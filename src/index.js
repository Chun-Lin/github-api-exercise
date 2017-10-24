import co from 'co';
import { getRepos } from './api';
import { getOwnersAndFollowers } from './handlers';
import { renderOwnerAndFollowers } from './render';

function* searchProjectHandler(keyword) {
    try {
        const repos = yield getRepos(keyword);
        const ownersWithFollowers = yield Promise.all(getOwnersAndFollowers(repos));
        ownersWithFollowers.map(ownerAndFollowers => renderOwnerAndFollowers(ownerAndFollowers));
    } catch (err) {
        console.log(err);
    }
}

co(searchProjectHandler('test')).catch(err => console.error('error', err));
