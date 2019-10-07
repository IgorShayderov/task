let manageEnvironment = function(environment) {

  environment.addFilter('docTotal', function(products) {
    let accumulator = 0;

    products.forEach(function(product){
    	accumulator += product.price * product.quantity;
    });
    return accumulator.toFixed(2);
  });

  environment.addFilter('dateTotal', function(docs) {
  	let accumulator = 0;

  	docs.forEach(function(doc){
  		doc.products.forEach(function(product){
  			accumulator += product.price * product.quantity;
  		})
  	});
  	return accumulator.toFixed(2);
  });
}

module.exports = manageEnvironment;