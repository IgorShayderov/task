window.addEventListener("load", function() {
		let result = $("body").innerHTML.match(/\d+\.\d+/g);
		result.forEach(function(elem){
			console.log(elem);
			elem.replace(".", ",");
		})
try{
	$(".date").on("click", ".date__btn", function(event){
		event.stopPropagation();
		$(event.delegateTarget).children(".date-info").stop(true,true).slideToggle({
			duration: 600,
			start: function(){
				$(event.currentTarget).toggleClass("rotate");
			}
		});
	});

	$(".income").on("click", ".doc__btn", function(event){
		event.stopPropagation();
		$(event.delegateTarget).children(".income-info").stop(true, true).slideToggle({
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