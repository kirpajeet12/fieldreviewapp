const fileInput = document.getElementById("photo");
const analyzeBtn = document.getElementById("analyze");
const output = document.getElementById("output");
const disciplineSelect = document.getElementById("discipline");

analyzeBtn.onclick = async () => {
  const file = fileInput.files[0];
  if (!file) return alert("Select image");

  const reader = new FileReader();

  reader.onload = async () => {
    try {
      output.innerText = "Analyzing image…";

      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          disciplineId: disciplineSelect.value,
          imageBase64: reader.result
        })
      });

      const data = await res.json();
      output.innerText = JSON.stringify(data, null, 2);

    } catch (e) {
      output.innerText = "❌ AI analysis failed";
    }
  };

  reader.readAsDataURL(file);
};
