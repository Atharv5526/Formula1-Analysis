const COL=["#4a78b5","#e8943a","#58a65c","#e15759","#f28eb1","#b07aa1","#edc948","#76b7b2"];
const $=s=>document.querySelector(s);
let view="points";
function bars(el,rows,fmt){
  const max=Math.max(...rows.map(r=>r[1])),box=$(el);
  box.innerHTML=rows.map((r,i)=>`<div class="bar"><span>${r[0]}</span><i style="--c:${COL[i%COL.length]}" data-w="${r[1]/max*100}"></i><em>${fmt?fmt(r[1]):r[1].toLocaleString()}</em></div>`).join("");
  requestAnimationFrame(()=>box.querySelectorAll("i").forEach(b=>b.style.width=b.dataset.w+"%"));
}
function sorted(a){return [...a].sort((x,y)=>view==="alpha"?x[0].localeCompare(y[0]):y[1]-x[1])}
function draw(){
  bars("#chDrivers",sorted(DATA.drivers));bars("#chTeams",sorted(DATA.teams));
  bars("#chCountry",sorted(DATA.country));bars("#chDnf",sorted(DATA.dnf),v=>v+"%");
}
document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{
  view=b.dataset.v;document.querySelectorAll(".filters button").forEach(x=>x.setAttribute("aria-pressed",x===b));draw();
});
bars("#miniTeams",DATA.teams.slice(0,5));
/* band + spotlight */
$("#band").innerHTML=[[DATA.kpi.outcomes,"Race outcomes"],[DATA.kpi.seasons,"Seasons in play"],[DATA.kpi.circuits,"Circuits showcased"],[DATA.kpi.teams,"Competing teams"]].map(k=>`<div><div class="num">${k[0].toLocaleString()}</div><div class="lab">${k[1]}</div></div>`).join("");
$("#spot").innerHTML=DATA.drivers.slice(0,4).map((d,i)=>`<div class="card"><h3>${d[0]}</h3><p>${d[1].toLocaleString()} points in the dashboard leaderboard. Rank ${i+1} of ${DATA.drivers.length} shown.</p></div>`).join("");
/* story */
const S=[["Global driver distribution","The map shows how many driver entries each Grand Prix nation has produced. The USA, Canada and Brazil lead the totals in the dashboard."],
["Country-wise participation","Entries per country range from 60 for China to 420 for the USA, showing which markets carry the calendar."],
["Team championship performance","Red Bull Racing tops the ranking at 8,006 points, ahead of Mercedes and Ferrari."],
["Driver reliability","Stacked DNF bars per driver split retirements by reason, so you can see who finishes races and why others don’t."],
["Podium achievements","Podium counts by driver and team show who converts a good grid slot into results."],
["Tyre compound usage","Starting compound split across Soft, Medium, Hard, Inter and Wet."]];
let cur=0;
function story(i){cur=i;$("#storyBody").innerHTML=`<h3>${S[i][0]}</h3><p>${S[i][1]}</p>`;
 document.querySelectorAll("#tabs button").forEach((b,j)=>b.setAttribute("aria-selected",j===i))}
$("#tabs").innerHTML=S.map((s,i)=>`<button role="tab" aria-selected="false">${s[0]}</button>`).join("");
document.querySelectorAll("#tabs button").forEach((b,i)=>b.onclick=()=>story(i));
story(0);
/* counters */
document.querySelectorAll("[data-n]").forEach(el=>{const n=+el.dataset.n,t0=performance.now();
 (function f(t){const p=Math.min((t-t0)/1200,1);el.textContent=Math.round(n*p).toLocaleString();if(p<1)requestAnimationFrame(f)})(t0)});
/* car on track */
const path=document.querySelector(".track path"),car=$("#car"),L=path.getTotalLength();
if(!matchMedia("(prefers-reduced-motion:reduce)").matches){(function lap(t){const p=path.getPointAtLength((t/6000%1)*L);car.setAttribute("cx",p.x);car.setAttribute("cy",p.y);requestAnimationFrame(lap)})(0)}
draw();
