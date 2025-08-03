const searchBtn = document.getElementById('searchBtn');
const usernameInput = document.getElementById('username');

const profileDiv = document.getElementById('profile');
const avatar = document.getElementById('avatar');
const name = document.getElementById('name');
const bio = document.getElementById('bio');
const followers = document.getElementById('followers');
const following = document.getElementById('following');
const errorMsg = document.getElementById('error');

searchBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (username === '') return;

  fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('User not found');
      }
      return res.json();
    })
    .then(data => {
      profileDiv.classList.remove('hidden');
      errorMsg.classList.add('hidden');

      avatar.src = data.avatar_url;
      name.textContent = data.name || data.login;
      bio.textContent = data.bio || "No bio available.";
      followers.textContent = data.followers;
      following.textContent = data.following;
    })
    .catch(() => {
      profileDiv.classList.add('hidden');
      errorMsg.classList.remove('hidden');
    });
});
