// load news category list
function loadCategory(){
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
}
function displayCategory(categories){
    const categoryDiv = document.getElementById('categories');
    categories.forEach(category =>{
        const li = document.createElement('li');
        li.classList.add('px-3', 'text-secondary', 'fw-normal');
        li.style.cursor = 'pointer';
        li.setAttribute("onclick", `loadNews('${category.category_id}')`);
        li.innerText = category.category_name;
        categoryDiv.appendChild(li);
    })
}
loadCategory();

// load all news by category
function loadNews(category_id){
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(res => res.json())
    .then(data => displayNews(data.data));
}
function displayNews(newsData){
    toggleSpinner(true);
    let newsParent = document.getElementById('news');
    newsParent.innerHTML = '';
    newsData.forEach(news =>{
        const newsCard = document.createElement('div');
        newsCard.classList.add('card', 'mb-4');
        newsCard.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
              <img class="w-100" src="${news.thumbnail_url}" alt="">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title">${news.title}</h2>
                <p class="card-text"><small class="text-muted">${news.details.slice(0, 400)} ${news.details.length > 400 ? '....' : ''}</small></p>
                <div class="d-flex justify-content-between news-bottom">
                  <div class="d-flex align-items-center">
                      <div class="me-2 rounded-circle overflow-hidden" style="height: 50px; width: 50px">
                        <img class="img-fluid" src="${news.author.img}" alt="">
                      </div>
                      <div>
                          <h5>${news.author.name}</h5>
                          <span>${news.author.published_date}</span>
                      </div>
                  </div>
                  <div class="d-flex align-items-center">
                      <h5><span>${news.total_view}</span>M</h5>
                  </div>
                  <div class="d-flex align-items-center">
                      <button onclick="loadNewsDetails('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">Learn more</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        `
        newsParent.appendChild(newsCard);
        toggleSpinner(false);
    })

    // array sosting logic

    // const viewArray = [];
    // for(let i=0; i<newsData.length; i++){
    //     const viewNumbers = newsData[i].total_view;
    //     viewArray.push(viewNumbers);
    // }
    // const shortFunction = viewArray.sort();
    // console.log(shortFunction);

    // newsData.sort((a, b) => {
    //     return (b.total_view - a.total_view);
    // });

    // display number of news
    const numberElement = document.getElementById('numberOfNews');
    numberElement.innerText = `${newsData.length} items found for this catagory`;
    if(newsData.length === 0){
        toggleSpinner(false);
    }
}
loadNews('08');

// load news details on modal
function loadNewsDetails(news_id){
    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data))
}
function displayNewsDetails(details){
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <h2>${details[0].title}</h2>
    <span class="text-muted">${details[0].author.published_date}</span>
    <p>${details[0].details}</p>
    `
}
const toggleSpinner = (isLoading) => {
    const spinner = document.getElementById("loadingSpinner");
    if (isLoading) {
        spinner.classList.remove("d-none");
    } else {
        spinner.classList.add("d-none");
    }
};
loadNewsDetails('0282e0e58a5c404fbd15261f11c2ab6a')

