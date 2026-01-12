// camera.js

const fileInput = document.getElementById("photoInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const outputDiv = document.getElementById("aiOutput");

analyzeBtn.addEventListener("click", async () => {
  if (!fileInput.files.length) {
    alert("Please select an image first");
    return;
  }

  outputDiv.innerHTML = "⏳ Analyzing image...";

  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  try {
    const res = await fetch("/api/ai/analyze", {
      method: "POST",
      body: formData
      // ❗ DO NOT set headers manually for FormData
    });

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();

    outputDiv.innerHTML = `
      <h3>AI Analysis</h3>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
  } catch (err) {
    console.error(err);
    outputDiv.innerHTML = "❌ AI analysis failed";
  }
});
