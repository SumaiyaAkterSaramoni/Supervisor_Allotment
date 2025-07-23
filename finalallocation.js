document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("finalTableBody");
  const finalAllocations = JSON.parse(localStorage.getItem("finalAllocations")) || [];

  if (finalAllocations.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='3'>No allocations found. Please assign supervisors first.</td></tr>";
    return;
  }

  finalAllocations.forEach(allocation => {
    const studentList = allocation.students.map(name => `<li>${name}</li>`).join("");
    const row = `
      <tr>
        <td>${allocation.groupId}</td>
        <td><ul>${studentList}</ul></td>
        <td>${allocation.supervisor}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
});
