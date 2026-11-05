(function(){
// Keep answers limited to general company information. Staff credentials,
// client names and technical or regulatory advice require verification.
function getReply(msg) {
  const m = msg.toLowerCase();
  const c = window.EFD_CONFIG || {};
  const contact = 'Mobile / WhatsApp: ' + (c.whatsappDisplay || '0773 148 295') +
    '\nSecondary mobile / WhatsApp: ' + (c.whatsappSecondaryDisplay || '0719 148 295') +
    '\nOffice: ' + (c.phoneDisplay || '0242 488270 / 1 / 2 / 3') +
    '\nEmail: ' + (c.email || 'info@extremefire.co.zw');
  if (/\b(hello|hi|hey)\b/.test(m)) return 'Hello! How can we help with your fire protection enquiry?';
  if (/\b(contact|phone|call|email|address|location|whatsapp|quote|price|cost)\b/.test(m)) return contact + '\nAddress: 21566 Damofalls Industrial Area, Harare, Zimbabwe.';
  if (/\b(service|services|sprinkler|alarm|maintenance|installation|design)\b/.test(m)) return 'We provide fire protection design, installation, inspection and maintenance services. Contact us to discuss your project.\n\n' + contact;
  return 'For information about our team, experience, clients, standards or your specific fire safety requirements, please contact us directly.\n\n' + contact;
}

const chatStyle = document.createElement('style');
chatStyle.textContent = `
#chat-close{width:100%;padding:10px;border-radius:0 0 16px 16px;background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.5);font-size:1rem;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;border-top:1px solid rgba(255,255,255,0.08)}
#chat-close:hover{background:rgba(255,255,255,0.1);color:#fff}
#chat-header span{flex:1}
`;
document.head.appendChild(chatStyle);

const chatHTML = `
<div id="chat-widget">
  <button id="chat-toggle" aria-label="Open chat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button>
  <div id="chat-panel">
    <div id="chat-header"><span>Extreme Fire Design Assistant</span></div>
    <div id="chat-messages"><div class="chat-msg bot">Hi! Welcome to Extreme Fire Design Inc. How can I help you with fire protection today?</div></div>
    <form id="chat-form"><input id="chat-input" aria-label="Your message" placeholder="Type your message..." autocomplete="off"><button type="submit">Send</button></form>
    <button type="button" id="chat-close">&times; Close chat</button>
  </div>
</div>`;
document.body.insertAdjacentHTML('beforeend', chatHTML);

const toggle = document.getElementById('chat-toggle');
const panel = document.getElementById('chat-panel');
const close = document.getElementById('chat-close');
const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const messages = document.getElementById('chat-messages');

// Move panel out of #chat-widget so position:fixed escapes the parent stacking context
document.body.appendChild(panel);

// Inject CSS rules for positioning (desktop + mobile fullscreen)
const panelCSS = document.createElement('style');
panelCSS.textContent = '#chat-panel{position:fixed;bottom:164px;right:24px}@media(max-width:768px){#chat-panel,#chat-panel.open{position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important;width:100vw!important;height:100dvh!important;max-height:none!important;border-radius:0!important;border:none!important;z-index:10002!important}#chat-panel.open{display:flex!important;flex-direction:column!important;overflow:hidden!important;background:#0b1220!important}}';
document.head.appendChild(panelCSS);

function isMobile(){return window.innerWidth<=768}
var mobileProps=[['position','fixed'],['top','0'],['left','0'],['right','0'],['bottom','0'],['width','100vw'],['height','100dvh'],['max-height','none'],['border-radius','0'],['border','none'],['z-index','10002'],['display','flex'],['flex-direction','column'],['overflow','hidden'],['background','#0b1220']];
function applyMobileStyles(){if(!isMobile())return;mobileProps.forEach(function(p){panel.style.setProperty(p[0],p[1],'important')})}
function clearMobileStyles(){mobileProps.forEach(function(p){panel.style.removeProperty(p[0])})}

toggle.onclick=function(){panel.classList.toggle('open');panel.classList.contains('open')?applyMobileStyles():clearMobileStyles()};
close.onclick=function(){panel.classList.remove('open');clearMobileStyles()};

var heroBtn=document.getElementById('hero-chat-btn');
if(heroBtn){heroBtn.addEventListener('click',function(){panel.classList.add('open');applyMobileStyles()})}

window.addEventListener('resize',function(){if(panel.classList.contains('open')){isMobile()?applyMobileStyles():clearMobileStyles()}});

form.onsubmit = (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  const safe = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  messages.innerHTML += `<div class="chat-msg user">${safe}</div>`;
  const reply = getReply(text);
  setTimeout(() => {
    messages.innerHTML += `<div class="chat-msg bot">${reply}</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 300);
  messages.scrollTop = messages.scrollHeight;
};
})();
