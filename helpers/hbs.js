module.exports = {
  editIcon: function(ideaUser, loggedUser, ideaId) {
    if (ideaUser === loggedUser) {
      return `
            <a class="btn btn-warning btn-block " href="/idea/edit/${ideaId}">Edit </a>
            `;
    } else {
      return `<p  class ="text-muted"><a href="/user/login"> Login </a> to edit your idea</p>`;
    }
  }
};
