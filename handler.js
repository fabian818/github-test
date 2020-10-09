'use strict';
const { Octokit } = require("@octokit/rest");

module.exports.getCommits = async event => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });
  const repoNames = ['github-test', 'angular-test'];
  const owner = 'fabian818';
  const repos = repoNames.map(repoName => {
    return {
      name: repoName,
      commits: (await octokit.repos.listCommits({
        owner,
        repoName,
      })).data.map(obj => {
        return {
          message: obj.commit.message,
          date: obj.commit.committer.date
        };
      })
    } 
  });
  console.log(commits);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        repos: repos
      },
      null,
      2
    ),
  };
};
