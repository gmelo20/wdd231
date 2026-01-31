// timestamp
document.getElementById("timestamp").value = new Date().toISOString();

// modals
document.querySelectorAll("[data-modal]").forEach(btn=>{
    btn.onclick=()=>document.getElementById(btn.dataset.modal).showModal();
});

document.querySelectorAll(".close").forEach(btn=>{
    btn.onclick=()=>btn.closest("dialog").close();
});
