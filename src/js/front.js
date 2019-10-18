import 'core-js';
import $ from "jquery";

'use strict';
window.addEventListener("load", function() {

try{

	$(".date").on("click", ".date__btn", function(event){
		event.stopPropagation();
		$(event.delegateTarget).find(".doc").stop(true,true).slideToggle({
			duration: 600,
			start: function(){
				$(event.currentTarget).toggleClass("rotate");
					$(this).find("img").each(function(index, element){
						if ( $(element).attr("data-src") != false ) {
							let oldSrc = $(element).attr("src");
							$(element).attr("src", $(element).attr("data-src"));
							let fetchImages = new Promise ((resolve, reject) => {
								element.onload = function(){
									// console.log("Изображение загружено");
									resolve();
								}
								element.onerror = function(){
									// console.log("Изображение не загрузилось")
									reject(this);
								}
							})
							fetchImages.then(
								() => { $(element).removeClass("lazy"); },
								() => {	$(this).attr("src", oldSrc); }
							)									
						}
					});			
			}
		});
	});

	$(".doc").on("click", ".doc__btn", function(event){
		event.stopPropagation();
		$(event.delegateTarget).find(".products").stop(true, true).slideToggle({
			duration: 600,
			start: function(){
			$(event.currentTarget).toggleClass("scale");

		}
		});
	});
} catch(e){
	console.error("LISTEN!!! " + e.message);
}
});