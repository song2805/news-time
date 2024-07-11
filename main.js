// const API_KEY = config.apikey;
let newsList = [];


// search with the enter button
const searchInput = document.getElementById("search-news");
const searchButton = document.getElementById("search-button");

//1. 버튼에 클릭 이벤트주기 (menus 7개 가져오기)
const menus = document.querySelectorAll(".menus button");
console.log("mm ", menus);

//menu 7개의 각각 click event 주기 
menus.forEach((menu) => menu.addEventListener("click", (event => getNewsByCategory(event)))
);
let url = new URL(

    // `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`

    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?`

);

// error check
const fetchNews = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        newsList = data.articles;
        render();
    } catch (error) {
        console.error("Error fetching news:", error);
    }
};

const getLatestNews = () => {
    url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`

        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?`
    );
  fetchNews();
  console.log("rrrr", response);  
  console.log("search-keyword", newsList) 
};

//ES6 문법
const getNewsByCategory = async (event) => {

    const category = event.target.textContent.toLowerCase();

    //2.카테고리별 뉴스 가져오기
    url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`

        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`
    );
    //3. 선택한 카테로리 뉴스를 보여준다.
    fetchNews();
    console.log("category-ddd", data);
}



// 4. 키워드로 검색하기
const getNewsBySearch = () => {
    searchNews = document.getElementById("search-news").value;
    
    url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=kr&q=${searchNews}&apiKey=${API_KEY}`

        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${searchNews}`
    );
    fetchNews();
    searchInput.value=" ";
    console.log("search-News", data);
};

// 6. hamburger menu

const openMenus = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };
  
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

// 6.  Search window
  const openSearch = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };


  // 7. search with the enter button 

  

  

  //Enter 버튼 클릭하면 자동으로 아이템 추가하기 및 글씨를 자동으로 지워줌
  searchInput.addEventListener("keydown",(event) => {
    if (event.key === 'Enter') {
        searchButton.click();
        addTask();
        }
        
    });

    function addTask() {
        console.log("clicked");
      
    
        let taskValue = searchInput.value;
        if (taskValue === "") {
             return alert("검색어를 입력해주세요");
            }
            searchInput.value=" ";    

    }


// 뉴스
const render = () => {
    const newsHTML = newsList.map((news) => {

        const urlImage = news.urlToImage ? news.urlToImage : './image/Image_not_available.png';
        const description = news.description && news.description !== "[Removed]" ? (news.description.length > 200 ? news.description.substring(0, 200) + '…' : news.description) : '내용없음';
        const titleName = news.title && news.title !== "[Removed]" ? news.title : "제목없음";
        const sourceName = news.source && news.source.name && news.source.name !== "[Removed]" ? news.source.name : "no source";

        return (`<div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${urlImage}" alt="">
                </div>
                <div class="col-lg-8">
                   <a href=${news.url}"><h2>${titleName} </h2></a>
                    <p>${description}</p>
                    <div>
                        ${sourceName} * ${moment(news.publishedAt).fromNow()}
                    </div>
                </div>
            </div> `

   ) }).join('');


    document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();
