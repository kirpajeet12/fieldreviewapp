const RENDER_URL = "https://YOUR-RENDER-URL.onrender.com";

function analyze() {
  const file = document.getElementById("photo").files[0];
  if (!file) return alert("Select photo");

  const reader = new FileReader();
  reader.onload = () => {
    fetch(`${RENDER_URL}/api/ai/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: reader.result })
    })
      .then(res => res.json())
      .then(data => {
        document.getElementById("aiResult").textContent =
          JSON.stringify(data, null, 2);
      });
  };
  reader.readAsDataURL(file);
}
