// 뉴스를 가져오는 코드
const API_KEY = config.apikey;
let newsList = [];
const getLatestNews = async () => {
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("ddd", newsList);
};


// 뉴스
const render = () => {
    const newsHTML = newsList.map((news) => {

        const urlImage = news.urlToImage ? news.urlToImage : './image/Image_not_available.png';
        const description = news.description && news.description !== "[Removed]" ? (news.description.length > 200 ? news.description.substring(0, 200) + '…' : news.description) : '내용없음';
        const titleName = news.title && news.title !== "[Removed]" ? news.title : "제목없음";
        const sourceName = news.source && news.source.name && news.source.name !== "[Removed]" ? news.source.name : "no source";

        return `<div class="row news">
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
        
    }).join('');

    document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();


function condition() {

}