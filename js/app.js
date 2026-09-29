function updateDashboard(){
    const total = problems.length;
    const easy = problems.filter(p=>p.difficulty==="Easy").length;
    const medium = problems.filter(p=>p.difficulty==="Medium").length;
    const hard = problems.filter(p=>p.difficulty==="Hard").length;
    document.getElementById("totalProblems").textContent=total;
    document.getElementById("easyProblems").textContent=easy;
    document.getElementById("mediumProblems").textContent=medium;
    document.getElementById("hardProblems").textContent=hard;
    updateTopics();
    displayRecent();
    updateGoal();
}

function updateTopics(){
    const data=[
        ["Arrays","arraysCount","arraysProgress",20],
        ["Strings","stringsCount","stringsProgress",20],
        ["Linked Lists","linkedCount","linkedProgress",15],
        ["Trees","treesCount","treesProgress",20],
        ["Graphs","graphsCount","graphsProgress",20]
    ];
    data.forEach(([name,countId,barId,target])=>{
        const solved=problems.filter(p=>p.topic===name && p.status==="Solved").length;
        document.getElementById(countId).textContent=`${solved} / ${target}`;
        document.getElementById(barId).style.width=Math.min(solved/target*100,100)+"%";
    });
}

function displayRecent(){
    const box=document.getElementById("recentProblems");
    if(!box)return;
    box.innerHTML="";
    const recent=[...problems].reverse().slice(0,6);
    if(!recent.length){box.innerHTML='<div class="empty">No problems added yet.</div>';return;}
    recent.forEach(p=>{
        const card=document.createElement("div");
        card.className="problem-card";
        card.innerHTML=`<h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.platform)} • ${escapeHTML(p.topic)}</p><span class="badge ${p.difficulty.toLowerCase()}">${p.difficulty}</span><p>Status: ${escapeHTML(p.status)}</p>`;
        box.appendChild(card);
    });
}

function updateGoal(){
    const today=new Date().toISOString().slice(0,10);
    const count=problems.filter(p=>p.status==="Solved" && p.date===today).length;
    const goal=3;
    document.getElementById("dailyProgressText").textContent=`${Math.min(count,goal)} / ${goal}`;
    document.getElementById("goalPercentage").textContent=Math.round(Math.min(count/goal,1)*100)+"%";
    const streakDates=[...new Set(problems.filter(p=>p.status==="Solved").map(p=>p.date))].sort().reverse();
    let streak=0;
    let cursor=new Date();
    for(const d of streakDates){
        const cur=cursor.toISOString().slice(0,10);
        if(d===cur){streak++;cursor.setDate(cursor.getDate()-1);}
        else if(d < cur) break;
    }
    document.getElementById("streak").textContent=streak;
    document.getElementById("longestStreak").textContent=calculateLongest(streakDates)+" days";
}

function calculateLongest(dates){
    const set=new Set(dates);let best=0;
    dates.forEach(d=>{
        const prev=new Date(d);prev.setDate(prev.getDate()-1);
        if(!set.has(prev.toISOString().slice(0,10))){
            let n=0,cur=new Date(d);
            while(set.has(cur.toISOString().slice(0,10))){n++;cur.setDate(cur.getDate()+1);}
            best=Math.max(best,n);
        }
    });
    return best;
}

function escapeHTML(value){
    return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}

document.addEventListener("DOMContentLoaded",()=>{
    if(document.getElementById("totalProblems")) updateDashboard();
});