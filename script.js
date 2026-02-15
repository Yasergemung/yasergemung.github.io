/* حفظ الوضع */
if(localStorage.getItem("mode")){
  document.body.className = localStorage.getItem("mode");
}

/* تبديل الوضع */
function toggleMode(){

  if(document.body.classList.contains("dark")){
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("mode","light");
  }
  else{
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("mode","dark");
  }

}

/* عرض المستخدم */
function showUser(){

  const user = JSON.parse(localStorage.getItem("user"));

  if(user){
    const welcome = document.getElementById("welcome");

    if(welcome){
      welcome.innerHTML =
      `<h2>أهلاً ${user.name} 👋</h2>`;
    }
  }

}

/* التعليقات */
let comments = JSON.parse(localStorage.getItem("comments")) || [];

function saveComments(){
  localStorage.setItem("comments", JSON.stringify(comments));
}

function showComments(){

  const container = document.getElementById("commentsContainer");
  if(!container) return;

  container.innerHTML="";

  comments.forEach((c,index)=>{

    container.innerHTML+=`
      <div class="comment">
        <strong>${c.name}</strong>
        <p>${c.text}</p>
        <button onclick="likeComment(${index})">👍 ${c.likes}</button>
        <button onclick="deleteComment(${index})">🗑️</button>
      </div>
    `;

  });

}

function addComment(){

  const text = document.getElementById("text").value.trim();
  if(!text) return alert("اكتب تعليق");

  const user = JSON.parse(localStorage.getItem("user"));
  const name = user ? user.name : "زائر";

  comments.push({name,text,likes:0});

  saveComments();
  showComments();

  document.getElementById("text").value="";

}

function likeComment(index){

  comments[index].likes++;
  saveComments();
  showComments();

}

function deleteComment(index){

  const role = localStorage.getItem("role");

  if(role==="admin"){
    comments.splice(index,1);
    saveComments();
    showComments();
  }
  else{
    alert("فقط المالك يستطيع حذف التعليق");
  }

}

/* تسجيل دخول */
function login(){

  let user=document.getElementById("user").value;
  let pass=document.getElementById("pass").value;

  if(user==="yasser" && pass==="1234"){
    localStorage.setItem("role","admin");
    window.location="index.html";
    return;
  }

  if(user && pass){
    localStorage.setItem("role","user");
    localStorage.setItem("user",JSON.stringify({name:user}));
    window.location="index.html";
  }

}

/* النص المتغير */
const texts=[
"أنا صانع محتوى ألعاب 🎮",
"متفوق في ماين كرافت ومصنف عالميًا 338",
"بدأت صناعة المحتوى منذ 2016",
"أقدم فيديوهات وبثوث ممتعة 🔥"
];

let currentText=0;
let charIndex=0;

function typeWriter(){

  const element=document.getElementById("typed-text");
  if(!element) return;

  if(charIndex < texts[currentText].length){

    element.textContent += texts[currentText].charAt(charIndex);
    charIndex++;

    setTimeout(typeWriter,90);

  }
  else{
    setTimeout(eraseText,1500);
  }

}

function eraseText(){

  const element=document.getElementById("typed-text");

  if(charIndex > 0){

    element.textContent =
    texts[currentText].substring(0,charIndex-1);

    charIndex--;

    setTimeout(eraseText,40);
  }
  else{

    currentText++;
    if(currentText >= texts.length) currentText=0;

    setTimeout(typeWriter,100);
  }

}

document.addEventListener("DOMContentLoaded",()=>{
  showUser();
  showComments();
  typeWriter();
});
