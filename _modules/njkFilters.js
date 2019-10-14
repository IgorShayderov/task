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

  environment.addFilter('shortDate', function(date) {
    
  const monthes = [
  "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля",
  "Августа", "Сентября", "Октября", "Ноября", "Декабря"
  ] 

  let monthNumber = +(date.slice(5, 7));
  let number = +(date.slice(8, 10));
  let string = number + " " + monthes[monthNumber - 1];

  return string;
  })

}



module.exports = manageEnvironment;