window.addEventListener("load", function() {

	// $(".panel-charButton").on("click", (function(event){
	// 	$(".mainWrap").stop(true,true).slideUp(400);
	// 	$(".shopWrap").stop(true,true).slideUp(400);
	// 	$(".charWrap").stop(true,true).slideDown(400);
	// }));

	// $(".panel-mapButton").on("click", (function(event){
	// 	$(".charWrap").stop(true,true).slideUp(400);
	// 	$(".shopWrap").stop(true,true).slideUp(400);
	// 	$(".mainWrap").stop(true,true).slideDown(400);
	// }));

	// $(".panel-shopButton").on("click", (function(event){
	// 	$(".mainWrap").stop(true,true).slideUp(400);
	// 	$(".charWrap").stop(true,true).slideUp(400);
	// 	$(".shopWrap").stop(true,true).slideDown(400);
	// }));

	// $(".panel-menuToggle").on("click", function(){
	// 	$(".panel-menuWrap").slideToggle(300, function(){
	// 		if ($(this).css("display") === "none") {
	// 			$(this).removeAttr("style");
	// 		}
	// 	});
	// });

	let dateInfo = $(".date-info");
	let roof = $(".date h3:first-child");
	let dateOpen = false;

	let incomeInfo = $(".income-info");
	let arrow = $(".income p:first-child");
	let incomeOpen = false;

try{
	$(".wrapper").on("click", roof, function(eventObj){
		console.log("click roof");
		console.log(eventObj);
			if (dateOpen === true){
				dateInfo.attr("style", "display:none");
				roof.target.attr("style", "transform:rotate(0deg)"); 
				dateOpen = false;
				return;
			}
		dateInfo.attr("style", "display:inline");
		// roof.attr("style", "transform:rotate(180deg)");
		dateOpen = true;
	});

	$(".wrapper").on("click", arrow, function(eventObj){
			if (incomeOpen === true){
				incomeInfo.attr("style",  "display:none");
				arrow.attr("style", "transform:rotate(0deg)");
				incomeOpen = false;
				return;
			}
		incomeInfo.attr("style", "display:inline"); 
		incomeOpen = true;
		arrow.attr("style", "transform:rotate(360deg)");
	})

} catch(e){
	console.error("LISTEN!!! " + e.message);
}
});