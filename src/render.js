export const renderOwnerAndFollowers = ownerAndFollowers => {
    const followerAvatars = ownerAndFollowers.followers.map(
        follower => follower.avatar_url
    );

    renderList(ownerAndFollowers.ownerName);
    followerAvatars.map(avatar_url => renderImg(avatar_url));
};

export const renderOwners = owners => {
    renderList(owners);
};

export const renderFollowers = followers=> {
    renderImg(followers);
};

export const renderFollower = followerName => {
    renderImg(followerName);
};

const renderList = item => {
    document.write(`<li>${item}</li>`);
};

const renderImg = url => {
    document.write(`<img src='${url}' height='42' width='42'>`);
};
