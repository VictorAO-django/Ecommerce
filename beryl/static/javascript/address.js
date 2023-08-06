//+++++++++++++++++++++++ ADDRESS API+++++++++++++++++++++++++++++//

var validState = ['abia','adamawa','akwa ibom','anambra','bauchi','bayelsa','benue','borno','cross river',
    'delta','ebonyi','edo','ekiti','enugu','gombe','imo','jigawa','kaduna','kano','katsina','kebbi','kogi','kwara',
    'lagos','Nasarawa','niger','ogun','ondo','osun','oyo','plateau','rivers','sokoto','taraba','yobe','zamfara','Abuja']

var Town = new Array()
Town['abia'] = ['aba','umuahia']
Town['adamawa'] = ['yola','nunmen','jimeta']
Town['akwa ibom'] = ['uyo','okobo','oron']
Town['anambra'] = ['awka','anambra','ogbaru']
Town['bauchi'] = ['bauchi','tafawa balewa','shira']
Town['bayelsa'] = ['yenegoa','ogbia','nembe']
Town['benue'] = ['obi','logo','guma']
Town['borno'] = ['maiduguri','gubio','mafa']
Town['cross river'] = ['calabar','obudu','abi']
Town['delta'] = ['burutu','bomadi','anioda']
Town['ebonyi'] = ['abakalki','ezza','onicha']
Town['edo'] = ['benin','oredo','egor']
Town['ekiti'] = ['ado','ikere','oye']
Town['enugu'] = ['aninri','nsukka','nkanu']
Town['gombe'] = ['gombe','akko','dukku']
Town['imo'] = ['oweri','oru','ideato']
Town['jigawa'] = ['duste','garki','babura']
Town['kaduna'] = ['kaduna','zaria','sanga']
Town['kano'] = ['kano','gezawa','dala']
Town['katsina'] = ['katsina','danja','kusada']
Town['kebbi'] = ['birnin kebbi','suru','yauri']
Town['kogi'] = ['yagba','ijumu','kogi']
Town['kwara'] = ['ilorin','irepodun','oyu ']
Town['lagos'] = ['ikeja','ikorodu','oshodi']
Town['nasarawa'] = ['lafia','karu','wamba']
Town['niger'] = ['edati','tafa','mariga']
Town['ogun'] = ['abeokuta','egbado','ijebu']
Town['ondo'] = ['akoko','akure','owo']
Town['osun'] = ['osogbo','ilesha','ife']
Town['oyo'] = ['ibadan','ibarapa','saki']
Town['plateau'] = ['jos','langtang','shendam']
Town['rivers'] = ['port harcourt','oyigbo','ahoada']
Town['sokoto'] = ['sokoto','goronyo','yabo']
Town['taraba'] = ['jalingo','takum','bali']
Town['yobe'] = ['damaturu','geidam','gulani']
Town['zamfara'] = ['anka','gummi','bungudu']
Town['abuja'] = ['abaji','kuje','dukku']


var Point = new Array()
//+++++ABIA STATE+++++//
Point['aba'] = [
    ['Rowmay Hall','opobo road'],
    ['Ariza Plaza Hotel Hall','70B,ikot-Ekpene Road,Ogor Hill']
]
Point['umuahia'] = [
    ['langen palace resort hall','129 Agnunyi ironsi Layout'],
    ['Pat Tona International Hall','Umu Obasi 440236'],
    ['Cocktail Hotel Hall','Mgbaja Ossah junction']
]
//+++++ADAMAWA STATE+++++//
Point['yola'] = [
    ['Yukuben Hotel Hall','32 Philip Meken street off Barack Masakare'],
    ['Binani Exquite Suite Hall','18 Ahmadu Ribadu Road off sokoto Road']
]
Point['nunmen'] = [
    ['TK Suite Hall','No2 Ahmadu Bello Way'],
    ['Mope Hotel HAll','Yola Hunman Road, 642102']
]
Point['jimeta'] = [
    ['Bekaji Guest Inn Hall','24 Galadima Amunu Road']
]
//+++++EKITI  STATE+++++//
Point['ado']=[
    ['fajuyi park','around od garage']
]
Point['ikere']=[
    []
]
Point['oye']=[
    []
]



function inputIt(ID,oValue,oValue2){
    document.getElementsByName(ID)[0].value = oValue
    document.body.removeChild(document.getElementById('popContainer'))
    if(ID == 'point'){
        document.getElementsByName('address')[0].value = oValue2
    }
}

function StateInputOption(oValue){
    if(document.getElementById('popContainer')){//if the element already exist
        document.body.removeChild(document.getElementById('popContainer'))//delete the element
    }
    //++++++++++++ ID is use as a reference an object ++++++++++++
    var Elem = document.getElementsByName('state')[0].getBoundingClientRect()//+++get the coordinate of the 
        //+++Element you want to assign a popup to
    var popContainer = document.createElement('div')//+++create New div element as a container
    popContainer.id = 'popContainer'//+++check Css 'POPOPTION CONTAINER' for neccesary style
    popContainer.style.left = Elem.x +'px'//assign 'Elem' x coordinate
    popContainer.style.top = 370 +'px'
    for(var i = 0; i<validState.length; i++){//loop through the object Ooption attribute -- an array
        if(validState[i].indexOf(oValue) != -1){
            var theOPtion = document.createElement('a')//create New anchor Element
            theOPtion.id = 'popOption'//check Css 'POPOPTION ANCHOR' for neccesary style
            theOPtion.href = "javascript:inputIt('state'" +",'" + validState[i]+"')"
            theOPtion.innerHTML = validState[i]
            popContainer.appendChild(theOPtion)//append to the New div container
        } 
    }
    if(document.getElementById('popContainer')){//if the element already exist
        document.body.removeChild(document.getElementById('popContainer'))//delete the element
    }
    document.body.appendChild(popContainer)//append new elem to body
}

function LocationInputOption(stateValue){
    if(document.getElementById('popContainer')){//if the element already exist
        document.body.removeChild(document.getElementById('popContainer'))//delete the element
    }
    var Elem = document.getElementsByName('location')[0].getBoundingClientRect()//+++get the coordinate of the 
        //+++Element you want to assign a popup to
    var popContainer = document.createElement('div')//+++create New div element as a container
    popContainer.id = 'popContainer'//+++check Css 'POPOPTION CONTAINER' for neccesary style
    popContainer.style.left = Elem.x +'px'//assign 'Elem' x coordinate
    popContainer.style.top = 410 +'px'
    if(Town[stateValue]){
        for(var i = 0; i < Town[stateValue].length; i++){//loop through the object Ooption attribute -- an array
            var theOPtion = document.createElement('a')//create New anchor Element
            theOPtion.id = 'popOption'//check Css 'POPOPTION ANCHOR' for neccesary style
            theOPtion.href = "javascript:inputIt('location'" +",'" + Town[stateValue][i]+"')"
            theOPtion.innerHTML = Town[stateValue][i]
            popContainer.appendChild(theOPtion)//append to the New div container
        }
        if(document.getElementById('popContainer')){//if the element already exist
            document.body.removeChild(document.getElementById('popContainer'))//delete the element
        }
        document.body.appendChild(popContainer)//append new elem to body
    }
}

function PointInputOption(townValue){
    if(document.getElementById('popContainer')){//if the element already exist
        document.body.removeChild(document.getElementById('popContainer'))//delete the element
    }
    var Elem = document.getElementsByName('point')[0].getBoundingClientRect()//+++get the coordinate of the 
        //+++Element you want to assign a popup to
    var popContainer = document.createElement('div')//+++create New div element as a container
    popContainer.id = 'popContainer'//+++check Css 'POPOPTION CONTAINER' for neccesary style
    popContainer.style.left = Elem.x +'px'//assign 'Elem' x coordinate
    popContainer.style.top = 440 +'px'
    if(Point[townValue]){
        for(var i = 0; i < Point[townValue].length; i++){//loop through the object Ooption attribute -- an array
            var theOPtion = document.createElement('a')//create New anchor Element
            theOPtion.id = 'popOption'//check Css 'POPOPTION ANCHOR' for neccesary style
            theOPtion.href = "javascript:inputIt('point'" +",'" + Point[townValue][i][0]+ "','" + Point[townValue][i][1] +"')"
            theOPtion.innerHTML = Point[townValue][i][0]
            popContainer.appendChild(theOPtion)//append to the New div container
        }
        if(document.getElementById('popContainer')){//if the element already exist
            document.body.removeChild(document.getElementById('popContainer'))//delete the element
        }
        document.body.appendChild(popContainer)//append new elem to body
    }
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// VALIDATION PROCESS FUNCTION
// this function returns an array of length 1. The first content of the array is a boolean where true tells us the 
// validation is successful and vice versa. The second content is the compiled data that will be sent to the backend
// server for further processing.
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function validateAddress(){
    var StateValue = document.getElementsByName('state')[0].value // state address value
    var LocationValue = document.getElementsByName('location')[0].value // location address value
    var DeliveryPoint = document.getElementsByName('point')[0].value // deliverypoint address value
    var AddressPoint = document.getElementsByName('address')[0].value // address value 

    var check = false
    var valueToSend

    for(var i = 0; i<validState.length; i++){ //loop through the valid states we have
        if(validState[i] == StateValue){

            var userState = validState[i]
            
            for(var u = 0; u<Town[userState].length; u++){//loop through the Town we have
                if(Town[validState[i]][u] == LocationValue){ // check if the town the user selected is corresponding to the stateValue selected
                    var userTown = Town[userState][u]
                    for(var j = 0; j < Point[userTown].length; j++){ //if true, then loop through the available points we have and check if it is corresponding to the Town selected
                        var userPoint = Point[userTown][j]
                        if(userPoint[0] == DeliveryPoint){
                            check = true
                            break;
                        }
                    }
                    break;
                }
            }
            //if every data corresponds
            // then we compile our data
            let TotalAddress = document.getElementById('TotalAddress')
            if(TotalAddress.value == ''){
                valueToSend = '[' + StateValue + ',' + LocationValue + ',' + DeliveryPoint + ',' + AddressPoint + ']'
            }else{
                valueToSend = TotalAddress.value + '#' +'[' + StateValue + ',' + LocationValue + ',' + DeliveryPoint + ',' + AddressPoint + ']'
                
            }
            break;
        }else{ //if every data does not corresponds
            check = false // the stateCheck = false
        }
    }
    return [check,valueToSend] //return the array of lenght 1
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  CREATE CUSTOM OBJECT TO ADD NEW ADDRESS TO USER ACCOUNT 
//  The object has 2 attributes. The first one 'param1' is the id of the parent element where the form will appear.
//  The second attribute 'param2' is the id of the current element occupying the parent element
//
//  The object also has 1 method. The method aim is to compile and create an html structure of form
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function newAddress(param1,param2){
    this.param1 = param1 || ' ' // first attribute
    this.param2 = param2 || ' ' // second attribute

    this.openAddress = function(){ // only method
        var formContainer = document.createElement('form') //create a form1 element just to obtain data from user
        formContainer.action = ''
        formContainer.id = 'addAdressForm'
            
        var State = document.createElement('input') //create a form1 input element to obtain state address data 
        State.type = 'text'                         //from the user
        State.name = 'state'
        State.placeholder = 'state'
        State.oninput = function(){
            StateInputOption(State.value)//this function is to provide user with automatic input as the user types
        }

        var DLocation = document.createElement('input')//create a form1 input element to obtain location address
        DLocation.type = 'text'                        //data from the user
        DLocation.name = 'location'
        DLocation.placeholder = 'location'
        DLocation.readOnly = true //it is a read only input
        DLocation.onclick = function(){
            LocationInputOption(State.value)//this function is to provide user with automatic selection of input
            //value since it is a readonly input
        }

        var Point = document.createElement('input')//create a form1 input element to obtain Point address
        Point.type = 'text'
        Point.name = 'point'
        Point.placeholder = 'delivery point'
        Point.readOnly = true //it is a read only input
        Point.onclick = function(){
            PointInputOption(DLocation.value)//this function is to provide user with automatic selection of input 
            //value since it is a readonly input
        }

        var address = document.createElement('input')//create a form1 input element to obtain address. 
        address.type = 'text'                        //there the user does not have to input anything here
        address.name = 'address'                     //there is a script that automatically generate its value
        address.placeholder = 'address'
        address.readOnly =  //it is a read only input

        formContainer.appendChild(State)
        formContainer.appendChild(DLocation)
        formContainer.appendChild(Point)
        formContainer.appendChild(address)


        document.getElementById(param1).removeChild(document.getElementById(param2))
        document.getElementById('addNewAddress').style.display = 'flex'
        document.getElementById(param1).insertBefore(formContainer,document.getElementById('mainAddAdressForm'))
    }
}

function address(param1,param2){
    var x = new newAddress(param1,param2)
    x.openAddress()
}
//+++++++++++++++++++++++END ADDRESS API+++++++++++++++++++++++++++++//

function displayAddress(){
    if(document.getElementsByName('addressValue')){
        const AddressLength = document.getElementsByName('addressValue').length
        for(var i = 0; i<AddressLength; i++){
            let Address = document.getElementsByName('addressValue')[i]
            let AddressValue = Address.value
            let x = AddressValue.indexOf('[')
            let y = AddressValue.indexOf(']')
            AddressValue = AddressValue.substring((x+1),y)
            AddressValue = AddressValue.split(',')
            document.getElementsByName('displayState')[i].innerText = AddressValue[0]
            document.getElementsByName('displayLocation')[i].innerText = AddressValue[1]
            document.getElementsByName('displayPoint')[i].innerText = AddressValue[2]
            document.getElementsByName('addressText')[i].href = "javascript:deleteAddress('"+ AddressValue +"')"
        }
    }
}

function saveAddress(){
    var control = validateAddress() //this function returns an array of length 1. The first content of the 
    //array is a boolean where true tells us the validation is successful and vice versa. The second content
    //is the compiled data that will be sent to the backend server for further processing.

    if(control[0]){ // if validation success
        document.getElementById('mainFormInput').value = control[1]//pass the compiled data to the form input
        //that will be submitted
        document.getElementById('mainAddAdressForm').submit()//then sumbit the form
    }else{ // if validation failed
        alertUser('error','kindly input the correct state and corresponding data')//alert the user
    }
}


function deleteAddress(addressToRemove){
    let TotalAddress = document.getElementById('TotalAddress').value
    TotalAddress = TotalAddress.split('#')
    var newAddress = []
    for(var i = 0; i<TotalAddress.length; i++){
        if(TotalAddress[i].includes(addressToRemove)){
            continue;
        }else{
            newAddress.push(TotalAddress[i])
        }
    }
    
    var valueToSend = ''
    if(newAddress.length == 1){
        valueToSend = newAddress[0]
    }else{
        valueToSend = newAddress.join("#")
    }

    document.getElementById('mainFormInput').value = valueToSend//pass the compiled data to the form input
    //that will be submitted
    document.getElementById('mainAddAdressForm').submit()//then sumbit the form
}