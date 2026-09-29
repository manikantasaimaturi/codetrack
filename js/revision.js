document.addEventListener("DOMContentLoaded",()=>{
    const box=document.getElementById("revisionList");
    const list=problems.filter(p=>p.status==="Revision");
    if(!list.length){box.innerHTML='<div class="empty">Your revision queue is empty.</div>';return;}
    list.forEach(p=>{
        const card=document.createElement("div");card.className="problem-card";
        card.innerHTML=`<h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.platform)} • ${escapeHTML(p.topic)}</p><span class="badge ${p.difficulty.toLowerCase()}">${p.difficulty}</span><p>${escapeHTML(p.notes||"No notes added.")}</p><button class="toggle-revision" data-id="${p.id}">Mark Solved</button>`;
        box.appendChild(card);
    });
    box.addEventListener("click",e=>{
        const id=Number(e.target.dataset.id);if(!id)return;
        const p=problems.find(x=>x.id===id);p.status="Solved";saveProblems();location.reload();
    });
});