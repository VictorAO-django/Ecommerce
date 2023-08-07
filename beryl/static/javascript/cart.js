//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  CREATE CUSTOM OBJECT TO MANIPULATE AND CHECK EACH CART ITEM QUANTITY from the session cookie in form of:
//  "cake-00002(1),fashion-00001(2)"
//  This object has one attribute and three method. The attribute is the specific item code in form of "boot-00002".
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function quantity(productCode){
    this.productCode = productCode || ' '; //Object attribute. The value is in form of 'boot-00001'
    //++++++++++++THIS METHOD IS TO INCREASE ITEM QUANTITY
    this.increase = function(){
        var COOKIES = document.cookie.split(';'); //We track the session cookie to find our cookie named 'cart'
        var newCart = new Array(); // create a newCart array to use as our new session cookie 'cart'
        for(var i=0; i<COOKIES.length; i++){
            var CARTCOLUMN = COOKIES[i].split('=');
            if(CARTCOLUMN[0].includes('cart')){ //if cookie key == 'cart'
                var cart = CARTCOLUMN[1]; //track the 'cart' value which is in form of "cake-00002(1),fashion-00001(2)"
                if(cart.includes(',')){
                    var cartItem = cart.split(','); //we split the cart value
                    for(var i = 0; i < cartItem.length; i++){
                        if(cartItem[i].includes(this.productCode)){ //if a string item e.g 'cake-00002(1)' contain our object attribute e.g 'cake-00002'
                            var x = cartItem[i].indexOf('(') + 1; //start boundary in other to track the quantity
                            var y = cartItem[i].length - 1; //end boundary in other to track the quantity
                            var theQuantity = cartItem[i].substring(x,y); //here is the quantity in string form
                            var digit = parseInt(theQuantity); //we convert the quantity to integer
                            digit += 1; //then increase the quantity by one
                            var newCartItem = cartItem[i].substring(0,x) + digit + cartItem[i].substring(y,cartItem[i].length); //then we couple couple back the string with an increased quantity eg 'cake-00002(2)'
                            newCart.push(newCartItem); //push the coupled string to our newCart array

                        }else{//if a string item e.g 'cake-00002(1)' does not contain our object attribute e.g 'cake-00002'
                            newCart.push(cartItem[i]) //just push the same value to our newCart array
                        }
                    }
                }else{
                    var x = cart.indexOf('(') + 1; //start boundary in other to track the quantity
                    var y = cart.length - 1; //end boundary in other to track the quantity
                    var theQuantity = cart.substring(x,y); //here is the quantity in string form
                    var digit = parseInt(theQuantity); //we convert the quantity to integer
                    digit += 1; //then increase the quantity by one
                    var newCartItem = cart.substring(0,x) + digit + cart.substring(y,cart.length); //then we couple couple back the string with an increased quantity eg 'cake-00002(2)'
                    newCart.push(newCartItem); //push the coupled string to our newCart array
                }
                break;
            }
        }
        document.cookie = 'cart='+newCart.toString() //lastly replace the session cookie 'cart' value with the string form of our newCart Array
    }

    //++++++++++++THIS METHOD IS TO INCREASE ITEM QUANTITY
    this.decrease = function(){
        var COOKIES = document.cookie.split(';'); //We track the session cookie to find our cookie named 'cart'
        var newCart = new Array(); // create a newCart array to use as our new session cookie 'cart'
        for(var i=0; i<COOKIES.length; i++){ 
            var CARTCOLUMN = COOKIES[i].split('=');
            if(CARTCOLUMN[0].includes('cart')){ //if cookie key == 'cart'
                var cart = CARTCOLUMN[1]; //track the 'cart' value which is in form of "cake-00002(1),fashion-00001(2)"
                if(cart.includes(',')){
                    var cartItem = cart.split(','); //we split the cart value
                    for(var i = 0; i < cartItem.length; i++){
                        if(cartItem[i].includes(this.productCode)){//if a string item e.g 'cake-00002(1)' contain our object attribute e.g 'cake-00002'
                            var x = cartItem[i].indexOf('(') + 1; //start boundary in other to track the quantity
                            var y = cartItem[i].length - 1; //end boundary in other to track the quantity
                            var theQuantity = cartItem[i].substring(x,y); //here is the quantity in string form
                            var digit = parseInt(theQuantity); //we convert the quantity to integer
                            digit -= 1 //then decrease the quantity by one
                            var newCartItem = cartItem[i].substring(0,x) + digit + cartItem[i].substring(y,cartItem[i].length); //then we couple couple back the string with a decreased quantity eg 'cake-00002(2)'
                            newCart.push(newCartItem); //push the coupled string to our newCart array
                        }else{ //if a string item e.g 'cake-00002(1)' does not contain our object attribute e.g 'cake-00002'
                            newCart.push(cartItem[i]); //just push the same value to our newCart array
                        }
                    }
                }else{
                    var x = cart.indexOf('(') + 1; //start boundary in other to track the quantity
                    var y = cart.length - 1; //end boundary in other to track the quantity
                    var theQuantity = cart.substring(x,y); //here is the quantity in string form
                    var digit = parseInt(theQuantity); //we convert the quantity to integer
                    digit -= 1 //then decrease the quantity by one
                    var newCartItem = cart.substring(0,x) + digit + cart.substring(y,cart.length); //then we couple couple back the string with a decreased quantity eg 'cake-00002(2)'
                    newCart.push(newCartItem); //push the coupled string to our newCart array
                }
                break;
            }
        }
        document.cookie = 'cart='+newCart.toString(); //lastly replace the session cookie 'cart' value with the string form of our newCart Array
    }
    
    //++++++++++++THIS METHOD IS TO GET ITEM QUANTITY
    this.quantity = function(){
        var COOKIES = document.cookie.split(';'); //We track the session cookie to find our cookie named 'cart'
        var digit; //create a variable to eventually store the item quantity
        for(var i=0; i<COOKIES.length; i++){
            var CARTCOLUMN = COOKIES[i].split('=');
            if(CARTCOLUMN[0].includes('cart')){ //if cookie key == 'cart
                var cart = CARTCOLUMN[1]; //track the 'cart' value which is in form of "cake-00002(1),fashion-00001(2)"
                digit = returnDigit(cart,this.productCode)
            }
        }
        return digit; //lastly the method will return the digit value
    }


    //++++++++++++THIS METHOD IS TO DETERMINE WHETHER AN ITEM HAS BEEN RECENTLY VIEWED OR NOT
    this.recentViewExist = function(){
        var COOKIES = document.cookie.split(';'); //We track the session cookie to find our cookie named 'recentview'
        var result = Boolean()//Create a boolean which will server as the result
        for(var i=0; i<COOKIES.length; i++){ //loop through the cookies
            if(COOKIES[i].includes('recentview')){ //if 'recentview' is a substring of the cookie string
                result = (COOKIES[i].includes(this.productCode))? true : false //assign true to the boolean result if the item has been recently viewed, and assign false if otherwise
            }
        }
        return result; // return the boolean result
    }
}


function returnDigit(COOKIELINE,PARAM){
    var cartItem = COOKIELINE.split(','); //we split the cart value
    var digit;
    for(var i = 0; i < cartItem.length; i++){
        if(cartItem[i].includes(PARAM)){ //if a string item e.g 'cake-00002(1)' contain our object attribute e.g 'cake-00002'
            var x = cartItem[i].indexOf('(') + 1; //start boundary in other to track the quantity
            var y = cartItem[i].length - 1; //end boundary in other to track the quantity
            var theQuantity = cartItem[i].substring(x,y); //here is the quantity in string form
            digit = parseInt(theQuantity); //assign the item quantity to digit variable
            break;
        }else{
            continue;
        }
    }
    return digit;
}



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  CREATE CUSTOM OBJECT TO ADD ITEM TO COOKIE, REMOVE ITEM FROM COOKIE, AND CHECK IF AN ITEM EXIST in the session cookie in form of:
//  "cake-00002(1),fashion-00001(2)"
//  This object has one attribute and three method. The attribute is the specific item code in form of "boot-00002".
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function toSelect(productCode){
    this.productCode = productCode || ' '; //Object attribute. The value is in form of 'boot-00001'

    //DEFINING OBJECT METHODS
    this.AddToCookie = function(){
        var COOKIES = document.cookie.split(';'); //We track the session cookie to find our cookie named 'cart'
        var newCart = new Array(); // create a newCart array to use as our new session cookie 'cart'
        for(var i=0; i<COOKIES.length; i++){
            if(COOKIES[i].includes('cart')){ //if 'cart' is a substring of the cookie string 
                var CARTCOLUMN = COOKIES[i].split('=');
                var cart = CARTCOLUMN[1]; //track the 'cart' value which is in form of "cake-00002(1),fashion-00001(2)"
                if(cart != ''){ //if the 'cart' value is not empty
                    if(cart.includes(',')){
                        var cartItem = cart.split(','); //we split the cart value
                        for(var i = 0; i < cartItem.length; i++){
                            newCart.push(cartItem[i]); //push each string to our newCart array
                        }
                    }else{
                        newCart.push(cart); //push each string to our newCart array
                    }
                    
                }
            }
        }
        newCart.push(this.productCode + '(1)'); // then push the item to the newCart array too
        document.cookie = 'cart='+newCart.toString(); //lastly replace the session cookie 'cart' value with the string form of our newCart Array
    }

    this.RemoveFromCookie = function(){
        var COOKIES = document.cookie.split(';'); //We track the session cookie to find our cookie named 'cart'
        var newCart = new Array(); // create a newCart array to use as our new session cookie 'cart'
        for(var i=0; i<COOKIES.length; i++){
            var CARTCOLUMN = COOKIES[i].split('=')
            if(CARTCOLUMN[0].includes('cart')){ //if cookie key == 'cart'
                var cart = CARTCOLUMN[1]; //track the 'cart' value which is in form of "cake-00002(1),fashion-00001(2)"
                if(cart.includes(',')){
                    var cartItem = cart.split(','); //we split the cart value
                    for(var i = 0; i < cartItem.length; i++){
                        if(cartItem[i].includes(this.productCode)){ //if object attribute is a substring of the cart value i.e the item we want to remove
                            continue; //do not do anything in this case
                        }else{  //if object attribute is not a substring of the cart value
                            newCart.push(cartItem[i]); //push each string to our newCart array
                        }
                    }
                }
            }
        }
        document.cookie = 'cart='+newCart.toString(); //lastly replace the session cookie 'cart' value with the string form of our newCart Array
    }

    this.checkCookie = function(){
        var COOKIES = document.cookie.split(';'); //We track the session cookie to find our cookie named 'cart'
        var result; //create a variable whose value is a boolean. 'true' means the item exist in cart. 'false' means the item does not exist in cart
        for(var i=0; i<COOKIES.length; i++){
            var CARTCOLUMN = COOKIES[i].split('=')
            if(CARTCOLUMN[0].includes('cart')){ //if cookie key == 'cart'
                if(CARTCOLUMN[1].includes(this.productCode)){ //if object attribute is a substring of 'cart' value
                    result = true; 
                }else{ //if object attribute is not a substring of 'cart' value
                    result = false; 
                }
                break;
            }
        }
        return result; //lastly return the bool result 
    }


    this.checkSaved = function(){
        var Saved = document.getElementById('saveditems').value
        var result; //create a variable whose value is a boolean. 'true' means the item exist in cart. 'false' means the item does not exist in cart
        if(Saved.includes(this.productCode)){
            result = true
        }else{
            result = false
        }
        return result; //lastly return the bool result 
    }


    this.recentView = function(){
        var COOKIES = document.cookie.split(';'); //We track the session cookie to find our cookie named 'recentview'
        var newrecentview = new Array(); // create a newrecentview array to use as our new session cookie 'recentview'
        for(var i=0; i<COOKIES.length; i++){
            if(COOKIES[i].includes('recentview')){ //if 'recentview' is a substring of the cookie string 
                var SAVEDITEMCOLOUMN = COOKIES[i].split('=');
                var cart = SAVEDITEMCOLOUMN[1]; //track the 'recentview' value which is in form of "cake-00002(1),fashion-00001(2)"
                if(cart != ''){ //if the 'cart' value is not empty
                    if(cart.includes(',')){
                        var cartItem = cart.split(','); //we split the recentview value
                        for(var i = 0; i < cartItem.length; i++){
                            newrecentview.push(cartItem[i]); //push each string to our newrecentview array
                        }
                    }else{
                        newrecentview.push(cart); //push each string to our newrecentview array
                    } 
                }
            }
        }
        
        newrecentview.push(this.productCode); // then push the item to the newrecentview array too
        document.cookie = 'recentview='+newrecentview.toString(); //lastly replace the session cookie 'recentview' value with the string form of our newCart Array
    }
}



//++++++++++++++++FUNCTION THAT USES THE ABOVE OBJECTS
function AddCart(param){ 
    var obj = new toSelect(param)
    obj.AddToCookie()
    alertUser('success','Product added successfully')//this is to alert the user that the product was added successfully
    var obj2 = new DetailView()
    obj2.hideDetail()

    getCartIndex('cartindex')//this request the total count of items from the server
}

function RemoveCart(param){
    var obj = new toSelect(param)
    obj.RemoveFromCookie()
    location.reload()
}

function IncreaseQuantity(param){
    var obj = new quantity(param)
    obj.increase()//increase the count
    var Elem = document.getElementsByClassName(param)[0]
    var x = Elem.innerHTML
    x = parseInt(x) + 1
    Elem.innerHTML = x

    getCartIndex('cartindex')//this request the total count of items from the server
    if(document.getElementById('checkout')){//if the webpage is the site cartpage
        getCartIndex('cartamount')//request the total price of items from the server
    }
}

function DecreaseQuantity(param){
    var Elem = document.getElementsByClassName(param)[0]
    var x = Elem.innerHTML
    x = parseInt(x)
    if(x == 1){
        return true
    }else{
        var obj = new quantity(param)
        obj.decrease()
        Elem.innerHTML = x - 1
    }

    getCartIndex('cartindex')//this request the total count of items from the server
    if(document.getElementById('checkout')){//if the webpage is the site cartpage
        getCartIndex('cartamount')//request the total price of items from the server
    }
}