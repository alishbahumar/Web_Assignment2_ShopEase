const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const CATS=["Electronics","Clothing","Shoes","Accessories","Home Appliances"];
const CIMG={Electronics:"electronics",Clothing:"clothing",Shoes:"shoes",Accessories:"accessories","Home Appliances":"appliances"};
const D=`Carefully made, reliable and great value. Comes with a 1-year warranty and free returns within 14 days.`;
const IMGS={1:3,2:3,4:1,5:4,6:3,7:3,8:3,9:3,10:3,11:3,12:3};
const P=[
[1,"Laptop Pro 14","Electronics","TechNova",199999,4.7,"Fast 14-inch laptop with 16GB RAM and a 512GB SSD. A sharp display and all-day battery make it ideal for study, office work, design and everyday browsing.","featured"],
[2,"Wireless Headphones","Electronics","SoundMax",12999,4.6,"Over-ear Bluetooth headphones with deep bass, soft ear cushions and 30 hours of battery life. Enjoy clear calls, rich music and comfort that lasts through long listening sessions.","featured best"],
[4,"Classic Shirts","Clothing","UrbanFit",2499,4.2,"Smart casual shirts in soft, breathable fabric with a clean, comfortable fit. Easy to pair with trousers or jeans for college, office days and weekend outings.","best offer"],
[5,"Winter Puffer Jacket","Clothing","UrbanFit",6499,4.5,"Warm padded puffer jacket with a cosy hood and a water-resistant finish. Lightweight yet insulating, it keeps the cold out and comes in several colours to match any outfit.","new"],
[6,"Running Shoes","Shoes","Stride",7999,4.4,"Lightweight, cushioned sneakers with a flexible sole and breathable upper. Built for daily wear, walks and light runs, with grip and comfort that lasts all day.","featured"],
[7,"Leather Boots","Shoes","Stride",8999,4.1,"Durable boots with a non-slip sole and a supportive fit, in lace-up, heeled and chelsea styles. A stylish pair that works from casual days to evening plans.","best"],
[8,"Sunglasses","Accessories","SunLine",1999,3.9,"UV400 sunglasses in classic and modern frames that protect your eyes from harsh sun. Light on the face and stylish enough to finish any outfit, in town or on holiday.","offer"],
[9,"Leather Handbag","Accessories","SunLine",4999,4.6,"Spacious tote handbag with a zip pocket and strong handles. Fits your laptop, books and daily essentials, with a neat structured shape that suits work, study and travel.","new"],
[10,"Coffee Maker","Home Appliances","HomeEase",9999,4.0,"Brews fresh hot coffee in minutes with a reusable filter and a keep-warm plate. Simple to use and easy to clean, it makes mornings at home or in the office easier.","featured offer"],
[11,"Air Cooler & Fans","Home Appliances","HomeEase",5499,4.3,"Quiet fans and coolers that keep your room fresh in summer. Compact, energy-saving and easy to move from room to room, with adjustable speeds for comfort day and night.","best"],
[12,"Air Fryer","Home Appliances","HomeEase",14999,4.8,"Cook crispy food with far less oil. A large capacity and digital controls let you fry, bake and roast quickly, making healthy family meals easy and cleaning simple.","new offer"]
].map(a=>({id:a[0],name:a[1],cat:a[2],brand:a[3],price:a[4],rating:a[5],short:a[6],desc:a[6]+" "+D,tags:a[7],imgs:Array.from({length:IMGS[a[0]]},(_,i)=>`images/p${a[0]}-${i+1}.jpg`)}));
const byId=id=>P.find(p=>p.id==id);
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let cart=store.get("cart",{}),wish=store.get("wish",[]),user=store.get("user",null),orders=store.get("orders",[]);
const F={q:"",cat:"All",max:200000,brands:new Set(),rate:0};
const money=n=>"Rs. "+Math.round(n).toLocaleString("en-PK");
const stars=r=>"&#9733;".repeat(Math.round(r))+"&#9734;".repeat(5-Math.round(r))+` <small>${r}</small>`;
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("on"),1800)}
function save(){store.set("cart",cart);store.set("wish",wish);store.set("orders",orders)}

/* ---------- product cards ---------- */
function card(p){
  const sale=p.tags.includes("offer");
  return `<div class="card"><button class="heart ${wish.includes(p.id)?"on":""}" data-act="wish" data-id="${p.id}" aria-label="Wishlist">${wish.includes(p.id)?"&#9829;":"&#9825;"}</button>
  <div class="im"><span class="tag">${sale?"-20%":p.tags.includes("new")?"New":p.tags.includes("best")?"Best seller":""}</span><img src="${p.imgs[0]}" alt="${p.name}">${p.imgs[1]?`<img class="alt2" src="${p.imgs[1]}" alt="">`:""}</div><div class="in"><h3>${p.name}</h3><p class="pd">${p.short}</p><div class="stars">${stars(p.rating)}</div>
  <div class="price">${money(p.price)}${sale?`<span class="old">${money(p.price*1.25)}</span>`:""}</div>
  <div class="row"><button class="btn" data-act="add" data-id="${p.id}">Add to Cart</button><button class="btn alt" data-act="view" data-id="${p.id}">View Details</button></div></div></div>`}
const fill=(el,list)=>$(el).innerHTML=list.length?list.map(card).join(""):`<p class="muted">No products found.</p>`;

/* ---------- filters ---------- */
function filtered(){return P.filter(p=>(F.cat=="All"||p.cat==F.cat)&&p.price<=F.max&&p.rating>=F.rate&&(!F.brands.size||F.brands.has(p.brand))&&p.name.toLowerCase().includes(F.q))}
function renderAll(){const l=filtered();fill("#gAll",l);$("#count").textContent=l.length+" product(s) found";reveal()}
function buildSidebar(){
  $("#fCat").innerHTML=["All",...CATS].map(c=>`<label><input type="radio" name="cat" value="${c}" ${F.cat==c?"checked":""}> ${c}</label>`).join("");
  $("#fBrand").innerHTML=[...new Set(P.map(p=>p.brand))].map(b=>`<label><input type="checkbox" value="${b}" ${F.brands.has(b)?"checked":""}> ${b}</label>`).join("");
  $("#fPrice").value=F.max;$("#pv").textContent=F.max.toLocaleString("en-PK");$("#fRate").value=F.rate;
}
$("#fCat").onchange=e=>{F.cat=e.target.value;renderAll()};
$("#fBrand").onchange=e=>{e.target.checked?F.brands.add(e.target.value):F.brands.delete(e.target.value);renderAll()};
$("#fPrice").oninput=e=>{F.max=+e.target.value;$("#pv").textContent=F.max.toLocaleString("en-PK");renderAll()};
$("#fRate").onchange=e=>{F.rate=+e.target.value;renderAll()};
$("#reset").onclick=()=>{Object.assign(F,{q:"",cat:"All",max:200000,brands:new Set(),rate:0});$("#search").value="";buildSidebar();renderAll()};
$("#search").oninput=e=>{F.q=e.target.value.trim().toLowerCase();if(location.hash!="#products")location.hash="products";else renderAll()};

/* ---------- cart / wishlist ---------- */
function updateCounts(){$("#cCount").textContent=Object.values(cart).reduce((a,b)=>a+b,0);$("#wCount").textContent=wish.length}
function addCart(id,q=1){cart[id]=(cart[id]||0)+q;save();updateCounts();toast(byId(id).name+" added to cart")}
function renderCart(){
  const ids=Object.keys(cart);
  if(!ids.length){$("#cartBox").innerHTML=`<p>Your cart is empty. <a href="#products" class="btn small">Browse products</a></p>`;return}
  let total=0;
  const rows=ids.map(id=>{const p=byId(id),q=cart[id];total+=p.price*q;
    return `<div class="crow"><img src="${p.imgs[0]}" alt=""><div class="grow"><b>${p.name}</b><div class="muted">${money(p.price)} each</div></div>
    <div class="qty"><button data-act="dec" data-id="${id}">&minus;</button><span>${q}</span><button data-act="inc" data-id="${id}">+</button></div>
    <b>${money(p.price*q)}</b><button class="btn small" style="background:var(--red)" data-act="rm" data-id="${id}">Remove</button></div>`}).join("");
  $("#cartBox").innerHTML=rows+`<div class="total">Total bill: ${money(total)}</div><div style="text-align:right"><button class="btn" data-act="checkout">Proceed to checkout</button></div>`;
}
function renderDetail(id){
  const p=byId(id);if(!p){location.hash="products";return}
  $("#detail").innerHTML=`<div class="det"><div><img id="mainImg" src="${p.imgs[0]}" alt="${p.name}"><div class="thumbs">${p.imgs.map((s,i)=>`<img src="${s}" alt="View ${i+1}" class="${i?"":"on"}">`).join("")}</div></div><div><a href="#products" class="muted">&larr; Back to products</a><h1>${p.name}</h1>
  <div class="muted">${p.cat} &bull; ${p.brand}</div><div class="stars">${stars(p.rating)}</div><div class="price">${money(p.price)}</div><p>${p.desc}</p>
  <p style="margin:16px 0"><b>Quantity</b> <span class="qty"><button id="qm">&minus;</button><span id="qv">1</span><button id="qp">+</button></span></p>
  <button class="btn" id="dAdd">Add to Cart</button> <button class="btn alt" data-act="wish" data-id="${p.id}">Add / remove wishlist</button></div></div>`;
  $$(".thumbs img").forEach(t=>t.onclick=()=>{$("#mainImg").src=t.src;$$(".thumbs img").forEach(x=>x.classList.toggle("on",x==t))});
  let q=1;$("#qm").onclick=()=>{q=Math.max(1,q-1);$("#qv").textContent=q};$("#qp").onclick=()=>{q++;$("#qv").textContent=q};$("#dAdd").onclick=()=>addCart(p.id,q);
}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-act]");if(!b)return;const id=+b.dataset.id,a=b.dataset.act;
  if(a=="add")addCart(id);
  else if(a=="view")location.hash="product-"+id;
  else if(a=="wish"){wish=wish.includes(id)?wish.filter(x=>x!=id):[...wish,id];save();updateCounts();route()}
  else if(a=="inc"){cart[id]++;save();updateCounts();renderCart()}
  else if(a=="dec"){if(--cart[id]<1)delete cart[id];save();updateCounts();renderCart()}
  else if(a=="rm"){delete cart[id];save();updateCounts();renderCart()}
  else if(a=="checkout"){location.hash="checkout"}
});

/* ---------- router ---------- */
function showInfo(t,h){$("#infoTitle").textContent=t;$("#infoBody").innerHTML=h}
function route(){
  const h=location.hash.slice(1)||"home";let v=h;
  if(h.startsWith("product-"))v="detail";
  if(["profile","orders","settings"].includes(h))v="info";
  $$("[data-view]").forEach(s=>s.classList.toggle("show",s.dataset.view==v));
  if(v=="home"){fill("#gFeatured",P.filter(p=>p.tags.includes("featured")));fill("#gNew",P.filter(p=>p.tags.includes("new")));fill("#gBest",P.filter(p=>p.tags.includes("best")));fill("#gOffer",P.filter(p=>p.tags.includes("offer")))}
  if(v=="products"){buildSidebar();renderAll()}
  if(v=="detail")renderDetail(h.split("-")[1]);
  if(v=="cart")renderCart();
  if(v=="checkout")renderCheckout();
  if(v=="success")renderSuccess();
  if(v=="wishlist")fill("#gWish",P.filter(p=>wish.includes(p.id)));
  if(h=="profile")showInfo("My Profile",user?`<p>Name: <b>${user.name}</b></p><p>Email: <b>${user.email}</b></p>`:`<p>Please <a href="#login" class="btn small">login</a> to see your profile.</p>`);
  if(h=="orders")showInfo("My Orders",orders.length?orders.slice().reverse().map(orderHTML).join(""):"<p>No orders yet.</p>");
  if(h=="settings")showInfo("Settings",`<p>Cart and wishlist are saved in this browser.</p><button class="btn small" id="clr">Clear saved data</button>`);
  if($("#clr"))$("#clr").onclick=()=>{cart={};wish=[];orders=[];save();updateCounts();toast("Data cleared")};
  closeDrawer();window.scrollTo(0,0);reveal();
}
window.addEventListener("hashchange",route);

/* ---------- drawer ---------- */
const openDrawer=()=>{$("#drawer").classList.add("open");$("#overlay").classList.add("on")};
function closeDrawer(){$("#drawer").classList.remove("open");$("#overlay").classList.remove("on")}
$("#menuBtn").onclick=openDrawer;$("#closeBtn").onclick=closeDrawer;$("#overlay").onclick=closeDrawer;
$("#logout").onclick=e=>{e.preventDefault();user=null;store.set("user",null);authUI();closeDrawer();toast("Logged out")};

/* ---------- categories ---------- */
["#cats","#homeCats"].forEach(s=>{$(s).innerHTML=CATS.map(c=>`<div class="cat" data-c="${c}"><img src="images/cat-${CIMG[c]}.jpg" alt="${c}"><span>${c}</span></div>`).join("");$(s).onclick=e=>{const c=e.target.closest(".cat");if(c){F.cat=c.dataset.c;location.hash="products";route()}}});

/* ---------- slideshow ---------- */
let si=0,timer;const slides=$$(".slide");
$("#dots").innerHTML=slides.map((_,i)=>`<i data-i="${i}"></i>`).join("");
function go(n){si=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle("on",i==si));$$("#dots i").forEach((d,i)=>d.classList.toggle("on",i==si));clearInterval(timer);timer=setInterval(()=>go(si+1),4000)}
$("#next").onclick=()=>go(si+1);$("#prev").onclick=()=>go(si-1);$("#dots").onclick=e=>{if(e.target.dataset.i)go(+e.target.dataset.i)};

/* ---------- forms ---------- */
let mode="login";
function authUI(){$("#authLink").textContent=user?"Hi, "+user.name.split(" ")[0]:"Login / Signup";$("#authLink").href=user?"#profile":"#login"}
$$(".tab").forEach(t=>t.onclick=()=>{mode=t.dataset.mode;$$(".tab").forEach(x=>x.classList.toggle("on",x==t));$("#nameRow").hidden=$("#confRow").hidden=mode=="login";$("#aBtn").textContent=$("#authTitle").textContent=mode=="login"?"Login":"Signup";$("#aErr").textContent=""});
const emailOk=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
$("#authForm").onsubmit=e=>{e.preventDefault();const n=$("#aName").value.trim(),m=$("#aEmail").value.trim(),p=$("#aPass").value,c=$("#aConf").value;let err="";
  if(mode=="signup"&&n.length<3)err="Enter your full name (at least 3 characters).";
  else if(!emailOk(m))err="Enter a valid email address.";
  else if(p.length<6)err="Password must be at least 6 characters.";
  else if(mode=="signup"&&p!=c)err="Passwords do not match.";
  $("#aErr").textContent=err;if(err)return;
  user={name:mode=="signup"?n:m.split("@")[0],email:m};store.set("user",user);authUI();toast("Welcome, "+user.name);e.target.reset();location.hash="home"};
$("#contactForm").onsubmit=async e=>{e.preventDefault();const err=$("#cName").value.trim().length<2?"Enter your name.":!emailOk($("#cEmail").value)?"Enter a valid email.":$("#cMsg").value.trim().length<10?"Message must be at least 10 characters.":"";
  $("#cErr").textContent=err;if(err)return;const ok=await mail("ShopEase contact message",{name:$("#cName").value.trim(),email:$("#cEmail").value.trim(),message:$("#cMsg").value.trim()});if(!ok){$("#cErr").textContent="Message could not be sent ("+mail.err+"). Please try again.";return}toast("Message sent. Thank you!");$("#contactForm").reset()};


/* ---------- order delivery to the shop owner ---------- */
const SHOP={email:"hafizaalishba.umar@gmail.com",whatsapp:""}; // whatsapp: optional, e.g. "923001234567"
async function mail(subject,f){
  if(!SHOP.email||location.protocol=="file:")return true; // opened from a local file: skip sending (demo mode)
  try{const r=await fetch("https://formsubmit.co/ajax/"+SHOP.email,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({_subject:subject,_template:"box",_captcha:"false",...f})});const d=await r.json();
    if(d.success===true||d.success==="true")return true;mail.err=d.message||"the email service refused the request";console.error("FormSubmit:",d);return false}
  catch(e){mail.err="could not reach the email service";console.error(e);return false}
}
function sendOrder(o){
  const a=o.addr,lines=o.items.map(i=>`${i.qty} x ${i.name} - ${money(i.price*i.qty)}`).join("\n");
  return mail("New ShopEase order #"+o.n,{name:a.name,email:a.email,phone:a.phone,order:"#"+o.n+" ("+o.date+")",items:lines,subtotal:money(o.sub),delivery:o.ship?money(o.ship):"Free",TOTAL:money(o.total),payment:o.pay,address:a.address+", "+a.city+", "+a.prov+" "+a.zip,notes:a.note||"-"});
}
/* ---------- checkout ---------- */
const sub=()=>Object.keys(cart).reduce((s,i)=>s+byId(i).price*cart[i],0),shipFee=s=>s>=5000?0:250;
const luhn=n=>{let s=0,d=false;for(let i=n.length-1;i>=0;i--){let x=+n[i];if(d){x*=2;if(x>9)x-=9}s+=x;d=!d}return s%10==0};
function orderHTML(o){return `<div class="ord"><div class="srow"><b>Order #${o.n}</b><span>${o.date||""} &bull; ${o.status||"Processing"}</span></div>`+(typeof o.items=="string"?`<p>${o.items}</p>`:o.items.map(i=>`<div class="srow"><span>${i.qty} x ${i.name}</span><span>${money(i.price*i.qty)}</span></div>`).join(""))+`<div class="srow"><b>Total</b><b>${money(o.total??o.t)}</b></div>`+(o.addr?`<p class="muted">Payment: ${o.pay}<br>Deliver to: ${o.addr.name}, ${o.addr.address}, ${o.addr.city}, ${o.addr.prov} ${o.addr.zip}<br>Phone: ${o.addr.phone}</p>`:"")+`</div>`}
function renderCheckout(){
  if(!Object.keys(cart).length){location.hash="cart";return}
  if(user){if(!$("#coName").value)$("#coName").value=user.name;if(!$("#coEmail").value)$("#coEmail").value=user.email}
  const s=sub(),f=shipFee(s);
  $("#coItems").innerHTML=Object.keys(cart).map(i=>{const p=byId(i);return `<div class="srow it"><span class="th"><img src="${p.imgs[0]}" alt=""><i>${cart[i]}</i></span><span class="nm">${p.name}</span><span>${money(p.price*cart[i])}</span></div>`}).join("");
  $("#sSub").textContent=money(s);$("#sShip").textContent=f?money(f):"Free";$("#sTot").textContent=money(s+f);
}
function renderSuccess(){
  const o=orders[orders.length-1];if(!o||!o.addr){location.hash="home";return}
  $("#okBox").innerHTML=`<div class="tick">&#10003;</div><h1>Thank you, ${o.addr.name.split(" ")[0]}!</h1><p>Your order #${o.n} has been placed. A confirmation will be sent to ${o.addr.email}.</p><p><b>Estimated delivery: 3 to 5 working days.</b>${o.pay=="Cash on delivery"?`<br>Please keep ${money(o.total)} ready to pay on delivery.`:""}</p>${orderHTML(o)}<p><a class="btn" href="#products">Continue shopping</a> <a class="btn alt" href="#orders">View my orders</a> ${SHOP.whatsapp?`<a class="btn alt" target="_blank" rel="noopener" href="https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent("Hi, I placed order #"+o.n+" ("+money(o.total)+") on ShopEase.")}">Message us on WhatsApp</a>`:""}</p>`;
}
function checkoutErr(){
  const g=id=>$("#"+id).value.trim(),pay=$("input[name=pay]:checked").value,ph=g("coPhone").replace(/[\s-]/g,"");
  const r=[["coName",g("coName").length<3,"Enter your full name."],["coPhone",!/^(03\d{9}|\+923\d{9})$/.test(ph),"Enter a valid mobile number, like 03001234567."],["coEmail",!emailOk(g("coEmail")),"Enter a valid email address."],["coAddr",g("coAddr").length<8,"Enter your full street address."],["coCity",g("coCity").length<2,"Enter your city."],["coProv",!g("coProv"),"Select your province."],["coZip",!/^\d{5}$/.test(g("coZip")),"Enter a 5-digit postal code."]];
  if(pay=="card"){const n=g("cc").replace(/\s/g,""),[m,y]=g("exp").split("/");r.push(["cc",!(n.length>=13&&luhn(n)),"Enter a valid card number."],["cName",g("cName").length<3,"Enter the name on the card."],["exp",!(m>=1&&m<=12&&y&&y.length==2&&new Date(2000+ +y,m)>new Date()),"Enter a valid expiry date (MM/YY)."],["cvv",!/^\d{3,4}$/.test(g("cvv")),"Enter the 3 or 4 digit security code."])}
  if(pay=="wallet")r.push(["wNum",!/^03\d{9}$/.test(g("wNum").replace(/[\s-]/g,"")),"Enter your wallet mobile number, like 03001234567."]);
  $$(".bad").forEach(e=>e.classList.remove("bad"));
  const x=r.find(a=>a[1]);if(x){$("#"+x[0]).classList.add("bad");$("#"+x[0]).focus()}return x?x[2]:"";
}
$$("input[name=pay]").forEach(r=>r.onchange=()=>{const v=$("input[name=pay]:checked").value;$$(".pay").forEach(l=>l.classList.toggle("on",l.querySelector("input").checked));$("#ppCard").hidden=v!="card";$("#ppWallet").hidden=v!="wallet"});
$("#cc").oninput=e=>e.target.value=e.target.value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
$("#exp").oninput=e=>{const v=e.target.value.replace(/\D/g,"").slice(0,4);e.target.value=v.length>2?v.slice(0,2)+"/"+v.slice(2):v};
$("#coForm").onsubmit=async e=>{e.preventDefault();const err=checkoutErr();$("#coErr").textContent=err;if(err)return;
  const g=id=>$("#"+id).value.trim(),pay=$("input[name=pay]:checked").value,s=sub(),f=shipFee(s);
  const o={n:"SE"+Date.now().toString().slice(-7),date:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}),status:"Processing",items:Object.keys(cart).map(i=>({name:byId(i).name,qty:cart[i],price:byId(i).price})),sub:s,ship:f,total:s+f,
    pay:pay=="cod"?"Cash on delivery":pay=="card"?"Card ending "+g("cc").replace(/\s/g,"").slice(-4):g("wType")+" "+g("wNum"),
    addr:{name:g("coName"),phone:g("coPhone"),email:g("coEmail"),address:g("coAddr"),city:g("coCity"),prov:g("coProv"),zip:g("coZip"),note:g("coNote")}};
  $("#coBtn").disabled=true;$("#coBtn").textContent="Placing order...";const sent=await sendOrder(o);$("#coBtn").disabled=false;$("#coBtn").textContent="Place order";if(!sent){$("#coErr").textContent="We could not send your order ("+mail.err+"). Please try again in a moment.";return}
  orders.push(o);cart={};save();updateCounts();$("#coForm").reset();$$(".pay").forEach((l,i)=>l.classList.toggle("on",i==0));$("#ppCard").hidden=$("#ppWallet").hidden=true;location.hash="success"};
const io="IntersectionObserver"in window?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){const t=x.target;t.classList.add("in");io.unobserve(t);setTimeout(()=>t.style.transitionDelay="",1000)}}),{threshold:.12}):null;
function reveal(){$$(".card,.cat,.sec,.edit,.val,.ab-hero,.ab-split,.news,.welcome").forEach((e,i)=>{if(e.classList.contains("rv"))return;e.classList.add("rv");e.style.transitionDelay=(i%4*90)+"ms";io?io.observe(e):e.classList.add("in")})}
window.addEventListener("scroll",()=>$(".top").classList.toggle("sc",scrollY>20),{passive:true});
$("#newsForm").onsubmit=e=>{e.preventDefault();if(!emailOk($("#nEmail").value.trim()))return toast("Enter a valid email address.");toast("Thanks for subscribing!");e.target.reset()};
go(0);authUI();updateCounts();route();
