const changeUserName = () => {
  const user = document.querySelector('.user-name');

  user.addEventListener('dblclick', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = user.textContent;
    input.style.width = `${user.offsetWidth + 10}px`;

    user.replaceWith(input);
    input.focus();

    const save = () => {
      const newText = document.createElement('div');
      newText.id = 'text';
      newText.textContent = input.value;
      newText.className = 'user-name';
      newText.style.cursor = 'pointer';
      newText.style.display = 'inline-block';
      newText.style.padding = '4px 8px';

      input.replaceWith(newText);
      changeUserName();
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') save();
      if (e.key === 'Escape') {
        input.replaceWith(user);
        changeUserName();
      }
    });
  });
};

const addPage = async () => {
  const btn = document.querySelector('.add-btn');
  const page = document.querySelector('.list');
  let counter = 1;

  btn.addEventListener('click', async () => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const span = document.createElement('span');
    const delBtn = document.createElement('button');

    li.textContent = `New page ${counter++}`;
    li.className = 'page';
    div.className = 'line';
    span.className = 'crossmark';
    delBtn.className = 'delete-btn';

    div.appendChild(li);
    div.appendChild(delBtn);
    delBtn.appendChild(span);
    page.appendChild(div);
  });
};

const deletePage = () => {
  const list = document.querySelector('.list');

  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('crossmark')) {
      const line = e.target.closest('.line');
      if (line) {
        line.remove();
      }
    }
  });
};

const loadSearchModal = async () => {
  const res = await fetch('search-modal.html');
  const html = await res.text();
  document.body.insertAdjacentHTML('beforeend', html);
};

const searchTasks = () => {
  const search = document.querySelector('.search-bar');

  search.addEventListener('click', () => {
    const modal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const pageList = document.getElementById('pageList');

    pageList.innerHTML = '';
    const pages = document.querySelectorAll('.list .line li');

    pages.forEach((li) => {
      const pageName = li.textContent;
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = pageName;
      link.addEventListener('click', () => {
        modal.style.display = 'none';
      });
      item.appendChild(link);
      pageList.appendChild(item);
    });

    modal.style.display = 'block';
    searchInput.value = '';
    searchInput.focus();

    searchInput.addEventListener('input', () => {
      const filter = searchInput.value.toLowerCase();
      const items = pageList.querySelectorAll('li');
      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? 'block' : 'none';
      });
    });
  });

  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('searchModal');
    if (e.key === 'Escape' && modal) {
      modal.style.display = 'none';
    }
  });
};

const openPage = () => {
  const list = document.querySelector('.list');
  const mainContent = document.getElementById('main-content');

  list.addEventListener('click', (e) => {
    const page = e.target.closest('.page');
    if (page) {
      mainContent.innerHTML = '';

      const textarea = document.createElement('textarea');
      textarea.style.width = '100%';
      textarea.style.height = '400px';
      textarea.style.backgroundColor = 'lightblue';
      textarea.value = `Editing page: ${page.textContent}\n\nType your notes here...`;

      mainContent.appendChild(textarea);
      textarea.focus();
    }
  });
};

const homePage = () => {
  const home = document.querySelector('.home-page');
  const mainContent = document.getElementById('main-content');

  home.addEventListener('click', () => {
    mainContent.innerHTML = '';
    mainContent.textContent = 'Welcome Home!';
  });
};

const settingsBtn = () => {
  const settings = document.querySelector('.settings');
  const mainContent = document.getElementById('main-content');

  settings.addEventListener('click', () => {
    mainContent.innerHTML = '';
    mainContent.innerHTML += `
<div class="selectdiv">
<label>
<select id="my-select">
  <option value="pick" hidden>Pick a color</option>
  <option value="red">Red</option>
  <option value="blue">Blue</option>
  <option value="yellow">Yellow</option>
</select>
</label>
</div>`;

  changePageColor();

  });
}

const changePageColor = () => {
  const mySelect = document.getElementById("my-select");

   if (!mySelect) return;
  
  mySelect.addEventListener('change', (e) => {  
    document.body.style.background = e.target.value;
    document.body.querySelector('.sidenav').style.background = e.target.value;
  });
}


(async () => {
  changeUserName();
  await addPage();
  openPage();
  deletePage();
  await loadSearchModal();
  searchTasks();
  homePage();
  settingsBtn();
})();
