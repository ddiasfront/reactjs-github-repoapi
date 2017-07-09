import axios from 'axios';

const allRepos = 'https://api.github.com/users/globocom/repos?client_id=64d7b668317a1949cd57&client_secret=551f8cb1a1118dd2df05d943343efd4c5980c258';
const commitSecureurl = '/commits?client_id=64d7b668317a1949cd57&client_secret=551f8cb1a1118dd2df05d943343efd4c5980c258';

const githubService = {
  simpleReq(requesturl) {
    return axios.get(requesturl);
  },
  getGithubdata(reponame) {
    return githubService.simpleReq(allRepos)
    .then(response => {
      return {
        allRepos: response.data.sort((a, b) => b.stargazers_count - a.stargazers_count)
      };
    })
    .then(response => {
      if (reponame === undefined) {
        return {
          allRepos: response.allRepos,
          firstDetails: response.allRepos[0],
          repoName: response.allRepos[0].name
        };
      }
      const urledRepo = response.allRepos.filter(repo => repo.name === reponame);
      return {
        allRepos: response.allRepos,
        firstDetails: urledRepo[0],
        repoName: reponame
      };
    });
  },
  getCommitsdata(reponame) {
    return githubService.simpleReq('https://api.github.com/repos/globocom/' + reponame + commitSecureurl)
    .then(response => {
      return {
        commitsRenderer: response.data
      };
    });
  }
};

export {githubService};
