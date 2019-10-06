let newData = function(dataFile){

    let $data = [];

    function checkFor (element, index, array){
        if ( element[this[1]] === this[0][this[1]] ){return true;} 
    };
    
    JSON.parse(dataFile).forEach(function(elem){    
            function dataWatcher(data){
                return new Proxy(data, {
                    set(target, name, value){
                        target[name] = value;
                        return true;
                    }, 
                    get(target, name){
                        switch (name) {
                            case "isProxy":
                                return true;
                            case "date":
                                return target.find( checkFor, [elem, name]);                        
                            case "docs":
                                return target.find( checkFor, [elem, "date"])["docs"];
                            case "products":
                                return target.find( checkFor, [elem, "date"])["docs"].find( checkFor, [elem, "docId"] ).products;
                            default:
                                return  target[name];
                            }
                    } 
                })
            }

            let data = dataWatcher($data);

            if (!( $data.some( checkFor, [elem, "date"] ) )) {
                    $data.push( {
                    "date": elem["date"],
                    "docs": []
                    })
            }

            if (!( data.docs.some( checkFor, [elem, "docId"] ) )){
                data.docs.push( {
                    "docId": elem["docId"],
                    "docType": elem["income"],
                    "products": []
                } );
            }


            data.products.push( {
                "name": elem["name"],
                "image": elem["image"],
                "price": elem["price"],
                "quantity": elem["quantity"],
                "removed": elem["removed"]
            } );
    })
    return $data;
};

module.exports = newData;