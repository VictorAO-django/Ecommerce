//Window Error Function
function showErr(msg,URL,lineNum,columnNo,error){
    var errWin = window.open("","osubWin","width=650px,height=600px")
    var winText = "<html><title>Error Window</title>"
    winText += "<body> <p>MSG: " + msg + ".</p>"
    winText += "<p>Document URL: " + URL + ".</p>"
    winText += "<p>Document COLUMN: " + columnNo + ".</p>"
    winText += "<p>Document ERROR: " + console.error(); + ".</p>"
    winText += "<p>Line Number: " + lineNum + ".</p>"
    winText += "</body></html>"
                
    errWin.document.write(winText);
    var oWidth = ((screen.availWidth - 650)/2);
    var oHeight = ((screen.availHeight - 600)/2);
    errWin.moveTo(oWidth,oHeight);
    return true;
}
window.onerror = showErr;

//++++++++++++++++++THIS IS FOR THE SWITCHING EFFECT OF THE TOP DISPLAY IMAGE++++++++++++++=+//
var switchText = ['topImage','NewtopImage']//set an array of the switching 'id' 
                                           //Each id has a transition effect in their style
                                           // Check css 'Top Img Container' & 'Display Img'
function switchImg(){//create a function
    var Elem = document.getElementById(switchText[0])//get the current img id
    Elem.id = switchText[1] //set the img id
    switchText = [switchText[1],switchText[0]]//interchange the switchText value
    setTimeout(switchImg,8000)//recall the function after 8000ms
}
//++++++++++++++++++END THIS IS FOR THE SWITCHING EFFECT OF THE TOP DISPLAY IMAGE++++++++++++++=+//



//++++++++++++++++++THIS IS FOR THE SWITCHING EFFECT OF THE TOP DISPLAY IMAGE++++++++++++++++//

function popOption(elemID,Ooptions){//+++Create an Object with two parameters. the first parameter is a text(id).
//+++Second parameter is always an array containing text you want to displayas options.

    this.elemID = elemID || ' '     //+++Object attribute. Empty String if not Provided
    this.Ooptions = Ooptions || []  //+++Object attribute. Empty Array if not provided

    this.Ofocus = function(){  //Object method to create a popup option onscreen
        var Elem = document.getElementById(this.elemID).getBoundingClientRect()//+++get the coordinate of the 
        //+++Element you want to assign a popup to
        var popContainer = document.createElement('div')//+++create New div element as a container
        popContainer.id = 'popContainer'//+++check Css 'POPOPTION CONTAINER' for neccesary style
        popContainer.style.left = Elem.x +'px'//assign 'Elem' x coordinate
        popContainer.style.top = 270 +'px'
        for(var i = 0; i<Ooptions.length; i++){//loop through the object Ooption attribute -- an array
            var theOPtion = document.createElement('a')//create New anchor Element
            theOPtion.id = 'popOption'//check Css 'POPOPTION ANCHOR' for neccesary style
            theOPtion.href = (this.Ooptions[i] == 'logout')? ('/'+ this.Ooptions[i]+'/?next=/'):('/'+ this.Ooptions[i])
            theOPtion.innerHTML = this.Ooptions[i]
            popContainer.appendChild(theOPtion)//append to the New div container
        }
        document.body.appendChild(popContainer)//append to body
    }

    this.Oblur = function(){//Object method to remove a popup option onscreen
        document.body.removeChild(document.getElementById('popContainer'))//Remove the container from document
    }
}

function showPopOption(ID,Ocase){
    if(ID == 'username'){
        var param
        if(document.getElementById('checkUser')){
            param = ['settings','logout']
        }else{
            param = ['settings','login']
        }
        var pop = new popOption(ID,param)
        if(Ocase == 'focus'){
            pop.Ofocus()
        }
    }
}
//++++++++++++++++++THIS IS FOR THE SWITCHING EFFECT OF THE TOP DISPLAY IMAGE++++++++++++++++//


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CREATE CUSTOM OBJECT TO RESPOND TO USER CLICK EVENT ON ITEM ON WEBPAGE 
// The Object has 7 attributes(OproductClass,OproductCode,Oprice,OpriceToSell,Odescription,Onotice)
//
// OproductClass value is the item class in form of 'Fashion' or 'Cake'
// OproductCode value is the item code in form of 'boot-00001'
// Oimagesrc value is the item image src in .png or .jpg form
// Oprice value is the item price in form of '8000'
// OpriceToSell value is the item price to sell in form of '9000'
// Odescription value is the item description eg 'Blue long sleeves'    
// Onotice value is any important notice for the product eg 'Delivery fee for long distance'
//
// The object has 2 method(showDetail, hideDetail)
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function DetailView(OproductClass,OproductCode,Oimagesrc,Oprice,OpriceToSell,Odescription,Onotice){
    this.OproductClass = OproductClass || ' '
    this.OproductCode = OproductCode || ' '
    this.Oimagesrc = Oimagesrc || ' '
    this.Oprice = Oprice || ' '
    this.OpriceToSell = OpriceToSell || ' '
    this.Odescription = Odescription || ' '
    this.Onotice = Onotice || ''

    this.showDetail = function(){
        var productClass = document.getElementById('productclass')
        productClass.innerText = this.OproductClass

        var productImage = document.getElementById('productImage')
        productImage.src = this.Oimagesrc

        var priceSpan = document.getElementById('price')
        priceSpan.innerText = this.Oprice

        var priceToSellSpan = document.getElementById('priceToSell')
        priceToSellSpan.innerText = this.OpriceToSell

        var descriptionSpan = document.getElementById('description')
        descriptionSpan.innerText = this.Odescription
        
        var obj = new toSelect(this.OproductCode)
        if(obj.checkCookie()){
            var OBJ = new quantity(this.OproductCode)
            document.getElementById('quantityContainer').style.display = 'flex'
            document.getElementById('removeContainer').style.display = 'flex'
            document.getElementById('addToCart').style.display = 'none'
            document.getElementById('quantityNumber').className = this.OproductCode
            document.getElementById('quantityNumber').innerHTML = OBJ.quantity()
            document.getElementById('quantityIncrease').href = "javascript:IncreaseQuantity('"+ this.OproductCode +"')"
            document.getElementById('quantityDecrease').href = "javascript:DecreaseQuantity('"+ this.OproductCode +"')"
            document.getElementById('removeFromCart').href = "javascript:RemoveCart('"+ this.OproductCode +"')"
        }else{
            document.getElementById('quantityContainer').style.display = 'none'
            document.getElementById('removeContainer').style.display = 'none'
            var addToCart = document.getElementById('addToCart')
            addToCart.style.display = 'flex'
            addToCart.href = "javascript:AddCart('" + this.OproductCode + "')"
        }

        if(obj.checkSaved()){
            document.getElementById('saveItem').href = "javascript:alertUser('failed','Item already Saved. Check saved items')"//this is to alert the user that the product was added successfully
        }else{
            document.getElementById('saveItem').href = "javascript:saveItem('" + this.OproductCode +"')"
        }
        

        var noticeText = document.getElementById('noticeText')
        noticeText.innerHTML = this.Onotice

        document.getElementById('OdetailContainer').removeChild(document.getElementById('loading'))
    }

    this.hideDetail = function(){
        document.getElementById('OdetailContainer').id = 'detailContainer'
        document.getElementById('detailContainer').style.left = window.innerWidth + 'px'
    }
}

var loadTrail = 0
var detail = new Array()

function showdetail(productClass,productCode,imgSrc,amount,amountToPay,description,noticeText){
    var x = new DetailView(detail['productClass'],detail['productCode'],detail['imgSrc'],detail['amount'],detail['amountToPay'],detail['description'],detail['noticeText'])
    if(productClass != 'hide'){
        if(loadTrail < 1){
            detail['productClass'] = productClass
            detail['productCode'] = productCode
            detail['imgSrc'] = imgSrc
            detail['amount'] = amount
            detail['amountToPay'] = amountToPay
            detail['description'] = description
            detail['noticeText'] = noticeText

            var loading = document.createElement('div')
            loading.id = 'loading'
            var loadgif = document.createElement('img')
            loadgif.src = '/static/loading-2.gif'
            loading.appendChild(loadgif)

            var detailContainer = document.getElementById('detailContainer') ? document.getElementById('detailContainer') : document.getElementById('OdetailContainer')
            if(document.getElementById('detailContainer')){
                detailContainer.id = 'OdetailContainer'
                document.getElementById('OdetailContainer').style.left = (window.innerWidth - 353) +'px';
            }
                detailContainer.insertBefore(loading,detailContainer.firstChild)
                T = setTimeout(showdetail,2000)
                loadTrail++
 
        }else{
            x.showDetail()
            loadTrail = 0

            var checkRecentView = new quantity(detail['productCode']) //do this to integrate recent view cookie
            if(!checkRecentView.recentViewExist()){ //if the item code does not exist in the recent view cookie i.e if the boolean returned is false
                var recentView = new toSelect(detail['productCode'])
                recentView.recentView() // then save the item code in the recent view cookie
            }
        }
    }else{
        x.hideDetail()
    }
}
//+++++++++++++++++END THIS IS FOR PRODUCT DETAIL VIEW ++++++++++++++++++++++//







//+++++++++++++++++++++++SETTING APIS+++++++++++++++++++++++++++++//
var settingTrail = true
var showSettingFormElemID
function showSettingForm(elemID){
    var formElem = ['firstname','lastname','gender','email','phone']
    var loading = document.createElement('div')
    loading.id = 'loading'
    var loadgif = document.createElement('img')
    loadgif.src = '/static/loading-2.gif'
    loading.appendChild(loadgif)

    if(settingTrail == true){
        document.getElementById('settings_part2').appendChild(loading)
        setTimeout(showSettingForm,2000)
        settingTrail = false
        showSettingFormElemID = elemID
    }else{
        document.getElementById('settings_part2').removeChild(document.getElementById('loading'))
        for(var i = 0; i < formElem.length; i++){
            document.getElementById(formElem[i]).style.display = 'none'
        }
        for(var i = 0; i < formElem.length; i++){
            if(showSettingFormElemID == 'all'){
                document.getElementById(formElem[i]).style.display = 'flex'
            }else{
                if(formElem[i] == showSettingFormElemID){
                    document.getElementById(formElem[i]).style.display = 'flex'
                }
            }
        }
        settingTrail = true   
    }
    document.getElementById('settingSave').style.display = 'flex'
}
//+++++++++++++++++++++++END SETTING APIS+++++++++++++++++++++++++++++//




//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// THIS IS THE OBJECT THAT CREATE CUSTOM ALERT FOR THE USER. it requires one attribute which is the message to
// alert the user. It has 3 methods ,ALERT to display success alert, ERROR to display error alert, CLOSE to close
// alert.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function CustomAlert(message){
    this.message = message || ''; //message attribute
     
    var dialogbox = document.createElement('div') // CSS-- Dialog Box//
    dialogbox.className = 'dialogbox'                                //
    var doneImg = document.createElement('img')                      //
    doneImg.src = '/static/done.png'                                 //THIS CREATES THE ALERT BOX AND ASSIGN THE
    var dialogMessage = document.createElement('p')                  //ALERT MESSSAGE AS THE DISPLAY TEXT
    dialogMessage.innerHTML = this.message;                          //

    dialogbox.appendChild(doneImg);
    dialogbox.appendChild(dialogMessage);

    this.ALERT = function(){//THIS IS FOR SUCCESS ALERT WITH GREEN BACKGROUND
        dialogbox.id = 'dialogboxsuccess'; //neccessary identifier
        document.body.appendChild(dialogbox); //display it on page
    }
    
    this.ERROR = function(){//THIS IS FOR ERROR ALERT WITH GREEN BACKGROUND
        dialogbox.id = 'dialogboxerror'; //neccessary identifier
        document.body.appendChild(dialogbox); //display it on page
    }

    this.CLOSE = function(){ //THIS IS TO CLOSE THE ALERT 
        document.body.removeChild(document.getElementsByClassName('dialogbox')[0])//remove alert
    }
}

var trail = true

function alertUser(mode,message){
    var obj = new CustomAlert(message)
    if(trail){
        if(mode == 'success'){
            obj.ALERT()
        }else{
            obj.ERROR()
        }
        
        trail=false
        setTimeout(alertUser,2000)
    }else{
        obj.CLOSE()
        trail = true
    }
}
//+++++++++++++++++++++++ END CUSTOM ALERT +++++++++++++++++++++++++++++//




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//THIS FUNCTION IS TO REQUEST CART TOTAL COUNT  AND TOTAL PRICE FROM THE BACKEND SERVER
//it requires one parameter which helps to define what we're requesting for, whether 'Total Count' or 'Total Price'
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getCartIndex(param){
    var request = new XMLHttpRequest()
    request.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){//if request is successful
            switch(param){
                case 'cartindex': //if parameter is 'cartindex'
                    document.getElementById('cartNumber').innerText = this.responseText; //apply Total Count
                    break;
                case 'cartamount': //if parameter is 'cartamount'
                    document.getElementById('checkoutPrice').innerText = 'CHECKOUT (' + this.responseText + ')'; //apply Total Price
                    break
            }
        }
    }
    switch(param){
        case 'cartindex': //if parameter is 'cartindex'
            request.open('GET','/getdetail?cart_index',true); //'request for Total Count
            break;
        case 'cartamount': //if parameter is 'cartamount'
            request.open('GET','/getdetail?cart_amount',true); //'request for Total Price
            break
    }
    request.send()
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//THIS FUNCTION IS TO REQUEST CART TOTAL COUNT  AND TOTAL PRICE FROM THE BACKEND SERVER
//it requires one parameter which helps to define what we're requesting for, whether 'Total Count' or 'Total Price'
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function saveItem(param,mode){
    var request = new XMLHttpRequest()
    request.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){//if request is successful
            if(this.responseText.includes('true')){
                if(mode == 'delete'){
                    location.reload()
                }else{
                    alertUser('success','Product saved successfully')//this is to alert the user that the item was saved successfully
                    var saveditems = document.getElementById('saveditems').value
                    var newSavedItems = saveditems + "," + param
                    document.getElementById('saveditems').value = newSavedItems
                    var obj2 = new DetailView()
                    obj2.hideDetail()
                }
            }else{
                alertUser('failed','Please ensure you provide neccessary information on your account management')//this is to alert the user that the product was added successfully
            }
        }
    }
    if(mode == 'delete'){
        requestUrl = '/saveItem/'+ param  +'?delete'
    }else{
        requestUrl = '/saveItem/'+ param 
    }
    request.open('GET',requestUrl,true); //'request for Total Count
    request.send()
}





function checkout(){
    document.getElementById('checkoutform').submit()
}

function checkWidth(){alert(window.innerWidth)}

function decideDisplayImage(){
    var imageUrl1 = '/static/displayimage';
    var imageUrl2 = 'px.jpg'
    const banner1 = document.getElementById('banner1');
    const banner2 = document.getElementById('banner2');
    
    if(window.innerWidth >= 1300 && window.innerWidth <1400){
        banner1.src = imageUrl1 + 1300 + imageUrl2;
        banner2.src = imageUrl1 + 1300 + imageUrl2;
    }else if(window.innerWidth >= 1200 && window.innerWidth <1300){
        banner1.src = imageUrl1 + 1200 + imageUrl2;
        banner2.src = imageUrl1 + 1200 + imageUrl2;
    }else if(window.innerWidth >= 1100 && window.innerWidth <1200){
        banner1.src = imageUrl1 + 1100 + imageUrl2;
        banner2.src = imageUrl1 + 1100 + imageUrl2;
    }
}


function sideBar(mode){
    var oMode = (mode == 'hide')? 'none' : 'flex';
    document.getElementById('sideBar').style.display = oMode;
    var newMode = (mode == 'hide')? 'show' : 'hide'
    document.getElementById('menu').href = "javascript:sideBar('" + newMode +"')"
}


window.onload = function(){
    decideDisplayImage()
    switchImg()
    getCartIndex('cartindex')//this request the total count of items from the server
    if(document.getElementById('checkout')){//if the webpage is the site cartpage
        getCartIndex('cartamount')//request the total price of items from the server
    }

    document.getElementById('detailContainer').style.height = window.innerHeight + 'px'
    document.getElementById('detailContainer').style.left = window.innerWidth + 'px'
    if(document.cookie.indexOf('cart') == -1){
        document.cookie = "cart = "
    }
    if(document.cookie.indexOf('recentview') == -1){
        document.cookie = "recentview = "
    }

    displayAddress()

    if(window.innerWidth > 768){
        document.getElementById('menu').style.display = 'none';
    }
}

window.onresize = function(){
    location.reload()
}