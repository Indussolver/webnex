// WhatsApp button
document.getElementById("whatsappBtn").addEventListener("click", function () {
  let number = "91XXXXXXXXXX"; // apna number daalo
  let message = "Hi, I want a website for my business.";
  
  let url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

// Smooth scroll
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});