'use strict';
window.addEventListener("load", function() {

try{
	document.querySelectorAll(".products__item_wrap-img").forEach(function(img){
		if (img.naturalWidth == 0) {
			img.src = "./img/noImage.jpg";
			img.style = "border:1px solid black";
 		}
	});

	$(".date").on("click", ".date__countersink", function(event){
		event.stopPropagation();
		$(event.delegateTarget).find(".doc").stop(true,true).slideToggle({
			duration: 600,
			start: function(){
				$(event.currentTarget).toggleClass("rotate");
			}
		});
	});

	$(".doc").on("click", ".doc__triangle", function(event){
		event.stopPropagation();
		$(event.delegateTarget).find(".products__list").stop(true, true).slideToggle({
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