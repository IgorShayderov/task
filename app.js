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

exporter.save(new_table, './json_table.json', function (err, data) {
    console.log("Created new file.");
    console.log(err);
    // console.log(data);
});