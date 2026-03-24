document.getElementById("whatsappBtn").addEventListener("click", function () {
  let number = "91XXXXXXXXXX";
  let message = "Hi, I want a website";
  let url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});
