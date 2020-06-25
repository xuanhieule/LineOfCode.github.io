
function addRow(tableId, name, size, ploc, lloc, blank, comment) {
    var row = tableId.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2)
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var nameText = document.createTextNode(name);
    var sizeText = document.createTextNode(size);
    var plocText = document.createTextNode(ploc);
    var llocText = document.createTextNode(lloc);
    var blankText = document.createTextNode(blank);
    var commentText = document.createTextNode(comment);
    cell1.appendChild(nameText);
    cell2.appendChild(sizeText);
    cell3.appendChild(plocText);
    cell4.appendChild(llocText);
    cell5.appendChild(blankText);
    cell6.appendChild(commentText);
}

document.querySelector('input').addEventListener("change", function (event) {
    var table = document.getElementById("myTable");
    var lines;
    var fileArr = event.target.files;
    var java = /(\.java)/;
    var cShap = /(\.cs)/;
    var not = /(\.csv)/;
    var not1 = /(\.css)/
    var cPlusPlus = /(\.cpp)/;
    var text = /(\.txt)/;;
    var nameArr = [];
    var sizeArr = [];
    var temp = 0;

    for (var i = 0; i < fileArr.length; i++) {
        var blank = 0;
        var comment = 0;
        var logic = 0;
        var block = 0;
        var ploc = 0;
        var temp2 = 0;


        if (not.exec(fileArr[i].name) || not1.exec(fileArr[i].name)) { }
        else
            if (java.exec(fileArr[i].name) || cShap.exec(fileArr[i].name) || cPlusPlus.exec(fileArr[i].name) || text.exec(fileArr[i].name)) {
            nameArr.push(fileArr[i].name);
            sizeArr.push(fileArr[i].size + " byte");
            const reader = new FileReader();
            reader.readAsText(fileArr[i]);
            reader.onload = function (e) {
                lines = e.target.result.split(/\r\n|\n/);
                //đếm các dong trống
                for (x of lines) {
                    if (x.trim() === '') {
                        blank++;
                    }
                }
                //đếm comment line
                for (x of lines) {
                    if (x.indexOf('//') !== -1) {
                        // console.log('-----------------------------------------------------------');
                        // console.log(x);
                        comment++;
                    }
                }
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].indexOf('/*') !== -1) {
                        for (var j = i; j < lines.length; j++) {
                            if (lines[j].indexOf('*/') !== -1) {
                                comment++;
                                i = j;
                                // console.log('-----------------------------------------------------------');
                                // console.log(lines[j]);
                                break;
                            }
                            else
                                if (lines[j].charAt(lines[j].length - 1) === ";") {
                                    logic--;
                                }
                            // console.log('-----------------------------------------------------------');
                            // console.log(lines[j]);
                            comment++;
                        }
                    }
                }
                // console.log("comment: " + comment);

                // đếm các lệnh có ;
                for (x of lines) {
                    if (x.charAt(x.length - 1) === ";") {
                        // console.log(x);
                        // console.log('-------------------------------------------');
                        logic++;
                    }
                    for (var a = 0; a < x.length - 1; a++) {
                        if (x.charAt(a) === ";") {
                            console.log(x);
                            temp2++;
                        }
                    }
                }
                console.log("temp:" + temp2);
                logic = lines.length - blank - comment + temp2;
                addRow(table, nameArr[temp], sizeArr[temp], lines.length, logic, blank, comment);
                blank = 0;
                comment = 0;
                logic = 0;
                block = 0;
                ploc = 0;
                temp++;

            }

        }
    }


}, false);

// JS FRONTEND
document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector('.border-me');
    var sidebar = document.querySelectorAll(".col-sm-2");
    var contentMain = document.querySelectorAll(".col-sm-10");
    var layout = document.querySelectorAll(".layout");
    btn.onclick = function () {
        contentMain[0].classList.toggle('push-content');
        sidebar[0].classList.toggle('push-bar');
        layout[0].classList.toggle('unhide-layout');
        btn.classList.toggle('push-btn');
    }
    layout[0].onclick = function () {
        contentMain[0].classList.toggle('push-content');
        sidebar[0].classList.toggle('push-bar');
        layout[0].classList.toggle('unhide-layout');
        btn.classList.toggle('push-btn');
    }
}, false);

document.addEventListener("DOMContentLoaded",function () {
    var btnreset = document.querySelector('.btnreset');
    btnreset.onclick = function(){
        location.reload();
    }
},false);
