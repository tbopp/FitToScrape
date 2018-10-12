$(function() {
  // Event listener for scrape button
  // $("#scrape").on("click", function(event) {
  //   $.get("/", function() {
  //     location.reload();
  //   });
  // });

  // Event listener for view notes button:
  $("#view-notes").on("click", function(event) {
    const thisId = $(this).attr("data-id");

    console.log(thisId);

    // Toggle show/hide of notes div
    $("[data-id=" + thisId + "]").toggle(700);

    $.ajax("/articles/" + thisId, {
      type: "GET"
    }).then(function(data) {
      // The title of the article
      $("#notes").append("<p class='h'><b>Title: </b>" + data.title + "</p>");
      // An input to enter a new title
      $("#notes").append(
        "<input id='titleinput' class='form-control' placeholder='Note title...' name='title'>"
      );
      // A textarea to add a new note body
      $("#notes").append(
        "<textarea class='form-control' id='bodyinput' rows='3' placeholder='Enter a note...' name='body'></textarea>"
      );
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append(
        "<button class='btn btn-primary btn-sm' data-id='" +
          data._id +
          "' id='savenote'>Save Note</button>"
      );
      $("#notes").append(
        "<button class='btn btn-secondary btn-sm' data-id='" +
          data._id +
          "' id='closenote'>Close Note</button>"
      );

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
  });

  // Event listener for save note button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    const thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");

    setTimeout(function() {
      location.reload();
    }, 700);

  });

  // Event listener for close note button
  $(document).on("click", "#closenote", function() {
    // Grab the id associated with the article from the submit button
    const thisId = $(this).attr("data-id");

    // Toggle show/hide of notes div
    $("[data-id=" + thisId + "]").toggle(700);

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");

    setTimeout(function() {
      location.reload();
    }, 700);
  });
});
