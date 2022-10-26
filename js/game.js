const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');

const canvas_config = {   
    width:canvas.width =   /* 5000  */  1366/100*87,
    height:canvas.height = 500
};

const keystate = {
    a: {pressed:false},
    w: {pressed:false},
    d: {pressed:false}
};

const screen_limit = {
    left:100,
    right:500
};

const backgrounds = {
    ilumination:"img/background-ilumination.png",
    variable:"img/background-plataform-variable.png",
    plataform:"img/background-plataform.png",
    default:"img/background.png"
};

const npcs = {
    fyro:"img/npc-fyro.png",
    goor:"img/npc-goor.png",
    syter:"img/npc-syter.png",
    tron:"img/npc-tron.png",
    celestial:"img/npc-celestial.png"
};

const components = {
    blackhole:"img/component-black-hole.png",
    cloud:"img/component-cloud.png",
    firepit:"img/component-fire-pit.png",
    skull:"img/component-skull-torch.png",
    torch:"img/component-torch.png",
    tree:"img/component-tree.png"        
};

const layer_depth_velocity = [
    0,
    0,
    0,
    0,
    0,
];

class Player {
    constructor() {
        this.spriteX = 0
        this.spriteY = 0
        this.width=45
        this.height=70
        this.x = 0
        this.y = 0
        this.image= new Image()
        this.image.src = "img/player-right.png"
    }
    draw() {
        ctx.drawImage(
            this.image,
            this.spriteX,
            this.spriteY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
};

class Init {
    constructor(width,height,x,y,img,index,layer) {
        this.spriteX = 0
        this.spriteY = 0
        this.width=width
        this.height=height
        this.x = x
        this.y = y 
        this.image= new Image()
        this.image.src = img
        this.index = index 
        this.layer=layer
    }
    draw() {
        ctx.drawImage(
            this.image,
            this.spriteX,
            this.spriteY,
            this.width,
            this.height,
            this.x+layer_depth_velocity[this.layer],
            this.y,
            this.width,
            this.height
        )
    }
};

class Plataform {
    constructor(x,y,width,height) {
        this.spriteX=x
        this.spriteY=y
        this.width=width
        this.height=height
        this.x =x
        this.y =y
    }
    draw() {
        ctx.fillStyle = 'transparent','rgba(255, 165, 0, 0.5)';
        ctx.fillRect(
            this.spriteX,
            this.spriteY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height,
        )
    }
};

class Game  {
    static plataforms = [
        new Plataform(10,455,175,50),  /* 1 */  
        new Plataform(185,355,70,35), /* 2 */  
        new Plataform(270,245,90,45), /* 3 */  
        new Plataform(380,345,110,25), /* 4 */  
        new Plataform(565,275,75,30), /* 5 */  
        new Plataform(675,175,55,25), /* 6 */  
        new Plataform(810,95,275,45), /* 7 */  
        new Plataform(1272,440,55,27), /* 8 */  
        new Plataform(1475,338,440,300), /* 9 */  
        new Plataform(1915,378,250,130), /* 15*/  
        new Plataform(2360,465,210,150), /* 16 */
        new Plataform(2570,445,160,60),   /* 17 */  
        new Plataform(2730,277,227,300),  /* 18 */  
        new Plataform(2957,353,287,200),  /* 19 */  
        new Plataform(3315,187,130,400), /* 20 */  
        new Plataform(3445,473,420,140), /* 38 */  
        new Plataform(3990,330,310,60), /* 39 */
        new Plataform(4290,450,390,60), /* 40 */  
        new Plataform(4335,240,240,60), /* 40 */  
        new Plataform(4865,175,270,60), /* 41 */  
        new Plataform(4635,175,130,60), /* 41 */  
    ]    
    static inits = [
        new Init(5000,500,0,0,backgrounds.default,false,0),
        new Init(500,500,200,0,npcs.celestial,true,1),
        new Init(500,500,500,-100,components.cloud,true,2),
        new Init(500,500,1000,100,components.cloud,true,2),
        new Init(500,500,1800,-150,components.cloud,true,2),
        new Init(500,500,2200,-100,components.cloud,true,2),
        new Init(500,500,3800,-100,components.blackhole,true,3),
        new Init(500,500,2580,-70,components.tree,true,3),
        new Init(500,500,2400,190,components.torch,true,3),
        new Init(500,500,2900,100,components.torch,true,3),
        new Init(500,500,180,90,components.torch,true,3),
        new Init(500,500,-100,193,components.torch,true,3),
        new Init(500,500,-200,193,components.torch,true,3),
        new Init(500,500,0,0,components.cloud,true,2),
        new Init(500,500,0,0,components.cloud,true,2),
        new Init(500,500,0,0,components.cloud,true,2),
        new Init(500,500,0,0,components.cloud,true,2),
        new Init(500,500,0,0,components.cloud,true,2),
        new Init(500,500,700,-187,components.firepit,true,3),
        new Init(5000,500,0,0,backgrounds.plataform,false,3),
        new Init(5000,500,0,0,backgrounds.variable,false,3),
        new Init(500,500,3963,-70,components.skull,true,3),
        new Init(500,500,4467,-190,components.skull,true,3),
        new Init(500,500,1400,-100,npcs.fyro,true,3),
        new Init(500,500,2580,-20,npcs.syter,true,3),
        new Init(500,500,4200,100,npcs.goor,true,3),
    ]
    static ilumination = [
        new Init(5000,500,0,0,backgrounds.ilumination,false,3)
    ]
    static player = new Player()
};

class Colision {
    constructor(i) {
        this.left = (Game.player.x + Game.player.width >= Game.plataforms[i].x + 5 &&
            Game.player.x <= Game.plataforms[i].x + Game.plataforms[i].width &&
            Game.player.y <= Game.plataforms[i].y + Game.plataforms[i].height &&
            Game.player.y + Game.player.height >= Game.plataforms[i].y + 1)
        this.right = (Game.player.x + Game.player.width >= Game.plataforms[i].x  &&
            Game.player.x <= Game.plataforms[i].x + Game.plataforms[i].width -5&&
            Game.player.y <= Game.plataforms[i].y + Game.plataforms[i].height &&
            Game.player.y + Game.player.height >= Game.plataforms[i].y + 1) 
    }
};

function frames() {
    let restart_ilumination = false
    setInterval(() => {
        if(restart_ilumination == false) {
             Game.ilumination[0].spriteY +=500
            if ( Game.ilumination[0].spriteY==4500) {
                restart_ilumination = true
            }
        }
        else if(restart_ilumination == true){
             Game.ilumination[0].spriteY -=500
            if ( Game.ilumination[0].spriteY==0) {
                restart_ilumination = false
            }
        }
    }, 150);
    let gravity_variation_plataform= false
    setInterval(() => {
        if(gravity_variation_plataform == false) {
            Game.inits[20].y +=0.5
            Game.inits[8].y +=0.5
            Game.inits[9].y +=0.5
            Game.inits[10].y +=0.5
            Game.inits[11].y +=0.5
            Game.inits[12].y +=0.5
            Game.inits[18].y +=0.5
            if (Game.inits[20].y==0.5*10) {
                gravity_variation_plataform = true
            }
        }
        else if(gravity_variation_plataform == true){
            Game.inits[20].y -=0.5
            Game.inits[8].y -=0.5
            Game.inits[9].y -=0.5
            Game.inits[10].y -=0.5
            Game.inits[11].y -=0.5
            Game.inits[12].y -=0.5
            Game.inits[18].y -=0.5
            if (Game.inits[20].y==0) {
                gravity_variation_plataform = false
            }
        }
    }, 150);
    let gravity_variation_celestial= false
    setInterval(() => {
        if(gravity_variation_celestial == false) {
            Game.inits[1].y +=0.5
            if (Game.inits[1].y==15) {
                gravity_variation_celestial = true
            }
        }
        else if(gravity_variation_celestial == true){
            Game.inits[1].y -=0.5
            if (Game.inits[1].y==0) {
                gravity_variation_celestial = false
            }
        }
    }, 150);
    setInterval(() => {

        if (Game.player.spriteX==Game.player.image.width-Game.player.width) {
            Game.player.spriteX = 0     
        }
        else {
            Game.player.spriteX += Game.player.width           
        }
    }, 150);
    for (let i = 0; i < Game.inits.length; i++) {
        if (Game.inits[i].index==false ) {}
        else {
            setInterval(() => {
                Game.inits[i].spriteX += 500
                if (Game.inits[i].spriteX==500*Game.inits[i].image.width/500) {
                    Game.inits[i].spriteX = 0     
                }
            }, 120)        
        }
    }
};

let gravity_value = 1;

let velocity_value = {
    x:0,
    y:0
};

const background_movement = {
    left(){
        velocity_value.x = 0
        layer_depth_velocity[0] +=1
        layer_depth_velocity[1] +=2
        layer_depth_velocity[2] +=3
        layer_depth_velocity[3] +=5
        for (let i = 0; i < Game.plataforms.length; i++) {
            Game.plataforms[i].spriteX +=5
            Game.plataforms[i].x +=5
        }
    },
    right(){
        velocity_value.x = 0
        layer_depth_velocity[0] -=1
        layer_depth_velocity[1] -=2
        layer_depth_velocity[2] -=3
        layer_depth_velocity[3] -=5
        for (let i = 0; i < Game.plataforms.length; i++) {
            Game.plataforms[i].spriteX -=5
            Game.plataforms[i].x -=5
        }      
    }
};

function gravity() {
    for (let i = 0; i < Game.plataforms.length; i++) {
        if(Game.player.y+velocity_value.y <= Game.plataforms[i].y+Game.plataforms[i].height&&
            Game.player.y >= Game.plataforms[i].y&&
            Game.player.x+Game.player.width>Game.plataforms[i].x&&
            Game.player.x<Game.plataforms[i].x+Game.plataforms[i].width) {
            Game.player.y = Game.plataforms[i].y+Game.plataforms[i].height+1
            velocity_value.y = 0
        }
        if(Game.player.y + Game.player.height <= Game.plataforms[i].y&&
            Game.player.y + Game.player.height + velocity_value.y>+Game.plataforms[i].y&&
            Game.player.x+Game.player.width>Game.plataforms[i].x&&
            Game.player.x<Game.plataforms[i].x+Game.plataforms[i].width) {
            keystate.w.pressed=false
            Game.player.y=Game.plataforms[i].y-Game.player.height
            velocity_value.y = 0 
        } 
    }
    if (Game.player.y+Game.player.height+velocity_value.y<=canvas_config.height) {
       Game.player.y += velocity_value.y           
       velocity_value.y += gravity_value
    }
    else {
        Game.player.y=canvas_config.height-Game.player.height
        velocity_value.y = 0
        keystate.w.pressed=false
    }
};

function movement(){
    if (keystate.d.pressed==true&&keystate.a.pressed==false) {
        Game.player.image.src="img/player-right.png"
        if (new Colision(0).right) {velocity_value.x = 0}
        else if (new Colision(1).right) {velocity_value.x = 0}
        else if (new Colision(2).right) {velocity_value.x = 0}
        else if (new Colision(3).right) {velocity_value.x = 0}
        else if (new Colision(4).right) {velocity_value.x = 0}
        else if (new Colision(5).right) {velocity_value.x = 0}
        else if (new Colision(6).right) {velocity_value.x = 0}
        else if (new Colision(7).right) {velocity_value.x = 0}
        else if (new Colision(8).right) {velocity_value.x = 0}
        else if (new Colision(9).right) {velocity_value.x = 0}
        else if (new Colision(10).right) {velocity_value.x = 0}
        else if (new Colision(11).right) {velocity_value.x = 0}
        else if (new Colision(12).right) {velocity_value.x = 0}
        else if (new Colision(13).right) {velocity_value.x = 0}
        else if (new Colision(14).right) {velocity_value.x = 0}
        else if (new Colision(15).right) {velocity_value.x = 0}
        else if (new Colision(16).right) {velocity_value.x = 0}
        else if (new Colision(17).right) {velocity_value.x = 0}
        else if (new Colision(18).right) {velocity_value.x = 0}
        else if (new Colision(19).right) {velocity_value.x = 0}
        else if (new Colision(20).right) {velocity_value.x = 0}
        else if(layer_depth_velocity[0]==-760&&Game.player.x+Game.player.width<=1100) {
            velocity_value.x = +5
            Game.player.x += velocity_value.x                     
        }
        else if(Game.player.x<=screen_limit.right) {
            velocity_value.x = +5
            Game.player.x += velocity_value.x                     
        }
        else if(Game.player.x+Game.player.width>=screen_limit.right&&layer_depth_velocity[0]>=-759) {
            background_movement.right()
        }
    }
    if (keystate.a.pressed==true&&keystate.d.pressed==false) {
        Game.player.image.src="img/player-left.png"
        if (new Colision(0).left) {velocity_value.x = 0}
        else if (new Colision(1).left) {velocity_value.x = 0}
        else if (new Colision(2).left) {velocity_value.x = 0}
        else if (new Colision(3).left) {velocity_value.x = 0}
        else if (new Colision(4).left) {velocity_value.x = 0}
        else if (new Colision(5).left) {velocity_value.x = 0}
        else if (new Colision(6).left) {velocity_value.x = 0}
        else if (new Colision(7).left) {velocity_value.x = 0}
        else if (new Colision(8).left) {velocity_value.x = 0}
        else if (new Colision(9).left) {velocity_value.x = 0}
        else if (new Colision(10).left) {velocity_value.x = 0}
        else if (new Colision(11).left) {velocity_value.x = 0}
        else if (new Colision(12).left) {velocity_value.x = 0}
        else if (new Colision(13).left) {velocity_value.x = 0}
        else if (new Colision(14).left) {velocity_value.x = 0}
        else if (new Colision(15).left) {velocity_value.x = 0}
        else if (new Colision(16).left) {velocity_value.x = 0}
        else if (new Colision(17).left) {velocity_value.x = 0}
        else if (new Colision(18).left) {velocity_value.x = 0}
        else if (new Colision(19).left) {velocity_value.x = 0}
        else if (new Colision(20).left) {velocity_value.x = 0}
        else if(Game.player.x>=screen_limit.left) {
            velocity_value.x = -5
            Game.player.x += velocity_value.x                     
        }  
        else if(Game.player.x<=screen_limit.left&&layer_depth_velocity[0]!=0) {
            background_movement.left()
        }  
    }        
};

function loop() {
    for (let i = 0; i < Game.inits.length; i++) {
        Game.inits[i].draw()
    }
    for (let i = 0; i < Game.plataforms.length; i++) {
        Game.plataforms[i].draw()
    }
    Game.player.draw()
    Game.ilumination[0].draw()
    movement()
    gravity()
    requestAnimationFrame(loop)
};

addEventListener('keyup',({keyCode}) => {
    switch (keyCode) {
        case 65://a
        keystate.a.pressed=false
            break;
        case 87://w
            break;
        case 68://d
        keystate.d.pressed=false
            break;
        default:
            break;
    }
});

addEventListener('keydown',({keyCode}) => {
    switch (keyCode) {
        case 65://a
        keystate.a.pressed=true
            break;
        case 87://w
        if (keystate.w.pressed==false) {
            keystate.w.pressed=true
            velocity_value.y -= 19  
        }
            break;
        case 68://d
        keystate.d.pressed=true
            break;
        default:
            break;
    }
});

frames();
loop();