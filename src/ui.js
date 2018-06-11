class UI {
  constructor(){
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postsubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  showPosts(posts){
    let output = '';

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `
    });

    this.post.innerHTML = output;
  }

  showAlert(message, className){
    this.clearAlert();
    //Create div
    const div = document.createElement('div');
    //Add classes
    div.className = className;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.postsContainer');
    //get posts
    const posts = document.querySelector('#posts');
    //Insert the alert div
    container.insertBefore(div, posts);
    //timeout
    setTimeout(()=>{
      this.clearAlert()
    }, 2000);
  }

  clearAlert(){
    const currentAlert = document.querySelector('.alert');
    if(currentAlert){
      currentAlert.remove();
    }
  }

  clearFields(){
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id

    this.changeFormState('edit');
  }

  clearIdInput(){
    this.idInput.value = '';
  }

  //Change form state
  changeFormState(type){
    if(type === 'edit'){
      this.postsubmit.textContent = 'Update Post';
      this.postsubmit.className = 'post-submit btn btn-warning btn-block';

      //Create cancel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel edit'));

      //Get parent
      const cardForm = document.querySelector('.card-form');
      //get element to insert before
      const formEnd = document.querySelector('.form-end');
      //Insert cancel button
      cardForm.insertBefore(button, formEnd);

    } else {
      this.postsubmit.textContent = 'Post It';
      this.postsubmit.className = 'post-submit btn btn-primary btn-block';
      //remove cancel button
      if(document.querySelector('.post-cancel')){
        document.querySelector('.post-cancel').remove();
      }
      //Clear ID from hidden field
      this.clearIdInput();
      //Clear text
      this.clearFields();
    }
  }
}

export const ui = new UI();