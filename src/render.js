export const renderOwnerAndFollowers = ownerAndFollowers => {
    const followerAvatars = ownerAndFollowers.followers.map(
        follower => follower.avatar_url
    );

    renderList(ownerAndFollowers.ownerName);
    followerAvatars.map(avatar => renderImg(avatar));
};

export const renderOwners = ownerAndFollowers => {
    renderList(ownerAndFollowers.ownerName);
};

export const renderFollowers = ownerAndFollowers => {
    const followerAvatars = ownerAndFollowers.followers.map(
        follower => follower.avatar_url
    );

    followerAvatars.map(avatar => renderImg(followerAvatars));
};

export const renderFollower = (ownerAndFollowers, followerName) => {
    const followerAvatars = ownerAndFollowers.followers.map(follower => {
        if (follower.login === followerName) {
            return follower.avatar_url;
        }
    });

    followerAvatars.map(avatar => renderImg(followerAvatars));
};

const renderList = ownerName => {
    document.write(`<li>${ownerName}</li>`);
};

const renderImg = avatar => {
    document.write(`<img src='${avatar}' height='42' width='42'>`);
};
