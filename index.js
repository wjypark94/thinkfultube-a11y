let $ = require('jquery');

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

const apiKey = 'AIzaSyCmXbr84NI-eo7eCHQTcf7iJc1PSGsjsuc';

function getDataFromApi(searchTerm, callback){
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
      key: apiKey,
      q: `${searchTerm} in:name`
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}

function displayResult(result){
  console.log('displayResult', result);
  return `
    <ul>
      <li>    
        <h3 class="js-video-title">${result.snippet.title}</h3>
        <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img class="js-result-img" src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}"></a>
        <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">More from this channel: ${result.snippet.channelTitle}</a>
      </li>
    </ul>  
  `;
}

function displayYoutubeSearchResults(data){
  const searchResults = data.items.map((item, index) => displayResult(item));
  console.log('displayYoutubeSearchResults', searchResults);
  $('.js-search-results').html(searchResults);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event){
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find('.js-query');
    let query = queryTarget.val();
    console.log('query', query);
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchResults);
  });
}



$(watchSubmit);


















