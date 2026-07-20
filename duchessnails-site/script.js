
const menuButton=document.querySelector('.menu-button');const mainNav=document.querySelector('.main-nav');
menuButton.addEventListener('click',()=>{const open=mainNav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mainNav.classList.remove('open')));
const form=document.getElementById('bookingForm');form.addEventListener('submit',e=>{e.preventDefault();const n=document.getElementById('clientName').value.trim(),s=document.getElementById('service').value,d=document.getElementById('date').value,t=document.getElementById('time').value,x=document.getElementById('notes').value.trim();const msg=['Hello Duchessnails, I would like to request an appointment.','',`Name: ${n}`,`Service: ${s}`,`Preferred date: ${d}`,`Preferred time: ${t}`,`Design / notes: ${x||'None'}`,'','I understand that a €5 non-refundable deposit is required to secure the appointment.'].join('
');window.open(`https://wa.me/33634261455?text=${encodeURIComponent(msg)}`,'_blank','noopener');});
const pay=document.getElementById('paymentLink');pay.addEventListener('click',e=>{if(pay.getAttribute('href')==='#'){e.preventDefault();alert('The secure €5 payment link has not been added yet. Please contact Duchessnails on WhatsApp to book.');}});
document.getElementById('year').textContent=new Date().getFullYear();document.getElementById('date').min=new Date().toISOString().split('T')[0];
