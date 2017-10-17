import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import qs from "querystring";
import {get} from './getInfo';
import {getOwnerAndFollowers} from './getInfo';
import renderHtml from './render';

const searchProject = () => {
    const typeProject = document.getElementById("nameInput").value;
    
    fetchGithubOwnerAndFollowers(typeProject);
};

const fetchGithubOwnerAndFollowers = queryProject => {
    // fetch repositories' owners by type repo name
    // fetch(`https://api.github.com/search/repositories?q=${queryProject}+language:assembly&sort=stars&order=desc`)
    get("/search/repositories", "test", "GET")("+language:assembly&sort=stars&order=desc")
        .then(repo => {
            let ownerInfos = repo.items;
            const ownerNames = ownerInfos.map(
                ownerInfo => ownerInfo.owner.login
            );

            ownerNames.map(ownerName => getOwnerAndFollowers(ownerName)
                    .then(ownerAndFollowers => renderHtml(ownerAndFollowers))
            );
        })
        .catch(err => console.log(err));
};

document
    .getElementById("buttonSearch")
    .addEventListener("click", searchProject());

// 如果要打2隻有dependency的api要打，需要在第一個api的then裡面call fetch再then回傳資料，才能夠同時有第一個跟第二個api的資料
// fetch1().then(f1 => fetch2().then(v => {f1, f2})).then(({f1, f2}) => );
