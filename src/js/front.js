	// $("body").children().each(function () {
	// 	$(this).html( $(this).html().replace(/\./g, ",") );
	// });
window.addEventListener("load", function() {

try{
	document.querySelectorAll(".products__item_wrap-img").forEach(function(img){
		if (img.naturalWidth == 0) {
			img.src = "./img/noImage.jpg";
			img.style = "border:1px solid black";
 		}
	});

	$(".date").on("click", ".date__btn", function(event){
		event.stopPropagation();
		$(event.delegateTarget).children(".date-info").stop(true,true).slideToggle({
			duration: 600,
			start: function(){
				$(event.currentTarget).toggleClass("rotate");
			}
		});
	});

	$(".doc").on("click", ".doc__btn", function(event){
		event.stopPropagation();
		$(event.delegateTarget).children(".doc__info").stop(true, true).slideToggle({
			duration: 600,
			start: function(){
			$(event.currentTarget).toggleClass("rotate");
		}
		});
	});
} catch(e){
	console.error("LISTEN!!! " + e.message);
}
});