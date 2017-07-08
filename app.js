// Default array declared
var anime = ['blackButler', 'gosick', 'toraDora', 'yuriOnIce', 'haruhi', 'soulEater', 'hetalia', 'cowboyBebop'];


function getAnime() {
  var anime_title = $(this).text().toLowerCase();

  $('#anime').empty();
  // Constructing a queryURL from custom API key
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime_title + "&api_key=1965273f52a241ab8f58649448211435&limit=10";
  // Performing an AJAX request with the queryURL
  $.getJSON(queryURL)
  // After data comes back from the request
  .then(function(res) {
    // console.log(res);
    // storing the data from the AJAX request in the results variable
   res.data.forEach(function(gif) {
      var still_image = gif.images.downsized_still.url;
      var animated_image = gif.images.downsized.url;

      var div = $('<div class="gif">');

      div.html(
        '<p>' + gif.rating + '</p>' +
        '<img src="' + still_image + '">'
      );

      $('#anime').prepend(div);

      div.find('img').mouseover(function() {
        $(this).attr('src', animated_image);
      })
      .mouseleave(function() {
        $(this).attr('src', still_image);
      });
   });
  });
}


function addButton() {
  // Pushes the new search term to the end of the array
  anime.push($("#search").val());
  $('#search').val('');
  listButtons();
}


function listButtons() {
  var wrap = $('#buttonArray');
  wrap.empty();
  // For loop to populate search term buttons and add their functionality
  anime.forEach(function (title, index) {
    // Creating a button for the current array string
    var button = $("<button>");
    // Setting the button's name to the current string
    button.text(title);

    // Appending the button to the selected location
    wrap.append(button);
    // Creating an event listener for each button
    button.on("click", getAnime);
  });
}

// Function to add a search term.
$("#submit").on("click", addButton);
listButtons();
