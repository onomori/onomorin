
$(document).foundation();

$('p > a').each(function(){
	if($(this).children('img').length > 0){
		$(this).addClass('linked-img');
	}
});
$('img').not('.photoset-container img').each(function(){
	$(this).wrapAll('<span class="img-wrap"></span>')
});


var cboxOptions = {
	width: '80%', 
	maxWidth: '500px', 
	opacity: '0.6',
	rel:'cont',
	previous: '<',
	next: '>',
	close: 'x',
	xhrError: 'Can\'t load this content :\'(',
	imgError: 'Can\'t load this image :\'(',
	onCleanup: function(){
		$('#modal_search').blur();
	}
}
$(".color-ajax").colorbox(cboxOptions);
$(".color-inline").colorbox($.extend({inline: true}, cboxOptions));

$(window).resize(function(){
	$.colorbox.resize({
		width: window.innerWidth > parseInt(cboxOptions.maxWidth) ? cboxOptions.maxWidth : cboxOptions.width
	});
});

// OnO Bindings!
Mousetrap.bind({
  'h': function() { window.location = "/"; },
  '+': function() { $('a#super_menu_control').trigger('click'); },
  'm': function() { $('a#super_menu_control').trigger('click'); },
  'left': function() { $('a#prev_page').trigger('click'); console.log($('a#prev_page').text()); },
  '>': function() { $('a#jump_nav_control').trigger('click'); },
  'n': function() { $('a#jump_nav_control').trigger('click'); },
  'right': function() { $('a#next_page').trigger('click'); console.log($('a#next_page').text()); },
  '?': function() { $('a#help_control').trigger('click'); },
  '-': function(e) { $.colorbox.close() },
  '.': function() {
  	$('html, body').animate({ scrollTop: 0 }, 1000);
  },
  'up up': function() {
  	$('html, body').animate({ scrollTop: 0 }, 1000);
  },
  '/': function(e) { 
  	e.preventDefault();
  	$('a#super_menu_control').trigger('click');
  	$(document).on('cbox_complete', function(){
  		$('#modal_search').focus();
  	});
  },
  'j': function() {
  	var scrollPos = $(document).scrollTop();
		var count = 0; var topArray = []; var idArray = [];
		var nextPostTop; var nextPostID;
		$('#post_container .post').each(function(){
		  var postTop = Math.round($(this).offset().top);
		  var postID = $(this).attr('id');
		  if((postTop - 20) - scrollPos > 0){
			  topArray[count] = postTop;
			  idArray[count] = postID;
			  count++;
		  }
		  nextPostTop = Math.min.apply(Math, topArray) - 20;
		  nextPostID = idArray[topArray.indexOf(nextPostTop + 20)];
		});
		$('html, body').animate({ scrollTop: nextPostTop }, 500);
		$('#' + nextPostID).addClass('current-post').siblings().removeClass('current-post');
  },
  'k': function() {
  	var scrollPos = $(document).scrollTop();
		var count = 0; var topArray = []; var idArray = [];
		var prevPostTop; var prevPostID;
		$('#post_container .post').each(function(){
		  var postTop = Math.round($(this).offset().top);
		  var postID = $(this).attr('id');
		  if((postTop - 20) - scrollPos < 0){
			  topArray[count] = postTop;
			  idArray[count] = postID;
			  count++;
		  }
		  prevPostTop = Math.max.apply(Math, topArray) - 20;
		  prevPostID = idArray[topArray.indexOf(prevPostTop + 20)];
		});
		$('html, body').animate({ scrollTop: prevPostTop }, 500);
		$('#' + prevPostID).addClass('current-post').siblings().removeClass('current-post');
  }
});