window.addEventListener('load', function() {

	let dateInfo = document.querySelector('.date-info');
	let roof = document.querySelector('.date h3:first-child');
	let dateOpen = false;

	let incomeInfo = document.querySelector('.income-info');
	let arrow = document.querySelector('.income p:first-child');
	let incomeOpen = false;

try{
	roof.addEventListener('click', function(){
			if (dateOpen === true){
			dateInfo.style.display = 'none';
			roof.style.transform = 'rotate(0deg)'; 
			dateOpen = false;
			return;
		}
		dateInfo.style.display = 'inline';
		roof.style.transform = 'rotate(180deg)'; 
		dateOpen = true;
	});

	arrow.addEventListener('click', function(){
			if (incomeOpen === true){
			incomeInfo.style.display = 'none';
			arrow.style.transform = 'rotate(0deg)';
			incomeOpen = false;
			return;
		}
		incomeInfo.style.display = 'inline'; 
		incomeOpen = true;
		arrow.style.transform = 'rotate(360deg)';
	})

} catch(e){
	console.error("LISTEN!!! " + e.message);
}
});