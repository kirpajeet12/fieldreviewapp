const fileInput = document.querySelector("input[type='file']");
const analyzeBtn = document.querySelector("button");
const output = document.createElement("pre");
document.body.appendChild(output);

analyzeBtn.onclick = async () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("Select an image first");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);
  formData.append("projectId", "demo-project-1");     // TEMP
  formData.append("disciplineId", "fs");               // fs / be / pl

  try {
    const res = await fetch("/api/ai/analyze", {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    console.error(err);
    output.textContent = "❌ AI analysis failed";
  }
};
