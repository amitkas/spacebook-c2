var SpacebookApp = function () {
  var posts = [
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]}
  ];



  // the current id to assign to a post
  var currentId = 0;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments: []
    }

    currentId += 1;

    posts.push(post);
  }


 var createComment = function (currentPost){
 	var clickedComment = $(currentPost).closest('.post').data().id; //this takes the data id of the close post
 	var commentInput = 
 		{text:
 		$(currentPost).prev('.comment-name').val()};	//this takes the text

  	var post = _findPostById(clickedComment);
    post.comments.push(commentInput);
    renderPosts()


    // console.log(clickedComment);
    // var lastCommentIndex = posts[currentPost.data().id].comments.length - 1; 
    // var idCounter = lastCommentIndex + 1;
    // console.log('i just added a comment')
    // console.log(posts)
    
	}


var renderComments = function(post){
	var allComments = ''
	for (var i = 0; i < post.comments.length; i++) {
	   allComments += "<div class='comment-wrapper'><div class='single-comment'" + "data-id=" + post.id + ">" + "<p class='comment-text'>" + post.comments[i].text + "</p>" + "<a href='#' class='remove-comment'>remove</a></div></div>"
	}
// console.log(allComments)
	return allComments
}

// //test start here
var removeComment = function(currentcomment){
var $clickedComment = $(currentcomment).closest('.single-comment'); // find comment
var clickedCommentText = $(currentcomment).prev('.comment-text').text(); //find the text

    var id = $clickedComment.data().id;
    var post = _findPostById(id);
    var commentIndex = $clickedComment.index();

    // posts[id].comments.splice(, 1);

    renderPosts();
    renderComments();
      //   for (var i = 0; i < posts[id].comments.length; i++) {
      //   	if (post.comments[i].text == clickedCommentText) {
      //   		console.log(post)
      //   		// console.log(post.comments[i].text)
      //   		// console.log(clickedCommentText)
      //   		// console.log(post.comments)
      //   		// console.log(clickedCommentText)
      //  			post.comments.splice(post.comments.indexOf(clickedCommentText), 1);
      //  			 // console.log(post.comments.indexOf(clickedCommentText))
      //  			// console.log(post)
      // //   		console.log(post.comments[i])
      //   	}
      //   	// console.log(post.comments)
      //   }

    // post.comment.splice(posts.indexOf(clickedCommentText), 1);
    // // $clickedComment.remove();
    // console.log(post)
} 
// // test end here




  var renderPosts = function () {
    $posts.empty();
    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

     // var makecomment = renderComments(post)

      var commentsContainer = '<div class="comments-container">' +
      '<input type="text" class="comment-name">' +
      '<button class="btn btn-primary add-comment">Post Comment</button>' + renderComments(post) + '</div>';

      $posts.append('<div class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');



    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);
    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }


 



  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,

    createComment: createComment,

    // TODO: Implement
    renderComments: renderComments,

    // TODO: Implement
    removeComment: removeComment,

    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();
  
  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click','.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function () {
  app.createComment(this);
});

$('.posts').on('click', '.remove-comment', function () {
  app.removeComment(this);
});
