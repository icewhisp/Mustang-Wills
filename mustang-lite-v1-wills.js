var contactURLArray = [];
var contactArray = [];
var currentContact;
var posInArray = 0;



function printIndex() {
    var indexRequest = new XMLHttpRequest();
    alert("Hello and welcome to my Mustang Version 2, if you enter zip codes first it will autofill the rest of the information!");
    indexRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
    indexRequest.onload = function() {
        console.log("Index JSON:" + indexRequest.responseText);
        var niceText = indexRequest.responseText;
        niceText = niceText.replace(/}/g, "} <br/>");
        niceText = niceText.replace(/]/g," ");
        niceText = niceText.replace(/\[/g," ");
        niceText = niceText.replace(/,/g," ");
        document.getElementById("indexID").innerHTML = niceText;
        contactIndex = JSON.parse(indexRequest.responseText);
        contactURLArray.length = 0;
        for (i=0; i<contactIndex.length; i++) {
            contactURLArray.push(contactIndex[i].ContactURL);
        }
        console.log("ContactURLArray: " + JSON.stringify(contactURLArray));
    }
    indexRequest.send();
}

function loadContacts() {
    contactArray.length = 0;
    posInArray = 0;
    
    if (contactURLArray.length > posInArray) { //I tried to make this a while loop here but it would just print out he first contact over and over
        console.log("loading a contact");
        loadNextContact(contactURLArray[posInArray]);
        
    }

}

function loadNextContact(URL) {
    console.log("URL: " + URL);
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', URL);
    contactRequest.onload = function() {
        console.log(contactRequest.responseText);
        var contact;
        contact = JSON.parse(contactRequest.responseText);
        console.log("Contact: " + contact.firstName);
        contactArray.push(contact);

        document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray);

        posInArray++;
        if (contactURLArray.length > posInArray) {
            loadNextContact(contactURLArray[posInArray]);
        }
        else {
            posInArray = 0;
            displayContact()
            console.log(contactArray);
        }
    }

    contactRequest.send();
}

function logContacts() {
    console.log(contactArray);
}

function nextConctact(){
    if (posInArray < (contactArray.length-1)) {
        posInArray++;
    }
    currentContact = contactArray[posInArray];
    displayContact();

}
function previous(){
    if (posInArray > 0) {
        posInArray--;
    }
    currentContact = contactArray[posInArray];
    displayContact();

}
function displayContact(){
    console.log(posInArray);
    currentContact = contactArray[posInArray];
    console.log(currentContact);
    
    document.getElementById("nameID").value = currentContact.preferredName;
    document.getElementById("emailID").value = currentContact.email;   
    document.getElementById("cityID").value = currentContact.city;   
    document.getElementById("stateID").value = currentContact.state;
    document.getElementById("zipID").value = currentContact.zip;  

}
function del()
{
    console.log("Deleting: " + contactArray[posInArray]);
    contactArray.splice(posInArray,1);
    displayContact()

}
function add(){
    var newContact = {"preferredName": document.getElementById("nameID").value, "email":document.getElementById("emailID").value,"city":document.getElementById("cityID").value,"state":document.getElementById("stateID").value,"zip":document.getElementById("zipID").value};
    contactArray.splice(posInArray,0,newContact);
    document.getElementById("nameID").value = "Added";
    document.getElementById("emailID").value = "Added";   
    document.getElementById("cityID").value = "Added";   
    document.getElementById("stateID").value = "Added";
    document.getElementById("zipID").value = "Added";  
    
}
function updated(){
    var newContact = {"preferredName": document.getElementById("nameID").value, "email":document.getElementById("emailID").value,"city":document.getElementById("cityID").value,"state":document.getElementById("stateID").value,"zip":document.getElementById("zipID").value};
    contactArray.splice(posInArray,1,newContact);
    document.getElementById("nameID").value = "Updated";
    document.getElementById("emailID").value = "Updated";   
    document.getElementById("cityID").value = "Updated";   
    document.getElementById("stateID").value = "Updated";
    document.getElementById("zipID").value = "Updated";  
    
}

function getLoc()
{
    var zip =  document.getElementById("zipID").value;

}

function getPlace() {
    var zip = document.getElementById("zipID").value
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "CityState.php?zip=" + zip);
    // Register the embedded handler function
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            console.log("result:"+result);
            var place = result.split(', ');
            if (document.getElementById("cityID").value == "")
                document.getElementById("cityID").value = place[0];
            if (document.getElementById("stateID").value == "")
                document.getElementById("stateID").value = place[1];
        }
    }
    
    xhr.send(null);
}