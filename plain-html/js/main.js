const img_container = document.getElementById('img-container');

const sidebar = document.querySelector('.sidebar');
const sidebarList = document.querySelectorAll('li[data-search]');
const sidebarListArray = Array.from(sidebarList);
sidebarListArray.forEach(el => {
  el.addEventListener('click', ((el)=>()=>{
    renderImages(el.getAttribute('data-search'), el);
  })(el) );
})

const removeFullImageView = () => {
  fullImageView.classList.add('hidden');
};

const exitFullImageView = document.querySelector('.exit-btn');
const fullImageView = document.querySelector('.full-img-view')
exitFullImageView.addEventListener('click', removeFullImageView);
fullImageView.addEventListener('click', removeFullImageView);



let currentDataSearch;


const openSidebar = () => {
  sidebar.classList.remove('sidebar-collapsed');
}
const closeSidebar = () => {
  sidebar.classList.add('sidebar-collapsed');
}

const load = (options) =>
  new Promise(resolve => {
    if (!options.method) options.method = "GET";
    const xhr = new XMLHttpRequest();
    xhr.onload = () => resolve(xhr.responseText);
    xhr.open(options.method, options.url, true);
    xhr.send();
  });


const viewImage = (url, description) => {
  document.querySelector('.full-img').src = "assets/noimage.png";
  document.querySelector('.full-img-view').classList.remove('hidden');
  setTimeout(() => document.querySelector('.full-img').src = url, 10);
  document.querySelector('.full-img-view > .img-container > p').innerText = description;
}

const renderImages = (searchTerm, element) => {
  if (searchTerm !== currentDataSearch)
  {
    closeSidebar();
    if (element) {
      sidebarListArray.forEach(el => el.classList.remove('selected'));
      element.classList.add('selected');
    }
    
    img_container.innerHTML = "<div class='loading'>Loading ...</div>";
    load({ url: `https://api.giphy.com/v1/gifs/search?api_key=MnXeNoIc0AxJaRWF8zkl2WXcUV7Cpx5Y&q=${searchTerm}&limit=24` })
      .then(result => JSON.parse(result))
      .then(json => json.data)
      .then(imgs => {
        console.log(imgs);
        let html = "";
        let els = 0;
        imgs.forEach((el, i) => {
          if (!el)
            return;
          if (els === 0)
            html += '<div class="column">';
          els++;
          const img = el.images.preview_webp.url;
          html += `<img src="${img}" class="img" onclick="viewImage('${el.images.original.url}', '${el.id}')" style="width:100%">`;
          if (els === 6) {
            html += '</div>';
            els = 0;
          }
        });
        img_container.innerHTML = html;
        currentDataSearch = searchTerm;
      });

  }
    
}

renderImages('weather');