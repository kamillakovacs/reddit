 window.onload = () => {
  const host = 'http://localhost:4040';
  const http = new XMLHttpRequest();
  http.open('GET', `${host}/posts`, true);
  
  http.onload = () => {
    if (http.status === 200) {
    const query = window.location.search.substring(1);
    const postList = JSON.parse(http.response).posts;
    // console.log(postList)
    const postTitle = postList[query - 1].title;
    const postURL = postList[query - 1].url;

    const formTitle = document.querySelector('.titleDiv').children[1];
    const formURL = document.querySelector('.urlDiv').children[1];
    console.log(formURL)    
    formTitle.setAttribute('value', `${postTitle}`)
    formURL.setAttribute('value', `${postURL}`)
    }
    
  }
  http.send(); 
}