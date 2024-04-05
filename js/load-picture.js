const FileTypes = ['jpg', 'jpeg', 'png'];
const photoFileInput = document.getElementById('upload-file');
const uploadPhoto = document.querySelector('.img-upload__photo');

function loadPhoto() {
  const photoFile = photoFileInput.files[0];
  const fileName = photoFile.name.toLowerCase();

  const checkFile = FileTypes.some((it) => fileName.endsWith(it));

  if (checkFile) {
    uploadPhoto.src = URL.createObjectURL(photoFile);
  }
}

photoFileInput.addEventListener('change', loadPhoto);
