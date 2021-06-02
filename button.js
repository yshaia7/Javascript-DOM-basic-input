/* js file of the project */

/*
add Listener for hide allert window when the page load
add Listener for text box children
 */
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("send").addEventListener("click", main);
    document.getElementById("children").addEventListener('keyup', createChildInfo);
    document.getElementById("errorlist").style.display = 'none';
    document.getElementById("information").style.display = 'none';
    document.getElementById("childData").style.display = "none";
    document.getElementById("alertWarning").style.display = "none";

}, false);

/* That function form errors or form result
* depend on the user inputs
*/
function ToggleFormResultErrors() {
    var errorlist = document.getElementById("errorlist");

    /* form validate, show result */
    if (formStatus >= 0) {
        document.getElementById("information").style.display = "block";
        document.getElementById("my-form").style.display = "none";
        errorlist.style.display = "none";
    }
    /* form not validate, show error inputs */
    else
        errorlist.style.display = "block";
    /* childArray input validate */
    if (childArray.length > 0) {
        document.getElementById("childData").style.display = "block";
        document.getElementById("alertWarning").style.display = "block";
    }
}

var infoArr = []; /*result input */
var errorArray = []; /*error input */
var childArray = []; /*children input */
var arrayOutPut = ["First Name: ", "Last Name: ", "Birth Year: ", "Immigration Year: "];
var status = 0; /*current input status validate */
var formStatus = 0; /*all form input validate */
var childStatus = 0; /* array of children input validate */

/* that function fetch child input and
 * and insert in into html
 * child is a list
 */
function createChildInfo() {
    /* clean html before create new child*/
    document.getElementById('childinfo').innerHTML = "";
    var childNumber = document.getElementById("children").value;

    if (isNumberValidate(childNumber))
        return;

    var num = parseInt(childNumber);

    if (isNaN(num) || num < 0)
        num = 0
    let curr_num = document.getElementById("childinfo").childElementCount;

    if (num <= 10 && num > curr_num) /*if input number ok create new child */
        addChildInfo(num, curr_num);
    else /*if input small then current amount of child, delete child */
        removeChildInfo(num, curr_num);
    /* input child number > 10, delete all child */
    if (num > 10)
        deleteChilds();
}

/* function to add new child*/
function addChildInfo(num, curr_num) {
    for (var i = curr_num; i < num; i++) {
        let listItem = createNewChild(i);
        document.getElementById("childinfo").appendChild(listItem);
    }
}
/* function create new child and return the new child*/
function createNewChild(childNumber) {

    let listItem = document.createElement("li");
    let newitem = document.createElement("input");
    listItem.setAttribute("class", "list");
    let childName = document.createElement("label");

    childName.textContent = "child name " + " ";

    listItem.append(childName);
    listItem.append(" ")
    listItem.append(newitem);

    return listItem;
}
/*function to remove child from place num, to curr_num
* that use when we dont want to delete all child
*/
function removeChildInfo(num, curr_num) {
    var childs = document.getElementById("childinfo");

    for (var i = curr_num; i > num; i--) {
        childs.removeChild(childs.childNodes[i]);
    }
}
/*function to delete all child. function use when
* child already create and new input is wrong
*/
function deleteChilds() {
    var childs = document.getElementById("childinfo");

    for (var i = 0; i < childs.length; ++i) {
        childs.removeChild(childs.childNodes[i]);
    }
}

/* validate that input not empty*/
var emptyValidat = function NotEmpty(str) {
    if (!str.trim().length) {
        status = -1;
        return "missimg";
    }
    return str;
}

/* validate name function  */
var nameValidate = function nameCheck(str) {
    let emptyValid = emptyValidat(str);
    if (status < 0)
        return emptyValid;

    /*check in name letters legal */
    if (!str.match(/^[a-zA-Z]+$/)) {
        status = -1;
        return " not valid name";
    }
    return str;
}
/* validate birth year function  */
var BirthDateValidate = function BirthDate(str) {
    var str = emptyValidat(str);
    if (status < 0)
        return str;

    if (status) {
        /* validate year in the right range*/
        let currentYear = new Date().getFullYear();
        let inputYear = parseInt(str);
        if (inputYear > currentYear || inputYear < 1990) {
            status = -1;
            return "Birth year must be between " + 1990 + "-" + currentYear;
        }
        if (isNumberValidate(str)) {
            status = -1;
            return str + " not a birth year";
        }
    }
    return str;
}

/* validate number is legal */
let isNumberValidate = function isNumber(str) {
    return !str.match(/^[0-9]+$/);
}

/* validate number is legal */
var immigrationValidate = function immigration(str) {

    var str = emptyValidat(str);
    if (status < 0)
        return str;

    if (isNumberValidate(str)) {
        status = -1;
        return "Immigration not number";
    }
    if (status) {
        let birthDate = parseInt(document.getElementById("birthdate").value);

        let currentYear = new Date().getFullYear();
        let immgrYear = parseInt(str); /* validate year in legal range */
        if (immgrYear > currentYear || immgrYear < birthDate) {
            status = -1;
            return "Immigration year must be between " + birthDate + "-" + currentYear;
        }
        if (isNaN(birthDate)) {
            status = -1;
            return str + " not valid I immigration year";
        }
    }
    return str;
}
/* validate number of input childs */
var childNumberValidate = function numberOfChild(str) {

    if (isNumberValidate(str) && str != "") {
        status = -1;
        return str + " not a number";
    }

    if (status) {
        let childNumber = parseInt(str);/* validate number in legal range */
        if (childNumber <= 0 || childNumber > 10) {
            status = -1;
            return " child number not in range 1-10 ";
        }
        return "child number " + str + " ";
    }
    return str;
}
/* array of validation function */
var validateFunc = [nameValidate, nameValidate, BirthDateValidate,
    immigrationValidate, childNumberValidate];

/* fetch form inputs */
function fetchFormInputs(event) {
    infoArr.length = 0;
    errorArray.length = 0;
    status = 0;
    formStatus = 0;

    let childrenNum = document.getElementById("childinfo").childElementCount;

    if (isNaN(childrenNum))
        childrenNum = 0;

    var personalData = document.getElementsByTagName("input");
    var inputNum = personalData.length;
    /* send range and array to fetch personal value */
    fetchPersonalInput(inputNum - childrenNum - 1, personalData);

    /* validate that input child of numbers correct */
    var str = childNumberValidate(personalData[4].value);
    if (status < 0) {
        errorArray.push(str);
        formStatus = -1;
        childStatus = -1;
        return;
    }
    /* fetch child inputs */
    let children = document.getElementById("childinfo")
                           .getElementsByTagName("input");
    fetchChildInput(children);

    sortDeleteDuplicate();
}
/* sort child inputs and delete duplicate*/
function sortDeleteDuplicate() {
    if (formStatus >= 0 && childArray.length > 0) {
        var set = new Set(childArray);
        childArray = Array.from(set);
        childArray.sort();
    }
}
/*fetch person input */
function fetchPersonalInput(elemensLengthArray, elements) {
    for (var i = 0; i < elemensLengthArray; ++i) {
        var input = validateFunc[i](elements[i].value);

        input = arrayOutPut[i] + input;
        if (status >= 0) {
            infoArr.push(input);
        } else {
            errorArray.push(input);
            status = 0;
            formStatus = -1;
        }
    }
}
/* fetch child input */
function fetchChildInput(children) {
    for (var i = 0; i < children.length; ++i) {
        var input = validateFunc[0](children[i].value);

        if (status >= 0) {
            childArray.push(input);

        } else if (input != "") {
            input = "child number " + (i + 1) + ": " + input;
            errorArray.push(input);
            status = 0;
            formStatus = -1;
            childStatus = -1;
        }
    }
}
/* print input into html*/
function insertInputIntoHtml(event) {

    document.getElementById('errorlist').innerHTML = "";

    ToggleFormResultErrors();
    /* if form validate show result*/
    if (formStatus >= 0) {
        for (var i = 0; i < infoArr.length; i++) {
            document.getElementById('infolist').innerHTML += infoArr[i] + '<br>';
        }
        for (var i = 0; i < childArray.length; i++) {
            document.getElementById('alertWarning').innerHTML += "child number "
                                   + (i + 1) + ": " + childArray[i] + '<br>';
        }
    }/* form not validate sho error */
    else
        for (var i = 0; i < errorArray.length; i++) {
            document.getElementById('errorlist').innerHTML += errorArray[i] + '<br>';
        }
}
function main(event) {
    fetchFormInputs();
    insertInputIntoHtml();
}
