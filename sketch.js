var sky,skyImg;
var bird,birdImg;
var obstacle,obstacleImg,obstacle1,obstacle2,obstacle3,obstacleGrp;
var gameState="play";
var tb,bb;
var score=0;
var wall,wallGrp;
var dot;
var go,goImg;
var t;
var invisibleBoundry1, invisibleBoundry2, invisibleBoundry3, invisibleBoundry4, invisibleBoundry5, invisibleBoundry6, invisibleBoundryGrp;


function preload(){
skyImg=loadImage("a2.png");
birdImg=loadImage("b1.png");
birdImg2=loadImage("b2.png");
obstacle1=loadImage("middle.png");
obstacle2=loadImage("up.png");
obstacle3=loadImage("down.png");
goImg=loadImage("go1.PNG");
  
}

function setup() {
 createCanvas(500,500);
  
  sky=createSprite(250,250);
  sky.addImage(skyImg);
  sky.scale=1.3;
  
  dot=createSprite(200,200,1,1);
  
  bird=createSprite(60,250);
  bird.addImage(birdImg);
  bird.scale=0.5;
  
  obstacleGrp=createGroup();
  wallGrp=createGroup();
  invisibleBoundryGrp= createGroup();
  
  go=createSprite(250,250);
  go.addImage(goImg);
  go.scale=0.8;
  
   score=0;
}
  
function draw() {
 background(0);
  drawSprites();
 tb=createSprite(250,80,500,10);
  tb.visible=false;
 bb=createSprite(250,420,500,10);
  bb.visible=false;

  bird.setCollider("rectangle",0,0,100,50);
  
  sky.velocityX=-2
  
  dot.x =bird.x;
  dot.y =bird.y;
  dot.visible=true;
  
  if(gameState==="play"){
   if(keyWentDown("space")){
   bird.velocityY=-5;
   bird.addImage(birdImg2);
 }  
    if(wallGrp.isTouching(dot)){
      score++;
    }
    
    if(bird.isTouching(tb)||bird.isTouching(bb)){
    gameState="end";
  }
    
    go.visible=false;
    
  if(keyWentUp("space")){
    bird.addImage(birdImg);
  } 
    spawnObstacles();
    
     if(sky.x<-250){                                                  
    sky.x=250
  }
    
    bird.velocityY=bird.velocityY+0.5;
    
    if(bird.isTouching(invisibleBoundryGrp)){
      gameState="end";
    }
    
  }
  else if(gameState==="end"){
    bird.destroy();
    wallGrp.destroyEach();
    obstacleGrp.destroyEach();
    sky.velocityX=0;
    go.visible=true;
    textSize(20);
  fill("white");
    invisibleBoundryGrp.destroyEach();
    text("press 'r' to restart",180,300);
    if(keyDown("r")){
      reset();
    }
  }
  
    
  
  textSize(20);
  fill("white");
  text("score="+score,20,110);
  
}

function reset(){
  gameState="play";
      bird=createSprite(60,250);
       bird.addImage(birdImg);
    bird.scale=0.5; 
      score=0;
}
function spawnObstacles(){
  if (frameCount % 60 === 0){
   var obstacle = createSprite(510,250,10,40);
   obstacle.velocityX = -5;
   var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
        invisibleBoundry1=createSprite(500,150,85,105);
        invisibleBoundry1.lifetime=110;
        invisibleBoundry2=createSprite(500,370,85,190);
        invisibleBoundry2.lifetime=110;
        invisibleBoundry1.velocityX=-5
    invisibleBoundry2.velocityX=-5
        invisibleBoundryGrp.add(invisibleBoundry1);
        invisibleBoundryGrp.add(invisibleBoundry2);
        invisibleBoundry1.visible=false;
    invisibleBoundry2.visible=false;
              break;
      case 2: obstacle.addImage(obstacle2);
        invisibleBoundry3=createSprite(500,100,85,90);
        invisibleBoundry3.lifetime=110;
        invisibleBoundry4=createSprite(500,350,85,220);
        invisibleBoundry4.lifetime=110;
         invisibleBoundry3.velocityX=-5
    invisibleBoundry4.velocityX=-5
        invisibleBoundryGrp.add(invisibleBoundry3);
        invisibleBoundryGrp.add(invisibleBoundry4);
        invisibleBoundry3.visible=false;
    invisibleBoundry4.visible=false;
        
              break;
      case 3: obstacle.addImage(obstacle3);
        invisibleBoundry5=createSprite(500,150,85,250);
        invisibleBoundry5.lifetime=110;
        invisibleBoundry6=createSprite(500,400,85,97);
        invisibleBoundry6.lifetime=110;
        invisibleBoundry5.velocityX=-5
    invisibleBoundry6.velocityX=-5
        invisibleBoundryGrp.add(invisibleBoundry5);
        invisibleBoundryGrp.add(invisibleBoundry6);
        invisibleBoundry5.visible=false;
    invisibleBoundry6.visible=false;
              break;
      default: break;
      
      
    }
    
    obstacle.lifetime=110;
     obstacleGrp.add(obstacle);
     obstacle.scale=0.82;
     wall=createSprite(560,250,10,300);
      wall.velocityX=-5
     wall.visible=false;
    wallGrp.add(wall);
    wallGrp.lifetime=110;
    
  }
  
}