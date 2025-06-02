// validateComment.js
const minCommentLength = 5; // Set your desired minimum length here

function validateCommentLength(commentInput, commentLengthError) {
  const commentValue = commentInput.value.trim();
  if (commentValue.length < minCommentLength) {
    commentLengthError.style.display = "block";
    commentInput.classList.add("is-invalid");
    return false;
  } else {
    commentLengthError.style.display = "none";
    commentInput.classList.remove("is-invalid");
    return true;
  }
}

function setupCommentValidation(formId, commentId, commentLengthErrorId) {
  const form = document.getElementById(formId);
  const commentInput = document.getElementById(commentId);
  const commentLengthError = document.getElementById(commentLengthErrorId);

  commentInput.addEventListener("input", () =>
    validateCommentLength(commentInput, commentLengthError)
  ); // Validate on input change

  form.addEventListener("submit", (event) => {
    if (
      !form.checkValidity() ||
      !validateCommentLength(commentInput, commentLengthError)
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
  });
}

module.exports = {
  setupCommentValidation,
};
