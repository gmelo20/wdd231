const params = new URLSearchParams(window.location.search);

const summary = document.getElementById("summary");

summary.innerHTML = `
    <p><strong>Name:</strong> ${params.get("fname")} ${params.get("lname")}</p>
    <p><strong>Email:</strong> ${params.get("email")}</p>
    <p><strong>Phone:</strong> ${params.get("phone")}</p>
    <p><strong>Organization:</strong> ${params.get("organization")}</p>
    <p><strong>Date Submitted:</strong> ${new Date(params.get("timestamp")).toLocaleString()}</p>
`;
