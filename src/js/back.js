'use strict';
window.addEventListener('load', function (){
	function readTextFile(file, callback) {
	    const request = new XMLHttpRequest();
	    request.overrideMimeType("application/json");
	    request.open("GET", file, true);
	    request.onreadystatechange = function() {
	        if (request.readyState === 4 && request.status == "200") {
				callback(request.responseText);
			} else if (request.status == "404"){
				console.error("File not found!");
			}
			 else {
	        	console.log(`Processing... ready state: ${request.readyState}`);
			}
	    }
	    request.send(null);
	}

	let sql;
	let data_ar = {};

	readTextFile("./json_table.json", function(text){
    sql = JSON.parse(text);
    sql.forEach(function(elem){
    	//создать пустой объект новой даты
    	if (!( data_ar.hasOwnProperty(elem["date"]) )) {
    		data_ar[elem["date"]] = {};
    	}
    	//создать пустой объект для всех docId внутри соответствующих дат
    	if (!(data_ar[elem["date"]].hasOwnProperty([elem["docId"]]) )) {
    		data_ar[elem["date"]][elem["docId"]] = {};
    	//для соответсвующей даты -> соответствующего docId, добавить свойство docType 
    		data_ar[elem["date"]][elem["docId"]]["docType"] = elem["income"];
    	}
    	//для соответсвующей даты -> соответствующего docId, добавить продукт содержащий внутри свойства(цена, количество и тд)
    	data_ar[elem["date"]][elem["docId"]][elem["name"]] = {image: elem["image"],
    	name: elem["name"],price: elem["price"],quantity: elem["quantity"],
    	removed: elem["removed"] };
    });
    console.log(data_ar);
    });


});