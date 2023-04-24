const cameraSelect = document.getElementById('camera-select');
const refreshButton = document.getElementById('refresh-button');
const image = document.getElementById('image');
const brightnessSlider = document.getElementById('brightness-slider');
const contrastSlider = document.getElementById('contrast-slider');

// 监听选择摄像头变化事件
cameraSelect.addEventListener('change', () => {
  refreshImage();
});

// 监听刷新按钮点击事件
refreshButton.addEventListener('click', () => {
  refreshImage();
});

// 更新图像
function refreshImage() {
  const camera = cameraSelect.value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/get_image?camera=${camera}`);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    if (xhr.status === 200) {
      const imageURL = window.URL.createObjectURL(xhr.response);
      image.src = imageURL;
    }
  };
  xhr.send();
}

// 监听亮度和对比度调整事件
brightnessSlider.addEventListener('input', () => {
  const brightness = brightnessSlider.value;
  image.style.filter = `brightness(${brightness}%) contrast(${contrastSlider.value}%)`;
});

contrastSlider.addEventListener('input', () => {
  const contrast = contrastSlider.value;
  image.style.filter = `brightness(${brightnessSlider.value}%) contrast(${contrast}%)`;
});
