let dropwrapper = document.querySelector(".drop-wrapper");
let inpFile = document.querySelector('#inpFile');
let fc = document.querySelector('.files-container');

dropwrapper.onclick=function () {
    inpFile.click();
}

document.ondragenter = function (e){
    e.stopPropagation();
    e.preventDefault();
}

document.ondragover = function (e){
    e.stopPropagation();
    e.preventDefault();
}


document.ondrop = function (e){
    e.stopPropagation();
    e.preventDefault();
    var files = e.target.files || (e.dataTransfer && e.dataTransfer.files);

    for (var i = 0; i < files.length; i++) {
        DoIt(files[i]);
    }
}


inpFile.addEventListener('change', function () {

    for (let i = 0; i < this.files.length; i++) {
        DoIt(this.files[i]);
    }
});

function DoIt(file){
    let name = file.name;
    let blob = '';
    let reader = new FileReader();
    var turn = Math.random().toString(16).slice(2);
    reader.addEventListener('load', function () {
        blob = this.result;
        let myDiv = ("<div class=\"row\">\n" +
            "                <div class=\"img-box col-12 col-md-3\"><img src=\""+blob+"\" alt=\"\"><label>"+name+"</label></div>\n" +
            "                <div class=\"textArea-box col-12 col-md-9\"><textarea name=\"\" id=\"code"+turn+"\" cols=\"30\" rows=\"10\">"+blob+"</textarea>" +
            "<div class=\"button-box\"><button class=\"copy btn btn-success\" onclick=\"copyCode('code"+turn+"')\">Copy</button></div>" +
            "</div>\n" +
            "                \n" +
            "            </div>");

        fc.innerHTML = fc.innerHTML+myDiv;

    });
    reader.readAsDataURL(file);
}

function copyToClipboard(text){

    // create hidden text element, if it doesn't already exist
    document.body.innerHTML+='<input type="text" id="tempinput" value="'+text+'" style=" opacity: 0; cursor: default; height: 0; padding: 0; border: none;">';
    var target = document.getElementById('tempinput');
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch (e) {
        succeed = false;
    }
    target.remove();
    if (succeed) {

    }
}
function copyCode(elemid){
    var elem = document.querySelector("#"+elemid);
    copyToClipboard(elem.value);
}