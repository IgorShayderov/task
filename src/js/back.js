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

	    function dataWatcher(obj){ 
	    	return new Proxy(obj, {
		        set(target, name, value){
		            target[name] = value;
		            return true;
		        }, 
		        get(target, name){

		        	switch (name) {
		        		case "date":
		        			return target.find( checkFor, [elem, name]);
		        		case "products":			
						default:
		        			return dataWatcher( target[name] );
		        	}


		        }
    		}); 
	    }
	    /////////////////////////////////////////////////////
const handler = {
get(target, key) {
	if (key == 'isProxy')
		return true;

	const prop = target[key];

	// return if property not found
	if (typeof prop == 'undefined')
		return;

	// set value as proxy if object
	if (!prop.isBindingProxy && typeof prop === 'object')
		target[key] = new Proxy(prop, handler);

	return target[key];
},
set(target, key, value) {
	console.log('Setting', target, `.${key} to equal`, value);

	// todo : call callback

	target[key] = value;
	return true;
}
};


const proxy = new Proxy (test, handler);

console.log(proxy);
console.log(proxy.string); // "data"

proxy.string = "Hello";

console.log(proxy.string); // "Hello"

console.log(proxy.object); // { "string": "data", "number": 32434 }

proxy.object.string = "World";

console.log(proxy.object.string); // "World"

//////////////////////////////////////////////////////////////
		let data = dataWatcher($data);
		if (!( $data.some( checkFor, [elem, "date"] ) )) {
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