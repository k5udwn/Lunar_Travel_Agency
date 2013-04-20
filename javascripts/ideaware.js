jQuery(document).ready(function($) {
	
	if (!$.cookie('ideaware')) {
		$.browserLanguage(function( language , acceptHeader){
			if (acceptHeader.match("en-.*")) {
				$.cookie('ideaware', 'en-US', {path: "/"});
			}
			else if (acceptHeader.match("es-.*")) {
				$.cookie('ideaware', 'es-CO', {path: "/"});
			}
			redirectToLanguage();
		});
	} else redirectToLanguage();

	

	$(".set_spanish_button").click(function(){
		switchLanguage("es-CO");
	});
	
	$(".set_english_button").click(function(){
		switchLanguage("en-US");
	});
		
	$('.nav').spasticNav();
	$('.nav li:last-child').prev().css('margin-right','0')
	
	$(".gotomenu").click(function(){
		$("#menu").slideto({highlight: false});
	});
	
	$("p.learn a").click(function(){
		$(".move").slideto({highlight: false});
	});
	
	var ua = navigator.userAgent;
	var checker = {
		iphone: ua.match(/(iPhone|iPod|iPad)/),
		blackberry: ua.match(/BlackBerry/),
		android: ua.match(/Android/)
	};
	if ((checker.android) || (checker.iphone) || (checker.blackberry)){
	   	imgprojectipad();
	   	
	   	$(window).on("resize", function(){ 
	   		imgprojectipad();
	   	});
	   	
	}
	else {
		tiles = $("ul.features li").fadeTo(0, 0);
		displayTiles(tiles);
		$(window).scroll(function(d,h) {
			displayTiles(tiles);
		});
	   	
	   	if ($(window).width() > 765) {
	   		if ($(window).scrollTop() > 55){
	   			$('header').addClass('fixed');
	   		} else {
	   			$('header').removeClass('fixed');
	   		}
	   	}
	   	else {
	   		$('header').css("position", "absolute");
	   	}
	   	
		$(window).on("scroll", function(){
			var winHeight = $(window).height();
			var windowWidth = $(window).width();
			var windowScroll = $(window).scrollTop();
			
			if ($(window).width() > 765) {
				if ($(window).scrollTop() > 55){
					$('header').addClass('fixed');
				} else {
					$('header').removeClass('fixed');
				}
			}
			else {
				$('header').css("position", "absolute");
			}
			
			if ($(window).scrollTop() >= ($(document).height() - $(window).height() - 200)) {
				$('.infomap').removeClass('on');
			} else {
				$('.infomap').addClass('on');
			}
		});
		
		imgproject ();
		
		$(window).on("resize", function(){ 
			imgproject();
		});
		
		$(window).scroll(function(){
			if ($(".banner.project").hasClass("scroll")) {
				imgproject();
			}
		});
		
	}
	
});

function switchLanguage(new_language) {

	$.cookie('ideaware', new_language, {path: "/"});
	redirectToLanguage();
	
}

function redirectToLanguage() {
	if ($.cookie('ideaware') == 'es-CO') { // if current language is spanish
		if (!window.location.pathname.match("^(/iwv5/es|/es/).*")) { // only redirect when current page is not in spanish
			if (window.location.pathname.match(".*iwv5.*")) { // staging
				window.location.href = "http://staging.ideaware.co" + window.location.pathname.replace(/^\/iwv5\//, "/iwv5/es/");
			} else { // production
				window.location.href = "http://ideaware.co" + window.location.pathname.replace(/^\//, "/es/");
			}
		}
	} else if ($.cookie('ideaware') == 'en-US') { // if current language is english
		if (window.location.pathname.match("^(/iwv5/es|/es/).*")) { // only redirect when current page is in spanish
			if (window.location.pathname.match(".*iwv5.*")) { // staging
				window.location.href = "http://staging.ideaware.co" + window.location.pathname.replace(/^\/iwv5\/es\//, "/iwv5/");
			} else { // production
				window.location.href = "http://ideaware.co" + window.location.pathname.replace(/^\/es\//, "/");
			}
		}
	} 
}

function displayTiles(items) {
	items.each(function(i) {
	    a = $(this).offset().top + $(this).height();
	    b = $(window).scrollTop() + $(window).height() * 0.8;
	    if (a < b) $(this).fadeTo(500,1);
	});
}

function sizebanner() {
	windowHeight = $(window).height();
	windowWidth = $(window).width();
 	var bannerHeight = $(".banner > div").height();
 	
	if (windowWidth >= 768) {
		$(".banner.home, .banner.project").css({ 'height' : windowHeight + "px"});
		$(".banner.home > div, .banner.project > div").not(".imgproject").css('padding-top', parseInt((windowHeight - bannerHeight) / 2));
	} else if (windowWidth >= 480 ) {
		$(".banner.home, .banner.project").css('height','485px'); 
		$(".banner.home > div").css('padding-top','183px');
		$(".banner.project > div").not(".imgproject").css('padding-top','150px');
	} 
	else {
		$(".banner.home").css('height','312px'); 
		$(".banner.home > div").css('padding-top','105px');
		$(".banner.project").css('height','420px'); 
		$(".banner.project > div").not(".imgproject").css('padding-top','105px');
	} 
};

function imgproject() {
	if ($(".imgproject").length > 0) {
		des = $("p.description").offset().left;
		img = $(".imgproject").width();
		var val = des - img;
		if (val > 0) val = 0;
		val = val - $(window).scrollTop();
		$(".imgproject.left").css({ 'left' : val + "px"});
		$(".imgproject.right").css({ 'right' : val + "px"});
	}
}

function imgprojectipad() {
	if ($(".imgproject").length > 0) {
		des = $("p.description").offset().left;
		img = $(".imgproject").width();
		var val = des - img;
		if (val > 0) val = 0;
		$(".imgproject.left").css({ 'left' : val + "px"});
	 	$(".imgproject.right").css({ 'right' : val + "px"});
	}
}

sizebanner();

$(window).on("resize", function(){ 
	sizebanner(); 
});