document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const profile = document.querySelector(".header .flex .profile");
  const searchForm = document.querySelector(".header .flex .search-form");
  const menuBtn = document.querySelector("#menu-btn");
  const userBtn = document.querySelector("#user-btn");
  const searchBtn = document.querySelector("#search-btn");
  const sideBar = document.querySelector(".side-bar");

  if (userBtn && profile) {
    userBtn.addEventListener("click", () => {
      profile.classList.toggle("active");
      searchForm?.classList.remove("active");
    });
  }

  if (searchBtn && searchForm) {
    searchBtn.addEventListener("click", () => {
      searchForm.classList.toggle("active");
      profile?.classList.remove("active");
    });
  }

  if (menuBtn && sideBar) {
    menuBtn.addEventListener("click", () => {
      sideBar.classList.toggle("active");
      body.classList.toggle("active");
    });
  }

  window.addEventListener("scroll", () => {
    profile?.classList.remove("active");
    searchForm?.classList.remove("active");
    if (window.innerWidth < 1200 && sideBar) {
      sideBar.classList.remove("active");
      body.classList.remove("active");
    }
  });

  // Supervisor Allocation Logic
  const groupData = JSON.parse(localStorage.getItem("generatedGroups")) || [];
  const container = document.getElementById("groupList");

  if (container && groupData.length > 0) {
    groupData.forEach((group, index) => {
      const div = document.createElement("div");
      div.classList.add("group-box");
      div.innerHTML = `
        <h3>Group ${group.groupId}</h3>
        <ul>
          ${group.students
            .map(
              (s, i) => `<li>${s} (${group.gender[i]}, CGPA: ${group.cgpa[i]})</li>`
            )
            .join("")}
        </ul>
        <label for="supervisor${index}">Select Supervisor:</label>
        <select id="supervisor${index}" name="supervisor${index}" required>
          <option value="">-- Select --</option>
          <option value="risala">Dr. Risala Tasin Khan</option>
          <option value="kaiser">Dr. M. Shamim Kaiser</option>
          <option value="mehrin">Mehrin Anannya</option>
        </select>
      `;
      container.appendChild(div);
    });
  }

  const form = document.getElementById("supervisorForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const allocations = groupData.map((group, index) => {
        const supervisor = document.getElementById(`supervisor${index}`)?.value || "";
        return {
          groupId: group.groupId,
          students: group.students,
          supervisor: supervisor,
        };
      });

      console.log("Final Allocations:", allocations);
      alert("Supervisor allocation complete!");
    });
  }
});
