document.addEventListener('DOMContentLoaded', function() {

var textType = document.getElementById("type_text");
var total = document.getElementById("text_total");
var text_limit = 500;

total.textContent = 0 + "/" + text_limit;

textType.addEventListener("input", function() {
    var text = textType.value;
    var textLength = text.length;

    if (textLength > text_limit) {
        textType.value = text.slice(0, text_limit);
        textLength = text_limit;
    }

    total.textContent = textLength + "/" + text_limit;

    if (textLength >= text_limit) {
        textType.style.borderColor = "#FF0000";
        total.style.color = "#FF0000";
    } else if (textLength > 0) {
        textType.style.borderColor = "#028A0F";
        total.style.color = "#028A0F";
    } else {
        textType.style.borderColor = "#000000";
        total.style.color = "#000000";
    }
});

});