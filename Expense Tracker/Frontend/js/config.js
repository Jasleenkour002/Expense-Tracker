// Change if your backend runs elsewhere
const API_BASE = "/api";

function setToken(token) {
  localStorage.setItem("token", token);
}
function getToken() {
  return localStorage.getItem("token");
}
function clearToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
function getUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

function showAlert(targetId, message, type = "danger") {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}
