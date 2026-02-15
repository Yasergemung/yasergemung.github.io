// ------------------- الوضع المظلم / الفاتح -------------------
function toggleMode(){
  document.body.classList.toggle("light");
}

// ------------------- عرض اسم المستخدم في الصفحة الرئيسية -------------------
window.onload = function(){
  const user = JSON.parse(localStorage.getItem('user'));
  if(user){
    const welcome = document.getElementById('welcome');
    if(welcome){
      welcome.innerHTML = `<h2>أهلاً ${user.name} 👋</h2>
      ${user.picture ? `<img src="${user.picture}" width="50" style="border-radius:50%;">` : ""}`;
    }
  }
  loadComments();
}

// ------------------- التعليقات -------------------
let comments = JSON.parse(localStorage.getItem('comments')) || [];

function saveComments(){
  localStorage.setItem('comments', JSON.stringify(comments));
}

function showComments(){
  const container = document.getElementById('commentsContainer');
  if(!container) return;
  container.innerHTML = "";
  comments.forEach((c,index)=>{
    container.innerHTML += `
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
  const textEl = document.getElementById("text");
  if(!textEl) return alert("خطأ: لم يتم العثور على مربع التعليق");
  const text = textEl.value.trim();
  if(!text) return alert("الرجاء كتابة تعليق!");

  const user = JSON.parse(localStorage.getItem('user'));
  const name = user ? user.name : "زائر";

  comments.push({name,text,likes:0});
  saveComments();
  showComments();
  textEl.value = "";
}

function likeComment(index){
  comments[index].likes++;
  saveComments();
  showComments();
}

function deleteComment(index){
  const role = localStorage.getItem("role");
  if(role === "admin"){
    comments.splice(index,1);
    saveComments();
    showComments();
  } else {
    alert("فقط المالك يمكنه حذف التعليقات!");
  }
}

function loadComments(){
  showComments();
}

// ------------------- تسجيل دخول Google (ممكن لوحده في login.html) -------------------
function googleLogin(){
  google.accounts.id.initialize({
    client_id: "891455424218-lgrnlsb7tivgotdpdas9b5hft9kct3lv.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
  google.accounts.id.prompt();
}

function handleCredentialResponse(response){
  const base64Url = response.credential.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c){
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  const user = JSON.parse(jsonPayload);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('role','user');

  alert("تم تسجيل الدخول بجوجل بنجاح ✅");
  window.location="index.html";
}

// ------------------- تسجيل دخول تقليدي للمالك -------------------
function login(){
  let user=document.getElementById("user")?.value;
  let pass=document.getElementById("pass")?.value;

  if(user==="yasser" && pass==="1234"){
    localStorage.setItem("role","admin");
    window.location="dashboard.html";
    return;
  }

  if(user && pass){
    localStorage.setItem("role","user");
    localStorage.setItem("user", JSON.stringify({name:user,picture:""}));
    window.location="index.html";
  }
}
