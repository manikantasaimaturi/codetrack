document.addEventListener("DOMContentLoaded",()=>{
    const form=document.getElementById("problemForm");
    if(!form)return;
    form.addEventListener("submit",e=>{
        e.preventDefault();
        const problem={
            id:Date.now(),
            name:document.getElementById("problemName").value.trim(),
            platform:document.getElementById("platform").value,
            difficulty:document.getElementById("difficulty").value,
            topic:document.getElementById("topic").value,
            status:document.getElementById("status").value,
            problemUrl:document.getElementById("problemUrl").value.trim(),
            notes:document.getElementById("notes").value.trim(),
            date:new Date().toISOString().slice(0,10)
        };
        problems.push(problem);
        saveProblems();
        alert("Problem added successfully!");
        location.href="problems.html";
    });
});