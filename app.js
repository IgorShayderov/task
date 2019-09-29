const sqliteJson = require('sqlite-json');
const sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database.db3');
exporter = sqliteJson(db);

var new_table = 
'SELECT  docs.date, docTypes.name as income, rows.DocId, products.image, products.name, products.price, rows.quantity, ' +
'products.removed FROM rows ' +
'INNER JOIN docs ON rows.DocId = docs.Id ' +
'INNER JOIN docTypes ON docs.typeId = docTypes.Id ' +
'INNER JOIN products ON rows.productId = products.Id ' +
'ORDER BY docs.date';

/*SELECT  docs.date, docTypes.name as income, rows.DocId, products.image, products.name, products.price, rows.quantity,
products.removed FROM rows
INNER JOIN docs ON rows.DocId = docs.Id
INNER JOIN docTypes ON docs.typeId = docTypes.Id
INNER JOIN products ON rows.productId = products.Id
ORDER BY docs.date;*/

exporter.json(new_table, function (err, json) {
    if (err){console.error(err);}
    let sql = JSON.parse(json);
    let data_ar = {};
    sql.forEach(function(elem){

    	if (!( data_ar.hasOwnProperty(elem["date"]) )) {
    		data_ar[elem["date"]] = {};
    	}
    	if (! (data_ar[elem["date"]].hasOwnProperty([elem["docId"]]) )) {
    		data_ar[elem["date"]][elem["docId"]] = {};
    		data_ar[elem["date"]][elem["docId"]]["docType"] = elem["income"];
    	}
    	data_ar[elem["date"]][elem["docId"]][elem["name"]] = {image: elem["image"],
    	name: elem["name"],price: elem["price"],quantity: elem["quantity"],
        removed: elem["removed"] };
    
    });
    return data_ar;
  });