let problems = JSON.parse(localStorage.getItem("codetrack_problems")) || [];

function saveProblems(){
    localStorage.setItem("codetrack_problems", JSON.stringify(problems));
}

function setupTheme(){
    const saved = localStorage.getItem("codetrack_theme");
    if(saved === "light") document.body.classList.add("light");
    const btn = document.getElementById("themeBtn");
    if(btn){
        btn.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
        btn.addEventListener("click", ()=>{
            document.body.classList.toggle("light");
            const mode = document.body.classList.contains("light") ? "light" : "dark";
            localStorage.setItem("codetrack_theme", mode);
            btn.textContent = mode === "light" ? "🌙" : "☀️";
        });
    }
}
document.addEventListener("DOMContentLoaded", setupTheme);