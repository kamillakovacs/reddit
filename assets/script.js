window.onload = () => {
  const host = 'http://localhost:3000';
  const http = new XMLHttpRequest();
  const mainContent = document.querySelector('#maincontent');
  const newPostButton = document.querySelector('#newpostbutton');

  http.open('GET', `${host}/posts`, true);
  console.log(http);
  
  http.onload = () => {
    if (http.status === 200) {
    const postList = JSON.parse(http.response).posts;
    console.log(postList)
 
    postList.forEach(post => {
      const newDiv = document.createElement('div');
      const upArrow = document.createElement('img')
      const downArrow = document.createElement('img')
      const voteCounter = document.createElement('div')
      const postColumn = document.createElement('div')
      const arrowColumn = document.createElement('div');
      const aboutColumn = document.createElement('div');
      const postLink = document.createElement('a');
      // const submission = document.createAttribute('div');
      const editPosts = document.createElement('div');
      const modifyDiv = document.createElement('div');
      const removeDiv = document.createElement('div');
      const modifyLink = document.createElement('a');
      const removeLink = document.createElement('a');

      newDiv.classList.add('newPostDiv');
      upArrow.setAttribute('src', 'assets/upvote.png');
      downArrow.setAttribute('src', 'assets/downvote.png');
      upArrow.classList.add('uparrow');
      downArrow.classList.add('downarrow');
      arrowColumn.classList.add('arrow-column');
      postColumn.classList.add('post-column');
      postLink.classList.add('post-link')
      postLink.setAttribute('href', post.url);
      postLink.setAttribute('target', "_blank");
      editPosts.classList.add('edit-posts');
      modifyLink.setAttribute('href', 'http://www.google.com');
      removeLink.setAttribute('href', 'http://www.google.com');
      
      modifyDiv.classList.add('modify-div');
      removeDiv.classList.add('remove-div');

      mainContent.appendChild(newDiv);
      newDiv.appendChild(arrowColumn)
      newDiv.appendChild(postColumn)
      arrowColumn.appendChild(upArrow)
      arrowColumn.appendChild(voteCounter);
      arrowColumn.appendChild(downArrow)
      postColumn.appendChild(postLink);
      postColumn.appendChild(editPosts);
      editPosts.appendChild(removeDiv);
      removeDiv.appendChild(removeLink);
      editPosts.appendChild(modifyDiv);
      modifyDiv.appendChild(modifyLink);

      postLink.innerText = post.title;
      modifyLink.innerText = "modify";
      removeLink.innerText = "remove";
      voteCounter.innerHTML = post.score;

      

      });
    }
  }
  http.send();
}