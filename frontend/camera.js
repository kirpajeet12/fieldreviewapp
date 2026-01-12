window.addEventListener("DOMContentLoaded", () => {

  const fileInput = document.getElementById("photo");
  const analyzeBtn = document.getElementById("analyze");
  const output = document.getElementById("output");
  const disciplineSelect = document.getElementById("discipline");

  // 🔒 Safety check
  if (!fileInput || !analyzeBtn || !output || !disciplineSelect) {
    console.error("❌ Missing HTML element. Check IDs.");
    return;
  }

  analyzeBtn.onclick = async () => {
    const file = fileInput.files[0];
    if (!file) {
      alert("Please select an image");
      return;
    }

    output.textContent = "Analyzing image…";

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const res = await fetch("/api/ai/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            disciplineId: disciplineSelect.value,
            imageBase64: reader.result
          })
        });

        if (!res.ok) throw new Error("Server error");

        const data = await res.json();
        output.textContent = JSON.stringify(data, null, 2);

      } catch (err) {
        console.error(err);
        output.textContent = "❌ AI analysis failed";
      }
    };

    reader.readAsDataURL(file);
  };
});
