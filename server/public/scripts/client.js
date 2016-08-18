$(document).ready(function() {
  // Load animals and update DOM.
  updateAnimalsOnDOM();

  // Set up submit button event listener.
  $('#submit').on('click', function() {
    // Prevent form from submitting and clearing.
    event.preventDefault();

    var animal = {};

    // Get form values.
    $.each($('#animal-form').serializeArray(), function (i, field) {
      animal[field.name] = field.value;
    });

    // Post the animal object to the server.
    sendAnimal(animal);
  });

  function sendAnimal(animal) {
    $.ajax({
      type: 'POST',
      url: '/animals',
      data: animal,
      success: function (res) {
        console.log("Response: ", res)
        updateAnimalsOnDOM();
      },
      error: function (response) {
        console.log('POST /animals failed!');
      },
    });
  }

  function updateAnimalsOnDOM() {
    $.ajax({
      type: 'GET',
      url: '/animals',
      success: function (animals) {
        console.log("Animals: ", animals);
        animals.forEach(function(animal) {
          $('#animal-list').append('<li>' + 'Type: ' + animal.animal_type + '  Total: ' + animal.total_animals + '</li>')
        });
      },
      error: function (response) {
        console.log('POST /animals failed!');
      },
    });
  }
});
