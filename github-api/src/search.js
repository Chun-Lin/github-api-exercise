searchProject = () => {
  let typeProject = document.getElementById("nameForm").value;
  console.log(`typeProject:${typeProject}`);

  fetchGithubOwner(typeProject);
};

// 如果要打2隻有dependency的api要打，需要在第一個api的then裡面call fetch再then回傳資料，才能夠同時有第一個跟第二個api的資料
// fetch1().then(f1 => fetch2().then(v => {f1, f2})).then(({f1, f2}) => );

const fetchGithubOwner = queryProject => {
  console.log(`queryProject:${queryProject}`);
  let ownerName;
  // fetch repositories' owners by type repository name
  fetch(
    `https://api.github.com/search/repositories?q=${queryProject}+language:assembly&sort=stars&order=desc`
  )
    .then(responseRepository => responseRepository.json())
    .then(repository => {
      const ownerLogins = repository.items.map(item => item.owner.login);

      ownerLogins.map(owner => {
        console.log("test2");
        // fetch followers' avatars from owners
        fetch(`https://api.github.com/users/${owner}/followers`)
          .then(responseFollowers => responseFollowers.clone().json()) // response's body cannot be used twice, so clone the response and turn it in json
          .then(followers => {
            console.log(followers);
            return { owner, followers }; // return owners and their followers
          })
          .then(ownerAndFollowers => {
            // console.log(ownerAndFollowers);
            // console.log(ownerAndFollowers.owner);
            document.write(`<li>${ownerAndFollowers.owner}</li>`);

            const followerAvatars = ownerAndFollowers.followers.map(
              follower => follower.avatar_url
            );
            followerAvatars.map(avatar => {
              document.write(`<img src="${avatar} height="42" width="42">`);
            });
          });
      });
    })
    .catch(err => console.log("error"));
};
