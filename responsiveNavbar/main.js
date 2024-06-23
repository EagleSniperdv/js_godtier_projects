const nav = document.querySelector(".nav"),
    searchIcon = document.querySelector("#searchIcon"),
    navOpenBtn = document.querySelector(".navOpenBtn"),
    navCloseBtn = document.querySelector(".navCloseBtn");

    searchIcon.addEventListener("click",() => {
        nav.classList.toggle("openSearch");
        nav.classList.remove("openNav");

        if (nav.classList.contains("openSearch")) {
            return searchIcon.classList.replace("fa-magnifying-glass", "fa-times");
        }
        searchIcon.classList.replace("fa-times","fa-magnifying-glass");
    });

navOpenBtn.addEventListener("click",() => {
    nav.classList.add("openNav");
    nav.classList.remove("openSearch");
    searchIcon.classList.replace("fa-times","fa-magnifying-glass");
});

navCloseBtn.addEventListener("click",() => {
    nav.classList.remove("openNav");
    nav.classList.remove("openNav");
});
