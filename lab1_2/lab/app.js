let form = document.querySelector("form");


function print(tape, cursorStart, cursorFinish, flag) {
    let output_div = document.getElementById("output");
    let output_paragraph = document.createElement("p");
    let arrayToString = tape.join('');
    if (flag) {

        output_paragraph.innerHTML = arrayToString.substring(0, cursorStart) +
            `<span>` + arrayToString.substring(cursorStart, cursorFinish + 1) + `</span>` +
            arrayToString.substring(cursorFinish + 1);
    } else {
        output_paragraph.innerHTML = arrayToString.substring(0, cursorFinish) +
            `<span style = "color: red;">` + arrayToString[cursorFinish] + `</span>` +
            arrayToString.substring(cursorFinish + 1);
    }
    output_div.appendChild(output_paragraph);
}


function printExtra(tapeArray, cursor, flag) {
    let output_div = document.getElementById("output");
    let output_paragraph = document.createElement("p");
    let sign = "=="
    if (flag) {
        output_paragraph.innerHTML = "<span>" + tapeArray[0].substring(0, cursor + 1) +
            ` ${sign} ` + tapeArray[1].substring(0, cursor + 1) + "</span>";

    } else {
        output_paragraph.style.color = "red";
        if (tapeArray[0][cursor] == undefined) {
            sign = "<";
        } else {
            sign = ">";
        }
        output_paragraph.innerHTML = "<span>" + tapeArray[0].substring(0, cursor) +
            "</span>" + tapeArray[0].substring(cursor) +
            ` ${sign} ` +
            "<span>" + tapeArray[1].substr(0, cursor) + "</span>" +
            tapeArray[1].substring(cursor);

    }
    output_div.appendChild(output_paragraph);
}


function findOneCFAndDelete(tapeArray) {

    for (let index = 1; index < tapeArray.length; index++) {

        if (tapeArray[index - 1] == "c" && tapeArray[index] == "f") {

            print(tapeArray, index - 1, index, true);
            tapeArray.splice(index - 1, 2);
            break;
        }
    }
    print(tapeArray, 0, tapeArray.length - 1, false);
}


function roolsEasyGo() {

    let tapeInput = form.elements['input-string'].value;
    let tapeArray = [...tapeInput];
    let cursor = 2;

    while (cursor < tapeArray.length) {

        if (tapeArray[cursor - 2] == "a" && tapeArray[cursor - 1] == "b" && tapeArray[cursor] == "c") {

            print(tapeArray, cursor - 2, cursor, true);
            tapeArray.splice(cursor - 2, 3, "f");
            cursor -= 1;
        } else {

            print(tapeArray, cursor - 2, cursor, false);
            cursor++;
        }

    }
    findOneCFAndDelete(tapeArray);

}


function roolsMediumGo() {

    let tapeInput = form.elements['string-unar'].value;
    let tapeArray = tapeInput.split("*");
    let cursor = 0;
    let flag = true;

    while (flag && (cursor < tapeArray[0].length || cursor < tapeArray[1].length)) {
        if (tapeArray[0][cursor] == tapeArray[1][cursor]) {

            printExtra(tapeArray, cursor, flag);
            cursor++;
        } else {

            flag = false;
            printExtra(tapeArray, cursor, flag);
            break;
        }

    }

}


document.getElementById("easy-rools-start").onclick = roolsEasyGo;
document.getElementById("medium-rools-start").onclick = roolsMediumGo;