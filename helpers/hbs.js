module.exports = {
  editIcon: function(ideaUser, loggedUser, ideaId) {
    if (ideaUser === loggedUser) {
      return `
            <a class="btn orange " href="/idea/edit/${ideaId}">Edit </a>
            `;
    } else {
      return ` `;
    }
  }
};
