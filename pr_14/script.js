"use strict";

// function register() {
//     var login = prompt("Введите логин");
//     var password;
//     if (login === "Админ") {
//         console.log("Правильный логин");
//         password = prompt("Введите пароль");
//         password_check(password);
//     }
//     else if (login) {
//         console.log("Неправильный логин");
//         alert("Неизвестный пользователь");
//     }
//
//     else {
//         console.log("Не вводим логин");
//         alert("Отменено");
//     }
//
//
// }
//
// function password_check(password) {
//     if (password === "Я главный") {
//         console.log("Правильный пароль");
//         alert("Здравствуйте!");
//     }
//     else if (password || password === "") {
//         console.log("неправильный пароль");
//         alert("Неверный пароль");
//     }
//     else {
//         console.log("Не вводим пароль");
//         alert("Отменено");
//     }
// }
//
// var ifLogin = confirm("Желаете пройти регистрацию на сайте?");
//
// if (ifLogin) {
//     console.log("Регистрируемся");
//     alert("Круто!");
//     register();
// }
//
// else {
//     alert("Попробуй ещё раз");
//     console.log("Не регистрируемся");
// }

var ifLike = false;
var ifDislike = false;
function like_button(event) {
    let element = event.target;

    if (element.style.color === 'white') {
        element.style.color = 'red';
        ifLike = true;
    }
    else {
        element.style.color = 'white';
        ifDislike = true;
    }
}

var buttons = document.getElementsByClassName('favourite');

for (let like of buttons) {
    like.style.color = 'white';
    like.addEventListener('mousedown', function(event) {
        event.stopPropagation();
    });
}

// function drawing(event) {
//     console.log("drawing...");
//     if (likes_amount === 0)
//         return;
//
//
//
//     var newthing = document.createElement("p");
//     document.getElementById("all_products").appendChild(newthing);
//
//     var X = event.clientX;
//     var Y = event.clientY;
//
//     newthing.style.position = "fixed";
//     newthing.style.left = X + "px";
//     newthing.style.top = Y + "px";
//
//     newthing.innerHTML = "❤";
//
//
// }


var submit_button = document.getElementById("send_button");

if (submit_button) {

    submit_button.disabled = true;

    let captcha = {
        answer: {},

        startCaptcha() {
            captcha.lettersCaptcha();
            if (!isEmpty(captcha.answer) && captcha.answer.first_answer === captcha.right_answer1) {
                submit_button.disabled = false;
            }

            else {
                captcha.numbersCaptcha();
                if (captcha.check()) {
                    submit_button.disabled = false;
                }
                else {
                    alert("Ошибка");
                }
            }
        },

        lettersCaptcha() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            this.right_answer1 = '';
            for (let i = 0; i < 6; i++) {
                this.right_answer1 += chars[Math.floor(Math.random() * chars.length)];
            }

            let answer = prompt(this.right_answer1);
            if (answer && answer !== '')
                this.answer.first_answer = answer;
        },

        numbersCaptcha() {
            const num1 = Math.floor(Math.random() * 10);
            const num2 = Math.floor(Math.random() * 10);
            this.right_answer2 = num1 + ' + ' + num2;

            let answer = prompt(this.right_answer2);
            if (answer && answer !== '')
                this.answer.second_answer = answer;
        },

        check() {
            const nums = captcha.right_answer2.split(' + ');
            if (this.answer.second_answer) {
                return this.answer.second_answer === String(Number(nums[0]) + Number(nums[1]));
            } else {
                return false;
            }
        },
    }

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }



    var captcha_button = document.createElement("button");
    document.getElementById("agreed1").appendChild(captcha_button);

    captcha_button.innerHTML = "Captcha";
    captcha_button.style.position = "relative";
    captcha_button.style.display = "block";
    captcha_button.addEventListener('click', captcha.startCaptcha);

}





// function Accumulator(startingValue) {
//     this.value = startingValue;

//     this.read = () => {
//         let input = prompt('Сколько добавить?');

//         if(input !== null && input !== '' && String(Number(input)) === input) {
//             this.value = Number(this.value) + Number(input);
//         }
//         else {
//             alert('Ошибка');
//         }

//         alert(this.value);
//     };

// }

// let bin = new Accumulator(1);


// var devs = document.getElementsByClassName('Developers')[0];

// if (devs) {
//     var bin_button = document.createElement("button");

//     devs.appendChild(bin_button);

//     bin_button.innerHTML = "Добавить в корзину";
//     bin_button.style.position = "absolute";
//     bin_button.addEventListener('click', bin.read);
// }

function sort_cart_content() {
    content.sort((a, b) => {
        let a_price = a.price * a.amount;
        let b_price = b.price * b.amount;
        if (a_price > b_price) return 1;
        if (a_price === b_price) return 0;
        return -1;
    });
    
    render_cart();
}

function clear_cart() {
    while (content.length > 0)
        content[0].cart_element.getElementsByClassName("cart-delete")[0].click();
    render_cart();
}

document.getElementById("clear_cart_button")?.addEventListener('click', clear_cart);

document.getElementById("sort_button")?.addEventListener('click', sort_cart_content);

function filter() {
    let value_from = document.getElementById("filter_from").value;
    let value_to = document.getElementById("filter_to").value;
    
    let result = content.filter(item => {
        let price = item.price * item.amount;
        let ifValue_from = (value_from === String(Number(value_from)));
        let ifValue_to = (value_to === String(Number(value_to)));
        

        return (ifValue_from && price >= Number(value_from) || !ifValue_from) && 
        (ifValue_to && price <= Number(value_to) || !ifValue_to);
    })

    return result;
}


document.getElementById("filter_from")?.addEventListener('input', render_cart);
document.getElementById("filter_to")?.addEventListener('input', render_cart);


function recount_cart_summary() {
    let arr = filter();
    let sum = 0;
    for (let obj of arr) 
        sum += obj.amount * obj.price;
    
    document.getElementById("cart_summary").innerHTML = "Итог: " + String(sum);
}

function show_cart() {
    let card_content = document.getElementById("cart-content");

    if (card_content.style.display === "none")
        card_content.style.display = "block";
    else
        card_content.style.display = "none";
}

function Cart_obj(obj) {
    this.parent_obj = obj;
    this.cart_element = create_element(obj);
    this.price = Number(obj.getElementsByClassName("price")[0].innerHTML);
    this.amount = 1;

    

    this.decrease = () => {
        if (this.amount > 1) {
            this.amount--;
            this.cart_element.getElementsByClassName("cart-amount")[0].innerHTML = String(this.amount);
            this.cart_element.getElementsByClassName("cart-price")[0].innerHTML = String(this.amount * this.price);
            recount_cart_summary();
            render_cart();
        }
        
    }
    
    this.increase = () => {
        this.amount++;
        this.cart_element.getElementsByClassName("cart-amount")[0].innerHTML = String(this.amount);
        this.cart_element.getElementsByClassName("cart-price")[0].innerHTML = String(this.amount * this.price);
        recount_cart_summary();
        render_cart();
    }
}


var content = [];


function create_element(obj) {
    let new_obj = document.createElement("div");
    let new_name = document.createElement("p");
    let new_price = document.createElement("p");
    let new_bin = document.createElement("img");
    let new_subtract = document.createElement("button");
    let new_amount = document.createElement("p");
    let new_add = document.createElement("button");

    new_obj.appendChild(new_name);
    new_obj.appendChild(new_price);
    new_obj.appendChild(new_bin);
    new_obj.appendChild(new_subtract);
    new_obj.appendChild(new_amount);
    new_obj.appendChild(new_add);

    new_obj.classList.add("cart-element");
    new_name.classList.add("cart-product");
    new_price.classList.add("cart-price");
    new_bin.classList.add("cart-delete");
    new_subtract.classList.add("cart-subtract");
    new_amount.classList.add("cart-amount");
    new_add.classList.add("cart-add");
    
    new_name.innerHTML = obj.getElementsByClassName("product_name")[0].innerHTML;
    new_price.innerHTML = obj.getElementsByClassName("price")[0].innerHTML;
    new_bin.src = "Images/bin.png";
    new_bin.addEventListener('click', element => {
        let index = -1;

        for (let i = 0; i < content.length; i++) {
            if (content[i].cart_element === element.target.parentNode)
                index = i;
        }
        
        ifDislike = true;
        content[index].parent_obj.getElementsByClassName("favourite")[0].click();
    });
    new_subtract.innerHTML = "-";
    new_amount.innerHTML = "1";
    new_add.innerHTML = "+";
    

    return new_obj;

}

function render_cart() {
    let arr = filter();
    let parent = document.getElementById("cart-content");
    let old_content = Array.from(parent.getElementsByClassName("cart-element"));
    
    for (let obj of old_content) {
        parent.removeChild(obj);
    }

    for (let obj of arr) {
        parent.insertBefore(obj.cart_element, parent.getElementsByClassName("cart_footer")[0]);
    }
    recount_cart_summary();
}

function add_to_cart() {
    let like = this.getElementsByClassName("favourite")[0];
    if (ifLike) {
        let cart_obj = new Cart_obj(this);
        cart_obj.cart_element.getElementsByClassName("cart-subtract")[0].addEventListener('click', cart_obj.decrease);
        cart_obj.cart_element.getElementsByClassName("cart-add")[0].addEventListener('click', cart_obj.increase);
        content.push(cart_obj);
        render_cart();
        ifLike = false;
    }

    else if(ifDislike) {
        let index = -1;
        for (let i = 0; i < content.length; i++) {
            if (content[i].parent_obj === this)
                index = i;
        }
        
        content.splice(index, 1);
        render_cart();
        
        
        ifDislike = false;
    }
        
    
}
document.getElementById("cart-img")?.addEventListener('click', show_cart);

var cart = document.getElementById("cart-content");

var products = document.getElementsByClassName("cpu");

if (products.length) {
    for (let obj of products) {
        obj.addEventListener('click', add_to_cart);
    }

}

function showNotification(options) {
    let new_notification = document.createElement("div");
    document.body.appendChild(new_notification);

    let new_notification_content = document.createElement("p");
    new_notification.appendChild(new_notification_content);

    new_notification.classList.add("notification");
    new_notification_content.textContent = options;

    setTimeout(() => {document.body.removeChild(new_notification)}, 1500);
}


function createNotification(str) {
    notification_counter++;
    let notification = document.createElement("li");
    let arrow = document.createElement("img");
    let content = document.createElement("p");
    let delete_button = document.createElement("img");

    notification.appendChild(arrow);
    notification.appendChild(content);
    notification.appendChild(delete_button);

    notification.classList.add("notification_element");
    arrow.src = "Images/arrow.png";
    arrow.width = 43;
    arrow.height = 14;
    arrow.classList.add("notification_img");
    
    content.textContent = str;

    delete_button.src = "Images/bin.png";
    delete_button.classList.add("notification_delete_button");

    notification_list.appendChild(notification);
    
    notification.addEventListener('click', () => {showNotification(str)});
}

function default_notification() {
    createNotification("Уведомление " + notification_counter);
}

var notification_counter = 0;

var notification_list = document.getElementById("notifications-list");

if (notification_list) {

    let notification_interval = setInterval(default_notification, 3000);


    let notification_button = document.getElementsByClassName("notifications-button")[0];
    function pauseAndResumeInterval() {
        alert("Задержка");

        clearInterval(notification_interval);

        setTimeout(() => {
            notification_interval = setInterval(default_notification, 3000);
        }, 10000);
    }

    notification_button.addEventListener('click', pauseAndResumeInterval);
    
    function input_notification() {
        console.log("input");
        let str = prompt("Введите уведомление");
        createNotification(str);
    }
    
    document.getElementById("notifications-window").lastElementChild.addEventListener('click', input_notification);
    
    

}


// параллакс
if (products.length) {
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        document.body.style.backgroundPosition = 'center ' + (scrollPosition * 0.3) + 'px';
    });
}




// покидать ли
var pr_contents = document.getElementById("contents");

if (pr_contents) {
    pr_contents.addEventListener('click', function(event) {
        if (!event.target.closest('a')) return;
        
        if (!confirm("Вы хотите покинуть страницу?"))
            event.preventDefault();
    });
}


// галлерея
let mainImage = document.getElementById('mainImage');
document.getElementById("thumbnails")?.addEventListener('click', (event) => {
    let closest = event.target.closest(".thumb");
    if (!closest) return;

    mainImage.style.opacity = "0";

    mainImage.src = closest.style.backgroundImage.slice(5, -2);

    let start = performance.now();
    let duration = 500;

    requestAnimationFrame(function gallery_opacity_animation(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        mainImage.style.opacity = String(timeFraction);

        if (timeFraction < 1)
            requestAnimationFrame(gallery_opacity_animation);
    })
});

function rmv_clicks(){
    for (let obj of products) {
        if (obj.classList.contains("selected")) {
            obj.classList.remove("selected");
        }
    }
}


function drop(cpu, clientX, clientY) {

    cpu.style.pointerEvents = "none";
    let target = document.elementFromPoint(clientX, clientY);
    console.log("dropping to ");
    console.log(target);
    if(!target?.closest(".drop_cart")) {
        cpu.style.pointerEvents = "visible";
        return;
    }
    cpu.style.pointerEvents = "visible";

    let like_button = cpu.getElementsByClassName("favourite")[0];
    if (like_button.style.color === "white")
        like_button.click();
    else {
        for(let elem of content) {
            if (elem.parent_obj === cpu)
                elem.increase();
        }
    }

}

if (products.length) {

    // 3
    let all_products = document.getElementById("all_products");

    //не выделять
    all_products.addEventListener('mousedown', function(event) {
        if(!event.target.closest(".cpu")) return;

        event.preventDefault();
    });

    //клик
    all_products.addEventListener('click', function(event)  {
        let closest = event.target.closest(".cpu");
        if(!closest) return;
        console.log("click");

        if (!(event.ctrlKey || event.metaKey))
            rmv_clicks();

        closest.classList.add("selected");
    });

    all_products.addEventListener('click', function(event) {
        if(event.target.closest(".cpu")) return;

        rmv_clicks();
    });


    //5
    all_products.addEventListener('dblclick', function(event) {
        let cpu = event.target.closest(".cpu");
        if(!cpu) return;

        let next_elem = cpu.nextElementSibling;
        let empty_elem = document.createElement("div");
        empty_elem.classList.add("empty_cpu");


        let shiftX = event.clientX - cpu.getBoundingClientRect().left;
        let shiftY = event.clientY - cpu.getBoundingClientRect().top;
        cpu.style.position = 'absolute';
        cpu.style.zIndex = '1000';

        document.body.append(cpu);
        all_products.insertBefore(empty_elem, next_elem);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            cpu.style.left = pageX - shiftX + 'px';
            cpu.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        cpu.onmouseup = function(event) {

            drop(cpu, event.clientX, event.clientY);
            document.removeEventListener('mousemove', onMouseMove);
            all_products.removeChild(empty_elem);
            all_products.insertBefore(cpu, next_elem);
            cpu.style.position = 'relative';
            cpu.style.zIndex = '1';
            cpu.style.left = '0';
            cpu.style.top = '0';
            cpu.onmouseup = null;
        }
    });


}




// Слайдер
let slide_point = document.getElementsByClassName('slide_point')[0];
let track = document.getElementsByClassName('track')[0];

if (track) {
    track.addEventListener('mousedown', function(e) {
    
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
      });
}


function mouseMove(e) {
    console.log("listening");
  let trackRect = track.getBoundingClientRect();
  console.log(track.offsetWidth);
  let newLeft = e.pageX - trackRect.left - slide_point.offsetWidth / 2;

  if (newLeft < 0) {
    newLeft = 0;
  }

  let rightEdge = track.offsetWidth;
  if (newLeft > rightEdge) {
    newLeft = rightEdge;
  }

  slide_point.style.left = newLeft + 'px';
  console.log(newLeft);
}

function mouseUp() {
  window.removeEventListener('mousemove', mouseMove);
  window.removeEventListener('mouseup', mouseUp);
}



// Up button
let up_button = document.getElementById("up_button");

if (up_button) {
    up_button.addEventListener('click', function(event) {
        console.log("listening");
        let start = performance.now();
        let duration = 500;
        let scroll_size = window.scrollY;
    
        requestAnimationFrame(function up_button_animation(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;
    
            let progress = up_button_timing(timeFraction);
            animate_scroll_up(progress, scroll_size);
    
            if (timeFraction < 1)
            requestAnimationFrame(up_button_animation);
        })
    });
}


function up_button_timing(timeFraction) {
    return timeFraction * timeFraction * (3.0 - 2.0 * timeFraction);
}

function animate_scroll_up(progress, scroll_size) {
    window.scrollTo(0, scroll_size - (scroll_size * progress));
}

