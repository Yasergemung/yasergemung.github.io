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
  const text = document.getElementById("text").value;
  if(!text) return;

  const user = JSON.parse(localStorage.getItem('user'));
  let name = user ? user.name : "زائر";

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
