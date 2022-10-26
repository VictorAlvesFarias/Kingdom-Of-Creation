let selectables_menu = document.getElementById('selectables_menu')
let credits_menu = document.getElementById('credits_menu')
let controls_menu = document.getElementById('controls_menu')
let title_menu = document.getElementById('title_menu')

setTimeout(function start_menu() {
    title_menu_state.close()
    setTimeout(() => {
        controls_menu_state.close()
    }, 3000);
}, 3000);

const selectables_menu_state = {
    open(){
        selectables_menu.style.display="flex" 
        setTimeout(() => {
            selectables_menu.style.opacity=1
        }, 600);
    },
    close(){
        selectables_menu.style.opacity=0 
        setTimeout(() => {
            selectables_menu.style.display="none" 
        }, 600);
    },
    selectables_menu:false
}

const credits_menu_state ={
    open(){
        credits_menu.style.display="flex" 
        setTimeout(() => {
            credits_menu.style.opacity=1
        }, 600);
    },
    close(){
        credits_menu.style.opacity=0 
        setTimeout(() => {
            credits_menu.style.display="none" 
        }, 600);
    },
    credits_menu:false
}

const controls_menu_state ={
    open(){
        controls_menu.style.display="flex" 
        setTimeout(() => {
            controls_menu.style.opacity=1
        }, 600);
    },
    close(){
        controls_menu.style.opacity=0 
        setTimeout(() => {
            controls_menu.style.display="none" 
        }, 600);
    },
    controls_menu:false
}

const title_menu_state ={
    open(){
        title_menu.style.display="flex" 
        setTimeout(() => {
            title_menu.style.opacity=1
        }, 600);
    },
    close(){
        title_menu.style.opacity=0 
        setTimeout(() => {
            title_menu.style.display="none" 
        }, 600);
    },
    title_menu:false
}

let value_menu = 0

const menu_move = {
    up() {
        if (value_menu==0) {
            value_menu=4
        }
        value_menu -=1
    },
    down() {
        value_menu +=1        
        if (value_menu==4) {
            value_menu=0
        }

    },
    enter() {
        switch (value_menu) {
            case 0: 
                selectables_menu_state.close()
                break;
            case 1: 
                credits_menu_state.open()
                break;
            case 2: 
                controls_menu_state.open()
                break;
            case 3: 
                selectables_menu_state.open()
                break;
            default:
                break;
        }
    },
    esc(){
    },
    config(){
        switch (value_menu) {
            case 0: 
            selectables_menu.children[1].children[0].style.fontSize="35pt"
            selectables_menu.children[1].children[1].style.fontSize="25pt"
            selectables_menu.children[1].children[2].style.fontSize="25pt"
            selectables_menu.children[1].children[3].style.fontSize="25pt"
                break;
            case 1: 
            selectables_menu.children[1].children[0].style.fontSize="25pt"
            selectables_menu.children[1].children[1].style.fontSize="35pt"
            selectables_menu.children[1].children[2].style.fontSize="25pt"
            selectables_menu.children[1].children[3].style.fontSize="25pt"
    
                break;
            case 2: 
            selectables_menu.children[1].children[0].style.fontSize="25pt"
            selectables_menu.children[1].children[1].style.fontSize="25pt"
            selectables_menu.children[1].children[2].style.fontSize="35pt"
            selectables_menu.children[1].children[3].style.fontSize="25pt"
    
                break;
            case 3: 
            selectables_menu.children[1].children[0].style.fontSize="25pt"
            selectables_menu.children[1].children[1].style.fontSize="25pt"
            selectables_menu.children[1].children[2].style.fontSize="25pt"
            selectables_menu.children[1].children[3].style.fontSize="35pt"
    
                break;
            default:
                break;
        }
    },
};

function KeyDown(evt){ //controles
    switch (evt.keyCode) {
        case 38:  /*seta para cima */
            menu_move.up()
            menu_move.config()
            break;
        case 40:  /*set para baixo*/
            menu_move.down()
            menu_move.config()
            break;
        case 13:  /*Enter*/
            menu_move.enter()
            break;
        case 27:  /*Ecs*/
            menu_move.esc()
            break;
        default:
            break;
    }
};

window.addEventListener('keydown',KeyDown,true);
menu_move.config()