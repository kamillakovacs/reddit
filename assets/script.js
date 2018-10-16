window.onload = () => {
  const host = 'http://localhost:4040';
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
      const upButton = document.createElement('button');
      const downButton = document.createElement('button');
      const voteCounter = document.createElement('div')
      const postColumn = document.createElement('div')
      const arrowColumn = document.createElement('div');
      const aboutColumn = document.createElement('div');
      const postLink = document.createElement('a');
      const editPosts = document.createElement('div');
      const modifyDiv = document.createElement('div');
      const removeDiv = document.createElement('div');
      const modifyLink = document.createElement('button');
      const removeLink = document.createElement('button');

      newDiv.classList.add(`newPostDiv${post.id}`, 'newPostDiv');
      upButton.classList.add('upbutton')
      downButton.classList.add('downbutton');
      arrowColumn.classList.add('arrow-column');
      postColumn.classList.add('post-column');
      postLink.classList.add('post-link')
      postLink.setAttribute('href', post.url);
      postLink.setAttribute('target', "_blank");
      editPosts.classList.add('edit-posts');
      modifyLink.classList.add('modify-div');
      removeLink.classList.add('remove-div');

      mainContent.appendChild(newDiv);
      newDiv.appendChild(arrowColumn)
      newDiv.appendChild(postColumn)
      arrowColumn.appendChild(upButton);
      arrowColumn.appendChild(voteCounter);
      arrowColumn.appendChild(downButton);
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

      upButton.addEventListener('click', () => {
        fetch(`${host}/posts/${post.id}/upvote`, {
          method: 'put',
        }).then((resp) => (resp.body))
        voteCounter.textContent++;
        })

      downButton.addEventListener('click', () => {
        fetch(`${host}/posts/${post.id}/downvote`, {
          method: 'put',
        }).then((resp) => (resp.body))
        voteCounter.textContent--;
        })

      removeLink.addEventListener('click', () => {
        let removeThis = document.querySelector(`.newPostDiv${post.id}`);
        mainContent.removeChild(removeThis);
        fetch(`${host}/posts/${post.id}`, {
          method: 'delete',
        }).then((resp) => (resp.body))
        })
      });
    }
  }
  http.send();
}