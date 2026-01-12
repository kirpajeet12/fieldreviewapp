const API = "/api";

document.getElementById("loadProjects").addEventListener("click", loadProjects);
document.getElementById("createProject").addEventListener("click", createProject);

async function loadProjects() {
  const res = await fetch(`${API}/projects`);
  const projects = await res.json();

  const list = document.getElementById("projectList");
  list.innerHTML = "";

  if (projects.length === 0) {
    list.innerHTML = "<li>No projects yet</li>";
    return;
  }

  projects.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.name} | ${p.client || "No client"} | ${p.id}`;
    list.appendChild(li);
  });
}

async function createProject() {
  const name = prompt("Project name?");
  if (!name) return;

  const res = await fetch(`${API}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      client: "Test Client",
      disciplines: ["Fire Stopping", "Plumbing"]
    })
  });

  if (!res.ok) {
    alert("Error creating project");
    return;
  }

  loadProjects();
}
