// Registrando o service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        let reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });
        console.log('Service worker registrada! 😎', reg);
      } catch (err) {
        console.log('😥 Service worker registro falhou: ', err);
      }
    });
  }
  
  // Configurando as restrições do vídeo
  var constraints = { video: { facingMode: "user" }, audio: false };
  
  // Capturando os elementos em tela
  const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");
  
  // Inicializando a câmera
  function cameraStart() {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (stream) {
        let track = stream.getTracks()[0]; // Corrigido o uso de getTracks()
        cameraView.srcObject = stream;
      })
      .catch(function (error) {
        console.error("Ocorreu um erro ao acessar a câmera.", error);
      });
  }
  
  // Tirando uma foto
  cameraTrigger.onclick = function () {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
  };
  
  // Iniciando a câmera ao carregar a página
  window.addEventListener("load", cameraStart);
  