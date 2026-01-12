const API = "/api";

document.getElementById("loginBtn")?.addEventListener("click", () => {
  alert("Login will be added later — skipped for now");
});

document.getElementById("loadProjects").addEventListener("click", loadProjects);
document.getElementById("createProject").addEventListener("click", createProject);

async function loadProjects() {
  const res = await fetch(`${API}/projects`);
  const projects = await res.json();

  const list = document.getElementById("projectList");
  list.innerHTML = "";

  projects.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.name} (${p.id})`;
    list.appendChild(li);
  });
}

async function createProject() {
  const name = prompt("Project name?");
  if (!name) return;

  await fetch(`${API}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      client: "Default Client",
      disciplines: ["Fire Stopping", "Plumbing"]
    })
  });

  loadProjects();
}




// const RENDER_URL = "https://YOUR-RENDER-URL.onrender.com";

// // LOGIN
// function login() {
//   fetch(`${RENDER_URL}/api/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email: email.value })
//   })
//     .then(res => res.json())
//     .then(() => alert("Logged in"));
// }

// // PROJECTS
// function loadProjects() {
//   fetch(`${RENDER_URL}/api/projects`)
//     .then(res => res.json())
//     .then(projects => {
//       const ul = document.getElementById("projects");
//       ul.innerHTML = "";
//       projects.forEach(p => {
//         const li = document.createElement("li");
//         li.innerText = p.name;
//         ul.appendChild(li);
//       });
//     });
// }

// function createProject() {
//   fetch(`${RENDER_URL}/api/projects`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       name: name.value,
//       client: client.value,
//       discipline: discipline.value
//     })
//   })
//     .then(res => res.json())
//     .then(() => {
//       alert("Project Created");
//       location.href = "index.html";
//     });
// }

// // REPORT
// function loadReport() {
//   const frId = prompt("Enter Field Review ID");
//   fetch(`${RENDER_URL}/api/field-reviews/report/${frId}`)
//     .then(res => res.json())
//     .then(data => {
//       document.getElementById("report").textContent =
//         JSON.stringify(data, null, 2);
//     });
// }
