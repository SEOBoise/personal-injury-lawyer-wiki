'use strict';
(() => {
 const form=document.querySelector('.search'),input=form.querySelector('input'),panel=document.querySelector('.search-panel'),status=panel.querySelector('[role=status]'),list=panel.querySelector('ul');
 const entries=[...document.querySelectorAll('article > h2,article > h3')].map(heading=>{let text=heading.textContent,node=heading.nextElementSibling;while(node&&!/^H[23]$/.test(node.tagName)){text+=' '+node.textContent;node=node.nextElementSibling;}return {id:heading.id,title:heading.textContent,text:text.toLowerCase()};});
 const close=()=>{panel.hidden=true;};
 form.addEventListener('submit',event=>{event.preventDefault();const query=input.value.trim().toLowerCase();list.replaceChildren();if(!query){close();input.focus();return;}const words=query.split(/\s+/);const found=entries.filter(entry=>words.every(word=>entry.text.includes(word)));status.textContent=found.length?found.length+' matching section'+(found.length===1?'':'s'):'No matching sections. Try fees, evidence, or negligence.';found.slice(0,14).forEach(entry=>{const li=document.createElement('li'),a=document.createElement('a');a.href='#'+entry.id;a.textContent=entry.title;a.addEventListener('click',close);li.append(a);list.append(li);});panel.hidden=false;});
 panel.querySelector('button').addEventListener('click',()=>{close();input.focus();});input.addEventListener('input',()=>{if(!input.value)close();});document.addEventListener('keydown',event=>{if(event.key==='Escape'){close();}});document.addEventListener('click',event=>{if(!form.contains(event.target))close();});
 const contents=document.querySelector('.contents');if(matchMedia('(max-width:600px)').matches)contents.open=false;
 document.querySelector('.print').addEventListener('click',()=>window.print());
})();
