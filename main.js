const API_KEY = config.apikey;
let newsList = [];

//1. 버튼에 클릭 이벤트주기 (menus 7개 가져오기)
const menus = document.querySelectorAll(".menus button")
console.log("mm ", menus);

//menu 7개의 각각 click event 주기 
menus.forEach((menu) => menu.addEventListener("click", (event => getNewsByCategory(event)))
);
let url = new URL(

    // 'https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`

    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?`

);

// URL을 기반으로 뉴스를 가져오기 함수
// const fetchNews = async () => {
//     const response = await fetch(url);
//     const data = await response.json();
//     newsList = data.articles;
//     render();
// };

async function fetchNews2() {
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
}

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

// const getLatestNews = async () => {
//     const url = new URL(
//         `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
//     );
// const url = new URL(
//     `https://fabulous-chaja-32264f.netlify.app/top-headlines?country=kr&`
// );



const getLatestNews = () => {
    url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`

        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?`
    );
  fetchNews();
};

//ES6 문법
const getNewsByCategory = (event) => {

    // 2. 카테고리는 뉴스를 가져오기 위해서 각각의 카테고리 버튼을 누를 때 알 수 있게 한다.
    // 그리고 index.html menu 시작 글짜가 대문자이다. 그래서 toLowerCase() 함수로 소문자로 맞춰준다.   그럼 한글 메뉴였다면 어떻게 영문 그리고 소문자로 바꿔줄 수 있을까? 마지막에 고민해보자!
    const category = event.target.textContent.toLowerCase();

    //2.카테고리별 뉴스 가져오기
    url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`

        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`
    );
    //3. 선택한 카테로리 뉴스를 보여준다.
    fetchNews();
}



// 4. 키워드로 검색하기
const getNewsBySearch = () => {
    searchNews = document.getElementById("search-news").value;

    const url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=kr&q=${searchNews}&apiKey=${API_KEY}`

        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${serchNews}`
    );
    fetchNews();
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
                    <h2>${titleName} </h2>
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
