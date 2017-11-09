let client_id = '955493671398-tfqdpdjqih875eucq609c1vnc28bpfui.apps.googleusercontent.com';
let api_key = 'AIzaSyCMn8SUN0i26iSvz-MYpK7vvyMyMAMs67A';
let discovery_docs = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
let scopes = 'https://www.googleapis.com/auth/drive.metadata.readonly';

let authorizeButton = document.getElementById('authorize-button');
let signoutButton = document.getElementById('signout-button');

document.addEventListener("load", () => {
})

let loadClient = () => {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: 'AIzaSyCMn8SUN0i26iSvz-MYpK7vvyMyMAMs67A',
        clientId: '955493671398-tfqdpdjqih875eucq609c1vnc28bpfui.apps.googleusercontent.com',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

//Called after signin status changes.
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listFiles();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
*  Sign in the user upon button click.
*/
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

function listFiles() {
    gapi.client.drive.files.list({
        'pageSize': 25,
        'fields': "nextPageToken, files(id, name)"
    }).then(function (response) {
        appendPre('Files:');
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                appendPre(file.name + ' (' + file.id + ')');
            }
        } else {
            appendPre('No files found.');
        }
    });
}