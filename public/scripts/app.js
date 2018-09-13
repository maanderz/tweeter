/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
  
  $(document).ready(function() {

    function renderTweets(tweets) {
    // loops through tweets
        for(tweet of tweets) {
            if(tweet){
                return jQuery.noop();
            } else {
                let newTweet = createTweetElement(tweet);
                $('#tweet-container').prepend(newTweet)
            }
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
        }
    }
  
    function createTweetElement(tweet) {
        console.log(tweet);
        let $tweet = $('<article>').addClass('tweet');
        let $user = $('<h3>').addClass('username').text(tweet.user.name);
        let $handle = $('<p>').addClass('handle').text(tweet.handle);
        let $image = $('<img>').addClass('avatar').attr('src', tweet.user.avatars.small);
        let $content = $('<p>').addClass('content').text(tweet.content.text);
        let $created_at = $('<footer>').addClass('created').text(tweet.created_at);

        $tweet.append($user);
        $tweet.append($handle);
        $tweet.append($image);
        $tweet.append($content);
        $tweet.append($created_at);

        return $tweet;
    }
    
    //renderTweets(data) //rendering of the tweets from the hardcoded data
    let loadTweets = function(){
        $.ajax({
        url:'/tweets',
        method:'GET',
        success: function(result){
            renderTweets(result);
            }
        });
    }

    $('form#input').on('submit', function(event){
        event.preventDefault();

        //content from form
        let formData = $('form#input').serialize();

        var input = $('textarea').val();
        if (input === "" || input.length > 140) {
            alert('Invalid input');
        } else {
            $.ajax('/tweets', {
                method: 'POST',
                data: formData
            }).then(function() {
                //clearing form
                $('textarea').empty();
                $('textarea').val('');
                $('counter').text(140);
                return $.ajax('/tweets');
                }).then(renderTweets); //mongodb
            }
        })
        loadTweets();
        //renderTweets();
    })