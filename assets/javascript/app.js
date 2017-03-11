$(document).ready(function(){

    var gifObj = {

      topics: ['Whale','Red Panda','Orangutan', 'Polar Bear', 'Tiger', 'Elephant', 'Giant Panda', 'Macaw'],
      getTopicButtons: function() {
        // display topic buttons
        gifObj.topics.forEach(function(index) {
        var gifButton = $("<button class='animal'>").text(index);
        $("#item-buttons").append(gifButton);
        });
      }

    };

    gifObj.getTopicButtons();

    $('#images').on('click', '.item img', function() {

      var srcImage = $(this).attr('src');
      var imgData = $(this).attr('data-still');
      var gifData = $(this).attr('data-animated');


      if(srcImage === imgData ) {
        $(this).attr('src', gifData);
      } else {
        $(this).attr('src', imgData);
      }
    });

   $('#add-animal').on('click', function() {
      event.preventDefault();
      var submitAnimal = $("#animal-input").val().trim();
      if (submitAnimal!==""){
      gifObj.topics.push(submitAnimal);
      $('button.animal').remove();
      gifObj.getTopicButtons();
    }
   });

   $('.container').on('click', '#item-buttons .animal', function() {

        var gifURL;
        var imgURL;
        var animal = $(this).text();
        $('#images .item').remove();
        
        // Storing our giphy API URL for a random animal image
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;


              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              imgURL = response.data[i].images.fixed_height_still.url;
              gifURL = response.data[i].images.fixed_height.url;

              // Creating an image tag
              var animalImage = $("<img>");

              animalImage.attr('data-animated', gifURL);
              animalImage.attr('data-still', imgURL);

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              animalImage.attr("src", imgURL);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(animalImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#images").prepend(gifDiv);
            }
          }
        });

      });
  });