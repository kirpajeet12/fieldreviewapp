const analyzeBtn = document.getElementById("analyzeBtn");
const output = document.getElementById("output");
const photoInput = document.getElementById("photoInput");

analyzeBtn.onclick = async () => {
  const file = photoInput.files[0];
  if (!file) return alert("Select a photo");

  const reader = new FileReader();
  reader.onload = async () => {
    const res = await fetch("http://localhost:3001/api/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: reader.result })
    });

    const data = await res.json();
    output.textContent = JSON.stringify(data, null, 2);
  };
  reader.readAsDataURL(file);
};
