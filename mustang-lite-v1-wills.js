var contactURLArray = [];
var contactArray = [];
var posInArray = 0;


function printIndex() {
    var indexRequest = new XMLHttpRequest();
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
        console.log("Contact: " + contact.firstName + " " + contact.lastName);
        contactArray.push(contact);
        contactText  = JSON.stringify(contactArray);
        contactText = contactText.replace(/}/g, "} <br/><br/>");
        contactText = contactText.replace(/]/g," ");
        contactText = contactText.replace(/\[/g," ");
        contactText = contactText.replace(/,/g," ");
        contactText = contactText.replace(/"/g," ");
        document.getElementById("contactsID").innerHTML = contactText;
        posInArray++;
        if (contactURLArray.length > posInArray) {
            loadNextContact(contactURLArray[posInArray]);
        }
    }

    contactRequest.send();
}

function logContacts() {
    console.log(contactArray);
}




