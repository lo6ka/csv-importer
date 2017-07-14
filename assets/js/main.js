const $ = (sel) => document.querySelector(sel);

window.onload = () => {
  const form = $('#file-form');
  const progressLine = $('.progress__line');
  const socket = io();

  socket.on('count', (msg) => {
    console.log(msg);
  });

  socket.on('progress', (msg) => {
    progressLine.style.width = `${500 * msg.progress}px`;
  });

  function upload() {
    const formData = new FormData(form);
    formData.append('client', socket.id);
    const headers = {
      Accept: 'application/json, */*',
    }
    const init = {
      headers,
      method: 'POST',
      body: formData
    };
    fetch('/', init).then(res => console.log(res));
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    upload();
  }
};
