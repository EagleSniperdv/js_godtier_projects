const filterBtns = document.querySelectorAll(".filter_btn button");
const filterableCards = document.querySelectorAll(".filterable_cards .card");

// console.log(filterBtns, filterableCards);

const filterCards = (e) => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    // console.log(e.target);

    filterableCards.forEach( card => {
        console.log(card);
        card.classList.add("hide");
        if(card.dataset.name === e.target.dataset.name || e.target.dataset.name === "all") {
            card.classList.remove("hide");
        }
    });
}

filterBtns.forEach(btn => btn.addEventListener("click", filterCards));