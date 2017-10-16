import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import qs from "querystring";

const searchProject = () => {
    const typeProject = document.getElementById("nameInput").value;

    fetchGithubOwnerAndFollowers(typeProject);
};


// // get function refactor
// const path = `/users/${v}/followers`
// const get = (path, query) => {
//     const url = [HOST, path, '?', qs.stringify(query)].join('')
//     return fetch(url, {method: 'GET'})
//         .then(res => {
//             return res.json()
//         })
//         .catch(err => console.error('error', err))
// }

const HOST = "https://api.github.com";

const getOwners = (path, query) => {
    // https://api.github.com/search/repositories?q=${queryProject}+language:assembly&sort=stars&order=desc
    let parsed = {
        q: `${query}+language:assembly`,
        sort: "stars",
        order: "desc"
    };

    const stringified = qs.stringify(parsed);
    const url = `${HOST}${path}?${stringified}`;   
    // const opts = { method: "POST" };
    return fetch(url)
        .then(res => {
            // maybe some http code check
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(err => console.error("error", err));
};

const getFollowers = (path, query) => {
    const url = `${HOST}${path}/${query}/followers`;
    const opts = { method: "GET" };
    return fetch(url, opts)
        .then(res => {
            // maybe some http code check
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(err => console.error("error", err));
};

const renderHtml = ownerAndFollowers => {
    const followerAvatars = ownerAndFollowers.followers.map(
        follower => follower.avatar_url
    );
    
    document.write(`<li>${ownerAndFollowers.owner}</li>`);
    followerAvatars.map(avatar =>
        document.write(`<img src='${avatar}' height='42' width='42'>`)
    );
};

const getOwnerAndFollowers = owner => {
    // fetch(`https://api.github.com/users/${owner}/followers`)
    return getFollowers("/users", owner)
        .then(followers => {
            return { owner, followers };
        })
        .catch(err => console.error("error", err));
};

// // ownerAndFollowers and render
// const renderUser = ownerAndFollowers => renderHtml(ownerAndFollowers)

// const fetchGithubOwnerAndFollowers = queryProject => {
//     console.log(`queryProject:${queryProject}`);
//     // fetch repositories owners by type repository name
//     // fetch(`https://api.github.com/search/repositories?q=${queryProject}+language:assembly&sort=stars&order=desc`)
//     getOwners("/search/repositories", queryProject)
//         .then(repository => {
//             console.log(repository);
//             const usersInfo = repository.items
//             const ownerNames = usersInfo.map(user => user.owner.login);
//             ownerNames.map(name => getOwnerAndFollowers(name).then(renderUser));
//         })
//         .catch(err => console.log(err));
// };

const fetchGithubOwnerAndFollowers = queryProject => {
    // fetch repositories' owners by type repository name
    // fetch(`https://api.github.com/search/repositories?q=${queryProject}+language:assembly&sort=stars&order=desc`)
    getOwners("/search/repositories", queryProject)
        .then(repository => {
            const ownerLogins = repository.items.map(item => item.owner.login);
            
            ownerLogins.map(owner => {
                getOwnerAndFollowers(owner).then(ownerAndFollowers => {
                    renderHtml(ownerAndFollowers);
                });
            });
        })
        .catch(err => console.log(err));
};

document
    .getElementById("buttonSearch")
    .addEventListener("click", searchProject());

// 如果要打2隻有dependency的api要打，需要在第一個api的then裡面call fetch再then回傳資料，才能夠同時有第一個跟第二個api的資料
// fetch1().then(f1 => fetch2().then(v => {f1, f2})).then(({f1, f2}) => );

