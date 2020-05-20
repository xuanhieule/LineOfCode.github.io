var input = document.querySelector('input');
var prs = document.querySelector('.result');
var pName = document.querySelector('.name');
var pSize = document.querySelector('.size');
var pComment = document.querySelector('.comment');
var pLogic = document.querySelector('.Logic');
var pLoc = document.querySelector('.loc');

input.addEventListener('change', function () {
    //reset
    pName.innerHTML = '';
    pSize.innerHTML = '';
    prs.innerHTML = '';

    var linenull = 0;
    var comment = 0;
    var logic = 0;
    var files = input.files;
    var java = /(\.java)/;
    var txt = /(\.txt)/;
    var docx = /(\.docx)/;
    if (files.length == 0) {
        prs.innerHTML = '0';
    };
    const file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        const file = e.target.result;
        var lines = file.split(/\r\n|\n/);
        var linesjavanull = file.split(/\ n\n/);

        // read file txt
        if (txt.exec(input.files[0].name) || docx.exec(input.files[0].name)) {
            pName.innerHTML = input.files[0].name;
            pSize.innerHTML = input.files[0].size + ' byte';
            prs.innerHTML = lines.length;
        }
        // read fiel java
        else {
            if (java.exec(input.files[0].name)) {

                //đếm các dong trống
                for (x of lines) {
                    if (x.trim() === '') {
                        linenull++;
                    }
                }
                console.log(linenull);


                //đếm comment line
                for (x of lines) {
                    if (x.indexOf('//') !== -1 || x.indexOf('/*') !== -1) {
                        comment++;
                    }
                }

                // đếm các lệnh có ;
                for (x of lines) {
                    if (x.charAt(x.length - 1) === ";") {
                        logic++;
                    }
                }
                console.log("lenh co ; : " + logic);

                //đếm các khối lệnh
                var block = 0;
                var characters = 0;
                for (x of lines) {
                    if (x.indexOf('{') !== -1) {
                        //console.log(x);
                        block++;
                    }
                }
                console.log("block: " + block);
                var sumlogic = logic + block;
                var sumPhy = lines.length - linenull - comment;
                pName.innerHTML = input.files[0].name;
                pSize.innerHTML = input.files[0].size + ' byte';
                pLoc.innerHTML = lines.length;
                prs.innerHTML = sumPhy;
                pLogic.innerHTML = sumlogic;
                pComment.innerHTML = comment;
            }
        }
    };
    reader.onerror = function (e) {
        alert(e.target.error.name);
    };
    reader.readAsText(file);
});

// JS FRONTEND
document.addEventListener("DOMContentLoaded",function(){
    var btn = document.querySelector('.border-me');
    var contentMain = document.querySelectorAll(".contentMain");
    var layout = document.querySelectorAll(".layout");
    btn.onclick = function(){
        contentMain[0].classList.toggle('push');
        layout[0].classList.toggle('unhide-layout');
    }
    layout[0].onclick = function(){
        contentMain[0].classList.toggle('push');
        layout[0].classList.toggle('unhide-layout');
    }
},false);
