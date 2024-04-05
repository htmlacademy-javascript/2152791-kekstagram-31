const FileTypes = ['jpg', 'jpeg', 'png'];
const photoFileInput = document.getElementById('upload-file');
const uploadPhoto = document.querySelector('.img-upload__photo');

function loadPhoto() {
  const photoFile = photoFileInput.files[0];
  const fileName = photoFile.name.toLowerCase();
  const miniPreview = document.querySelectorAll('.effects__preview');

  const checkFile = FileTypes.some((it) => fileName.endsWith(it));

  if (checkFile) {
    const preloadPhotoUrl = URL.createObjectURL(photoFile);
    uploadPhoto.src = preloadPhotoUrl;
    miniPreview.forEach((photo) => {
      photo.style.backgroundImage = `url(${preloadPhotoUrl})`;
    });
  }
}

photoFileInput.addEventListener('change', loadPhoto);
