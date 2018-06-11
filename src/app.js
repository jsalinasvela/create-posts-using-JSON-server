import { http } from './http';
import { ui } from './ui';

//Get post on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

//Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit)

function getPosts(){
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

//Submit post
function submitPost(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  
  const data = {
    title,
    body
  }

  //Validate input
  if (title === '' || body === ''){

    ui.showAlert('Please fill in all fields', 'alert alert-danger');

  } else {
    //check for id
    if(id.value === ''){
       //Create Post
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));

    } else {
      //Update post
      http.put(`http://localhost:3000/posts/${id.value}`, data)
      .then(data => {
        ui.showAlert('Post updated', 'alert alert-success');
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err));
    }
   
  }

}

//Enable edit state
function enableEdit(e){
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    }

    //Fill form with current post
    ui.fillForm(data);
  }
  e.preventDefault();
}

//CAncel edit state
function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormState('add');
  }

  e.preventDefault();
}