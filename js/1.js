function addRow(tableId, name, size, loc, ploc, lloc, comment) {
    var row = tableId.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    let nameText = document.createTextNode(name);
    let sizeText = document.createTextNode(size);
    let locText = document.createTextNode(loc);
    let plocText = document.createTextNode(ploc);
    let llocText = document.createTextNode(lloc);
    let commentText = document.createTextNode(comment);
    cell1.appendChild(nameText);
    cell2.appendChild(sizeText);
    cell3.appendChild(locText);
    cell4.appendChild(plocText);
    cell5.appendChild(llocText);
    cell6.appendChild(commentText);
}

document.querySelector('input').addEventListener("change", function (event) {
    var table = document.getElementById("myTable");
    var lines;
    let fileArr = event.target.files;
    var java = /(\.java)/;
    for (var i = 0; i < fileArr.length; i++) {
        var linenull = 0;
        var comment = 0;
        var logic = 0;
        var block = 0;
        var ploc = 0;
        var name, size;
        if (java.exec(fileArr[i].name)) {
            name = fileArr[i].name;
            size = fileArr[i].size + " byte";
            const reader = new FileReader();
            reader.readAsText(fileArr[i]);
            reader.onload = function (e) {
                lines = e.target.result.split(/\r\n|\n/);
                //đếm các dong trống
                for (x of lines) {
                    if (x.trim() === '') {
                        linenull++;
                    }
                }
                //đếm comment line
                for (x of lines) {
                    if (x.indexOf('//') !== -1) {
                        console.log('-----------------------------------------------------------');
                        console.log(x);
                        comment++;
                    }
                }
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].indexOf('/*') !== -1) {
                        for (var j = i; j < lines.length; j++) {
                            if (lines[j].indexOf('*/') !== -1) {
                                comment++;
                                i = j;
                                console.log('-----------------------------------------------------------');
                                console.log(lines[j]);
                                break;
                            }
                            else
                                if (lines[j].charAt(lines[j].length - 1) === ";") {
                                    logic--;
                                }
                            console.log('-----------------------------------------------------------');
                            console.log(lines[j]);
                            comment++;
                        }
                    }
                }
                console.log("comment: " + comment);

                // đếm các lệnh có ;
                for (x of lines) {
                    if (x.charAt(x.length - 1) === ";") {
                        console.log(x);
                        console.log('-------------------------------------------');
                        logic++;
                    }
                }
                console.log('---------------------------------------------');
                console.log("lenh co ; : " + logic);
                //đếm các khối lệnh
                for (x of lines) {
                    if (x.indexOf('{') !== -1 && x.indexOf('//') === -1) {
                        // console.log(x);
                        console.log('-----------------------------------------------------------------');
                        block++;
                    }
                }
                logic = logic + block;
                ploc = lines.length - linenull - comment;

                console.log("block: " + block);
                console.log("********************************************************************************************");
                console.log("LOC: " + lines.length);
                console.log("PLOC: " + ploc);
                console.log("LOGIC: " + logic);
                console.log("COMMENT: " + comment);
                console.log("*********************************************************************************");
                addRow(table, name, size, lines.length, ploc, logic, comment);
                linenull = 0;
                comment = 0;
                logic = 0;
                block = 0;
                ploc = 0;
                console.log(name);
                console.log(size);
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
