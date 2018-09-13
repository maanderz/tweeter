$(document).ready(function() {
  $('textarea').keyup(function(event) {
    var maxChars = 140;
    var count = $(this).siblings('span.counter');

    count.html(maxChars);

    var textLength = this.value.length;
    var textRemaining = maxChars - textLength;

    count.html(textRemaining);

      if (textLength > maxChars) {
        count.addClass('red');
      } else {
        count.removeClass('red');
      }
    });
});



