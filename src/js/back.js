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
	let $data = [];

	readTextFile("./json_table.json", function(text){
    sql = JSON.parse(text);

    function checkFor (element, index, array){
		if ( element[this[1]] === this[0][this[1]] ){return true;} 
	};

    sql.forEach(function(elem){

	    let data = new Proxy($data, {
		        set(target, name, value){
		            target[name] = value;
		            return true;
		        }, 
		        get(target, name){
		        	console.log("Name " + name);
		        	console.log(toString(name));
		        	console.log(typeof target[name]);
				if (name == 'isProxy')
					return true;

				const prop = target[name];

				if (typeof prop == 'undefined') {
					return;
				}
				if (toString(name) == "date") {
					return target.find( checkFor, [elem, name]);
				}
				if (!prop.isBindingProxy && typeof prop === 'object') {
					target[name] = new Proxy(prop, handler);
				}

				return target[name];
		        }
    		}); 
	    
// get(target, name){

//                     switch (name) {
//                         case "date":
//                             return target.find( checkFor, [elem, name]);
//                         case "products":            
//                         default:
//                             return dataWatcher( target[name] );
//                     }
		if (!( $data.some( checkFor, [elem, "date"] ) )) {
				console.log("Initialization...");
        		$data.push( {
				"date": elem["date"],
				"docs": []
				})
		}

    	if (!( data.date.docs.some( checkFor, [elem, "docId"] ) )){
    		data.date.docs.push( {
    			"docId": elem["docId"],
    			"docType": elem["income"],
    			"products": []
    		} );
    	}

    	// data.date.docs.products.push( {
    	// 	"name": elem["name"],
    	// 	"image": elem["image"],
    	// 	"price": elem["price"],
    	// 	"quantity": elem["quantity"],
    	// 	"removed": elem["removed"]
    	// } );

    });
    console.log($data);
	});
});