 document.addEventListener("DOMContentLoaded", () => {
    const tab = document.querySelector(".tabcontainer"),
        tabheader =  document.querySelector(".tabheader__items"),
        modal_button = document.querySelectorAll("[data-modal]"),
        modal_close =  document.querySelector("[data-modal_close]"),
        modal = document.querySelector(".modal"),
        menu__field = document.querySelector(".menu__field"),
        slider = document.querySelector(".offer__slider"),
        slider_wrapper = document.querySelector(".offer__slider-wrapper"),
        slider_counter = document.querySelector(".offer__slider-counter"),
        current = document.querySelector("#current"),
        total = document.querySelector("#total"),
        resultCal = document.querySelector(".calculating__result"),
        point = document.querySelector(".points"),
        menu_item = document.querySelector(".menu__item")
        date_dead = new Date(2024, 5, 12, 12, 0, 0);
    
    let touchstartX;
    let touchendX;
    let changex = 0;
    let transform = 0;
    
    function hide(main) {
        Array.from(tab.children).forEach((el) => {
            el.style.display = "none";
            // el.classList.add("fade_down");
            el.classList.remove("fade_up")
        });
        tab.lastElementChild.style.display = "block";
        main.style.display = "flex";
        main.classList.add("fade_up");
        // main.classList.remove("fade_down");
    }
    function remome_class(n = 0) {
        Array.from(tabheader.children).forEach(el => {
            el.classList.remove("tabheader__item_active");
        });
        tabheader.children[n].classList.add("tabheader__item_active");
    }
    function set_left() {
        let date_now = new Date();
        let date_left = date_dead - date_now;
        if (date_left <= 0) {return "out"}
        document.querySelector("#days").innerHTML = (Math.floor(date_left / (1000 * 60 * 60 * 24))).toString().padStart(2, "0");
        document.querySelector("#hours").innerHTML = Math.floor(date_left % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)).toString().padStart(2, "0");
        document.querySelector("#minutes").innerHTML = Math.floor(date_left % (1000 * 60 * 60) / (1000 * 60)).toString().padStart(2, "0");
        document.querySelector("#seconds").innerHTML = Math.floor(date_left % (1000 * 60) / (1000)).toString().padStart(2, "0");
    }

    tabheader.addEventListener("click", (e) => {
        if (e.target.matches(".tabheader__item")) {
            Array.from(tabheader.children).forEach((el, i) => {
                if (e.target == el) {
                    remome_class(i);
                    hide(tab.children[i]);
                }
            })
        }
    })
    hide(tab.firstElementChild);
    set_left();
    const inter = setInterval(set_left, 1000);
    if (set_left() == "out") {
        clearInterval(inter);
    }

    modal_button.forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        })
    })

    function closemodal() {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }

    modal_close.addEventListener("click", closemodal)
    modal.addEventListener("click", (e) => {
        if (e.target.matches(".modal")) closemodal();
    })
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") closemodal();
    })

    class Menu {
        constructor(title, desc, price, scr, alt) {
            this.title = title;
            this.desc = desc;
            this.price = price;
            this.scr = scr;
            this.alt = alt;
        }
        create() {
            const elem = document.createElement('div');
            elem.innerHTML = `
            <img src="${this.scr}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.desc}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
            elem.classList.add("menu__item");
            menu__field.firstElementChild.append(elem);
        }
    }
    new Menu("111", "222", "333", "img/tabs/vegy.jpg", "ppp").create();
    new Menu("111", "222", "333", "img/tabs/vegy.jpg", "ppp").create();

    
    let index = 1;
    const ingwidth = +window.getComputedStyle(document.querySelector(".offer__slide")).width.slice(0, -2);
    let slide_count = slider_wrapper.children.length;
    function setSlide(n) {
        for (let el of slider_wrapper.children) {
            el.style.display = "none";
            el.classList.remove = ("fade_up");
        }
        slider_wrapper.children[n].style.display = "block";
        slider_wrapper.children[n].classList.add("fade_up");
    }
    function setIndex() {
        current.innerHTML = `${index}`.toString().padStart(2, "0");
        console.log(index);
    }

    function hideel () {
        document.querySelector(".offer__slider-prev").style.opacity = "100%";
        document.querySelector(".offer__slider-next").style.opacity = "100%";
        document.querySelector(".offer__slider-prev").style.pointerEvents = "all";
        document.querySelector(".offer__slider-next").style.pointerEvents = "all";
        if (index == 1) {
            document.querySelector(".offer__slider-prev").style.opacity = "0%";
            document.querySelector(".offer__slider-prev").style.pointerEvents = "none";
        }
        if (index == 4) {
            document.querySelector(".offer__slider-next").style.opacity = "0%";
            document.querySelector(".offer__slider-next").style.pointerEvents = "none";
        }
    }

    total.innerHTML = `${slide_count}`.toString().padStart(2, "0");
    setIndex();
    // setSlide(0);

    document.querySelector(".offer__slider-prev").style.opacity = "0%";
    document.querySelector(".offer__slider-prev").style.pointerEvents = "none";
    
    slider_counter.addEventListener("click", (e) => {
        if (e.target.matches(".offer__slider-prev") || e.target.parentElement.matches(".offer__slider-prev")) {
            console.log(index);
            // index--;
            index = --index == 0 ? index = slide_count : index;
            console.log(index);
        }
        else if (e.target.matches(".offer__slider-next") || e.target.parentElement.matches(".offer__slider-next")) {
            index = ++index == (slide_count + 1) ? index = 1 : index;
        } else {
            return
        }
        
        setIndex();
        hideel();
        slider_wrapper.style.transform = `translateX(-${ingwidth * (index - 1)}px)`;
        setPoint(index-1);
        transform = slider_wrapper.style.transform || "translateX(0px)";
        transform = +transform.split('(')[1].split('p')[0];
    })

    point.addEventListener("mousedown", (e) => {
        if (e.target.matches(".each__point")) {
            index = Array.from(point.children).indexOf(e.target) + 1;
        }
        setIndex();
        hideel();
        slider_wrapper.style.transform = `translateX(-${ingwidth * (index - 1)}px)`;
        setPoint(index-1);
        transform = slider_wrapper.style.transform || "translateX(0px)";
        transform = +transform.split('(')[1].split('p')[0];
    })

    slider_wrapper.addEventListener("touchstart", (e) => {
        slider_wrapper.style.transition = "0s";
        touchstartX = e.changedTouches[0].screenX;
        document.body.style.overflow = 'hidden';
    })

    slider_wrapper.addEventListener("touchmove", (e) => {
        touchendX = e.changedTouches[0].screenX;
        changex = touchendX - touchstartX;
        slider_wrapper.style.transform = `translateX(${transform + changex}px)`;
    })
    slider_wrapper.addEventListener("touchend", (e) => {
        slider_wrapper.style.transition = "0.5s all";
        transform = slider_wrapper.style.transform || "translateX(0px)";
        transform = +transform.split('(')[1].split('p')[0];
        // slider_wrapper.style.transition = "0.5s all";
        if (Math.abs(changex) < (ingwidth / 4) && changex!=0) {
            slider_wrapper.style.transform = `translateX(${transform - changex}px)`;
        } else if (changex < 0 && index < 4) {
            slider_wrapper.style.transform = `translateX(${transform - changex - ingwidth}px)`;
            index++;
            setIndex();
            hideel();
            setPoint(index-1);
        } else if (changex > 0 && index > 1) {
            slider_wrapper.style.transform = `translateX(${transform - changex + ingwidth}px)`;
            index--;
            setIndex();
            hideel();
            setPoint(index-1);
        } else {
            slider_wrapper.style.transform = `translateX(${transform - changex}px)`;
        }
        transform = slider_wrapper.style.transform || "translateX(0px)";
        transform = +transform.split('(')[1].split('p')[0];
        document.body.style.overflow = 'auto';
        changex = 0;
    })

    point.innerHTML = "";

    for (let i = 0; i < slide_count; i++) {
        point.innerHTML += `<div class="each__point"></div>`;
    }
    function setPoint(n) {
        for (let el of point.children) {
            el.classList.remove("toMain");
        }
        point.children[n].classList.add("toMain");
    }
    setPoint(0);

    let gender = 1;
    let height;
    let weight;
    let age;
    let act = 2;
    function calcCal() {
        if (!height || !weight || !age || isNaN(height) || isNaN(weight) || isNaN(age)){
            resultCal.firstElementChild.innerText = "Введите всё"
            return;
        }
        let cof_act;
        switch (act) {
            case 1:
                cof_act = 1.2;
                break;
            case 2:
                cof_act = 1.375;
                break;
            case 3:
                cof_act = 1.55;
                break;
            case 4:
                cof_act = 1.725;
                break;
            default:
                break;
        }
        if (gender == 1) {
            resultCal.firstElementChild.innerText = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * cof_act);
        }
        if (gender == 2) {
            console.log(gender);
            resultCal.firstElementChild.innerText = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * cof_act);
        }
    }
    const field = document.querySelector(".calculating__field");
    document.querySelector("#gender").addEventListener("click", (e) => {
        if (e.target.matches(".calculating__choose-item")) {
            gender = Array.from(document.querySelector("#gender").children).indexOf(e.target) + 1;
            calcCal();
            for (let el of document.querySelector("#gender").children) {
                el.classList.remove("calculating__choose-item_active");
            }
            e.target.classList.add("calculating__choose-item_active");
        }
    })

    document.querySelector(".calculating__choose_big").addEventListener("click", (e) => {
        if (e.target.matches(".calculating__choose-item")) {
            act = Array.from(document.querySelector(".calculating__choose_big").children).indexOf(e.target) + 1;
            calcCal();
            for (let el of document.querySelector(".calculating__choose_big").children) {
                el.classList.remove("calculating__choose-item_active");
            }
            e.target.classList.add("calculating__choose-item_active");
        }
    })

    for (let el of document.querySelector(".calculating__choose_medium").children) {
        el.addEventListener("input", (e) => {
            switch (Array.from(document.querySelector(".calculating__choose_medium").children).indexOf(el) + 1) {
                case 1:
                    height = +el.value;
                    break;
                case 2:
                    weight = +el.value;
                    break;
                case 3:
                    age = +el.value;
                    break;
                default:
                    break;
            }
            calcCal();
        })
    }
    calcCal();
})