const renderHtml = ownerAndFollowers => {
    const followerAvatars = ownerAndFollowers.followers.map(
        follower => follower.avatar_url
    );

    document.write(`<li>${ownerAndFollowers.owner}</li>`);
    followerAvatars.map(avatar =>
        document.write(`<img src='${avatar}' height='42' width='42'>`)
    );
};

export default renderHtml;