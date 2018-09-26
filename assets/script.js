window.onload = () => {
  const host = 'http://localhost:3000';
  const http = new XMLHttpRequest();
  const mainContent = document.querySelector('#maincontent');
  
  http.open('GET', `${host}/posts`, true);
  console.log(http);
  
  http.onload = () => {
    if (http.status === 200) {
    const postList = JSON.parse(http.response).posts;
    console.log(postList)
 
    postList.forEach(post => {
      let newDiv = document.createElement('div');
      let postTitle = document.createElement('h3');
      let upArrow = document.createElement('img')
      let downArrow = document.createElement('img')
      const postColumn = document.createElement('div')
      const arrowColumn = document.createElement('div')

      newDiv.classList.add('newPostDiv');
      upArrow.setAttribute('src', 'assets/upvote.png');
      downArrow.setAttribute('src', 'assets/downvote.png');
      upArrow.classList.add('uparrow');
      downArrow.classList.add('downarrow');
      arrowColumn.classList.add('arrow-column')
      postColumn.classList.add('post-column')

      mainContent.appendChild(newDiv);
      newDiv.appendChild(arrowColumn)
      newDiv.appendChild(postColumn)
      arrowColumn.appendChild(upArrow)
      arrowColumn.appendChild(downArrow)
      postColumn.appendChild(postTitle);

      postTitle.innerText = post.title;
      });
    }
  }
  http.send();
}