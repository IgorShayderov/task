window.addEventListener("load", function() {
try{
	$("body").children().each(function () {
		$(this).html( $(this).html().replace(/\./g, ",") );
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