window.onload = function() {
    document.getElementById("icon-menu").addEventListener("click", function() {
        var selectorMenu = document.querySelector("nav.menu");
        selectorMenu.style.display = selectorMenu.style.display=="none" ? "block" : "none";
    });
    
    document.getElementById("adopta").addEventListener("click", function() {
        document.getElementById("info").style.backgroundColor = "blue";
    });
    
}