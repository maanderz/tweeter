/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    $('.error').hide();
    function renderTweets(tweets) {
    // loops through tweets
        for(tweet of tweets) {
            let newTweet = createTweetElement(tweet);
            $('#tweet-container').prepend(newTweet)
            }
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
    }
    
    function createTweetElement(tweet) {
        
        let $tweet = $('<article>').addClass('tweet');
        let $header = $('<header>').addClass('header');
        let $user = $('<h2>').addClass('username').text(tweet.user.name);
        let $handle = $('<p>').addClass('handle').text(tweet.user.handle);
        let $image = $('<img>').addClass('avatar').attr('src', tweet.user.avatars.small);
        let $content = $('<p>').addClass('content').text(tweet.content.text);
        let $footer = $('<footer>').addClass('footer');
        let $created_at = $('<p>').addClass('created').text(moment(tweet.created_at).fromNow());
        let $likeBtn = $('<img>').addClass('like').attr('src', "/images/images.png");
        let $retweet = $('<img>').addClass('retweet').attr('src', "/images/retweet.png");
        let $flag = $('<img>').addClass('flag').attr('src', "/images/flag.png");

        $tweet.append($header);
        $header.append($image);
        $header.append($user);
        $header.append($handle);
        $tweet.append($content);
        $tweet.append($footer);
        $footer.append($created_at);
        $footer.append($likeBtn);
        $footer.append($retweet);
        $footer.append($flag);

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
        var input = $('textarea').val();
        if (input === "" || input.length > 140) {
            $('.error').show();
        } else {
            $.ajax({
                url: '/tweets/',
                method:'POST',
                data: $('form#input').serialize(),
            }).then(function() {
                //clearing form
                $('#tweet-container').empty();
                $('textarea').val('');
                $('.counter').text('140');
                $('.error').hide();
                return $.ajax('/tweets');
                }).then(renderTweets);
            }
        })
    loadTweets();
})


$(document).ready(function(){
    $('.btn').click(function(){
        $('.new-tweet').slideToggle();
        $('textarea').focus();
      });
});