function renderProblems(list){
    const box=document.getElementById("allProblems");
    box.innerHTML="";
    if(!list.length){box.innerHTML='<div class="empty">No matching problems found.</div>';return;}
    list.forEach(p=>{
        const card=document.createElement("div");
        card.className="problem-card";
        card.innerHTML=`<h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.platform)} • ${escapeHTML(p.topic)}</p><span class="badge ${p.difficulty.toLowerCase()}">${p.difficulty}</span><p>Status: ${escapeHTML(p.status)}</p>${p.problemUrl?`<a class="btn" href="${encodeURI(p.problemUrl)}" target="_blank" rel="noopener">Open Problem</a>`:""}<br><button class="toggle-revision" data-id="${p.id}">${p.status==="Revision"?"Mark Solved":"Move to Revision"}</button><button class="delete" data-id="${p.id}">Delete</button>`;
        box.appendChild(card);
    });
}

function filter(){
    const s=document.getElementById("searchInput").value.toLowerCase();
    const t=document.getElementById("topicFilter").value;
    const d=document.getElementById("difficultyFilter").value;
    const st=document.getElementById("statusFilter").value;
    renderProblems(problems.filter(p=>
        p.name.toLowerCase().includes(s) &&
        (t==="all"||p.topic===t) &&
        (d==="all"||p.difficulty===d) &&
        (st==="all"||p.status===st)
    ));
}

document.addEventListener("DOMContentLoaded",()=>{
    renderProblems(problems);
    ["searchInput","topicFilter","difficultyFilter","statusFilter"].forEach(id=>document.getElementById(id).addEventListener(id==="searchInput"?"input":"change",filter));
    document.getElementById("allProblems").addEventListener("click",e=>{
        const id=Number(e.target.dataset.id);
        if(!id)return;
        if(e.target.classList.contains("delete")){
            problems=problems.filter(p=>p.id!==id);saveProblems();filter();
        }
        if(e.target.classList.contains("toggle-revision")){
            const p=problems.find(x=>x.id===id);
            p.status=p.status==="Revision"?"Solved":"Revision";
            saveProblems();filter();
        }
    });
});