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

// Declare global variables in pagination (페이지네이션에 전역 변수 선언)
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;



// error check
const fetchNews = async () => {
    try {
        //URL 호출전에 써줘야함
        //url 호출하면 그 뒤에다가 붙여주는 함수가 searchParams.set() 이다
        url.searchParams.set("page",page); // => &page=page
        url.searchParams.set("pageSize", pageSize); // => &pageSize=pageSize
        //URL 호출
        const response = await fetch(url);
        const data = await response.json();
        console.log("Data", data);
        if (response.status === 200) {
            if (data.articles.length === 0) {
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            totalResults = data.totalResults
            render();
            paginationRender();
        } else {
            throw new Error(data.message);
        }

    } catch (error) {
        console.error("Error fetching news:", error.message);
        errorRender(error.message);
    }
};


const getLatestNews = async() => {
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
    page = 1;
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
const getNewsBySearch = async () => {

    searchNews = document.getElementById("search-news").value;

    page = 1;

    url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=kr&q=${searchNews}&apiKey=${API_KEY}`

        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${searchNews}`
    );
    
    fetchNews();
    addTask()
    console.log("search-News", data);
    
};

// 6. hamburger menu

const openMenus = async() => {
    document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = async () => {
    document.getElementById("mySidenav").style.width = "0";
};

// 6.  Search window
const openSearch = async () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};


// 7. search with the enter button 
//Enter 버튼 클릭하면 자동으로 아이템 추가하기 및 글씨를 자동으로 지워줌

searchInput.addEventListener("keydown", async (event) => {
    if (event.key === 'Enter') {
        getNewsBySearch()        
        // addTask()
    }

});

async function addTask() {
    console.log("clicked");


    let taskValue = searchInput.value;
    if (taskValue === " ") {
        return alert("검색어를 입력해주세요");
    }
    searchInput.value = " ";

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
            </div> `)
    }).join('');


    document.getElementById("news-board").innerHTML = newsHTML;
};

//Error message
const errorRender = (errorMessage) => {
    const errorHTML = ` <div class="alert alert-danger" role="alert">
                         ${errorMessage}
                     </div>`;
    document.getElementById("news-board").innerHTML = errorHTML;
}


const paginationRender =  () => {
    // totalResults : let totalResults = 0;
    // page         : let page = 1;
    // pagesize     : const pageSize = 10;
    // groupSize    : const groupSize = 5;
    // total page
    const totalPages = Math.ceil(totalResults / pageSize);

    // pageGroup
    const pageGroup = Math.ceil(page / groupSize);  // 올림을 해준다 (Math.ceil() 올림함수)
    // lastPage
    let lastPage = groupSize * pageGroup;
    // &lt; &gt;
    let paginationHTML =``;

    // 마지막 페이지그룹이 그룹사이즈보다 작다면 ?  lastPage = totalPage
    if(lastPage > totalPages) {
        lastPage = totalPages;
    }

    // firstPage
    let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    // It got to help from Bootstrap (부트스트렙의 도움을 받았다) Docs - Components - pagination
    
    if(page > 1) {
        paginationHTML = `<li class="page-item previous-1" onclick="moveToPage(1)">
                            <a class="page-link" href="#">&laquo;</a>
                          </li>
                          <li class="page-item previous-1" onclick="moveToPage(${page-1})"><a class="page-link" href="#">&lt;</a></li>`;
    } else {
        paginationHTML =``;
    }     

    for(let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${i === page ? 'active': ''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>` // i === 현재page 라면 'active' 아니면 '빈공간' - " "안에서는 ' ' 사용해야한다.
    }

    if(page < totalPages) {
        paginationHTML += `<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" href="#">&gt;</a></li>
        <li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link" href="#">&raquo;</a></li>`

    } else if(page > totalPages){
        paginationHTML= ``;
    }
    
    document.querySelector(".pagination").innerHTML = paginationHTML ;

};

const moveToPage = async (pageNum) => {
    console.log("moveToPage", pageNum);
    page = pageNum;
    fetchNews()   // 강의에서는 getNews()로 되어있다
}


getLatestNews();
