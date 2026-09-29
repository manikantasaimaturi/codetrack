document.addEventListener("DOMContentLoaded",()=>{
    const total=problems.length;
    const solved=problems.filter(p=>p.status==="Solved").length;
    const revision=problems.filter(p=>p.status==="Revision").length;
    document.getElementById("aTotal").textContent=total;
    document.getElementById("aSolved").textContent=solved;
    document.getElementById("aRevision").textContent=revision;
    document.getElementById("aCompletion").textContent=(total?Math.round(solved/total*100):0)+"%";

    const topics=["Arrays","Strings","Linked Lists","Stack","Queue","Trees","Graphs","Dynamic Programming"];
    const topicBox=document.getElementById("topicAnalytics");
    topics.forEach(t=>{
        const n=problems.filter(p=>p.topic===t).length;
        const pct=total?Math.round(n/total*100):0;
        topicBox.innerHTML+=`<div class="analytics-row"><div class="bar-label"><span>${t}</span><span>${n}</span></div><div class="bar"><div style="width:${pct}%"></div></div></div>`;
    });

    const diffs=["Easy","Medium","Hard"];
    const diffBox=document.getElementById("difficultyAnalytics");
    diffs.forEach(d=>{
        const n=problems.filter(p=>p.difficulty===d).length;
        const pct=total?Math.round(n/total*100):0;
        diffBox.innerHTML+=`<div class="analytics-row"><div class="bar-label"><span>${d}</span><span>${n}</span></div><div class="bar"><div style="width:${pct}%"></div></div></div>`;
    });
});