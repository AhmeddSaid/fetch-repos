// Main Variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-repos .get-button");
let reposData = document.querySelector(".show-data");
getButton.onclick = function () {
  getRepos();
};

// Get Repos Function
function getRepos() {
  let username = theInput.value;
  // console.log("Function getRepos");
  if (username == "") {
    // console.log("Username Must Be Entered");
    reposData.innerHTML = "<span>Please Enter Github Username</span>";
  } else {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((repos) => {
        // console.log(data);
        // Empty Container
        reposData.innerHTML = "";
        // Check If User has No Repos
        if (repos.length == 0) {
          reposData.innerHTML = "<span>No Repos Found</span>";
        } else {
          // Check If User has No Repos
          if (repos.length == 0) {
            reposData.innerHTML = "<span>No Repos Found</span>";
          } else {
            // Loop on repos
            repos.forEach((repo, i) => {
              // console.log(repo.name);
              // Create Main Div
              let mainDiv = document.createElement("div");
              // Add Class to Main Div
              mainDiv.className = "repo-box";
              // Create Repo Name Text
              let repoName = document.createTextNode(`${i + 1}- ${repo.name}`);
              // Append Text To Main Div
              mainDiv.appendChild(repoName);
              // Create Repo Link
              let theUrl = document.createElement("a");
              // add Hyper text reference "href"
              theUrl.href = repo.html_url;
              // Open in new tab
              // theUrl.target = "_Blank";
              theUrl.setAttribute("target", "_blank");
              // Create Link Text
              let theUrlText = document.createTextNode("visit");
              // Append Text To Link
              theUrl.appendChild(theUrlText);
              // Append link to mainDiv
              mainDiv.appendChild(theUrl);
              // Create Stars Count
              let starsSpan = document.createElement("span");
              // Add Class To Stars
              starsSpan.className = 'stars-count'
              // Create Stars Text
              let starsText = document.createTextNode(` Stars: ${repo.stargazers_count}`);
              // Append Stars Text To Stars Span
              starsSpan.appendChild(starsText);
              // Append Stars Span To Main Div
              mainDiv.appendChild(starsSpan);
              // Append mainDiv to Container
              reposData.appendChild(mainDiv);
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        reposData.innerHTML = "<span>Username Not Found</span>";
      });
  }
}
