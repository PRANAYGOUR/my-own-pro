var score = 0;
var bgImg2 , bg2;
var bg, bgImg, bg_changed;
var fruit, fruitImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var cloudsGroup , cloudImage;
var survivor , survivor_running , survivor_collided;
var ground , groundImage;
var obstaclesGroup, obstacle1, obstacle2;
var obstacle3, obstacle4, obstacle5, obstacle6;
var foodsGroup, foodImage;
var food1, food2, food3, food4, food5, food6;
var gameOver, gameOverImg;
var restart , restartImg;
var coinsGroup, coin1, coin2, coin3, coin4, coin5, coin6;
var obstacle1;
localStorage["HighestScore"] = 0;
function preload(){ 
bgImg = loadImage("bg3.png");
bgImg2 = loadImage("bg2.png");
//loading images for coins 
coin1 = loadImage("coin1.png");
coin2 = loadImage("coin1.png");
coin3 = loadImage("coin1.png");
coin4 = loadImage("coin1.png");
coin5 = loadImage("coin1.png");
coin6 = loadImage("coin1.png");

// loading obstacle images

obstacle1 = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png","obstacle5.png","obstacle6.png","obstacle7.png","obstacle8.png");
 // displaying the picture of gameOverImg and restartImg
 gameOverImg = loadImage("gameOver.png");
 restartImg = loadImage("restart.png")
//displaying the image for clouds
cloudImage = loadImage("cloud.png");

//loading images for food
Food1 = loadImage("fruit1.png");
food2 = loadImage("fruit2.png");
food3 = loadImage("fruit3.png");
food4 = loadImage("fruit4.png");
food5 = loadImage("fruit1.png");
food6 = loadImage("fruit3.png");

//loading image for ground
groundImage = loadImage("ground2.png");

// loading survivor animation
survivor_running = loadAnimation("survivors1.png","survivors2.png","survivors3.png","survivors4.png", "survivors5.png","survivors6.png","survivors7.png","survivors8.png","survivors9.png")
survivor_collided = loadAnimation("survivor1.png", "survivor2.png", "survivor3.png", "survivor4.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);  
    // giving the value for score
    score =0
  //Moving background  
  bg=createSprite(0,0,400,200);  
  bg.addImage(bgImg); 
 
  bg.velocityX = -4; 
  bg.scale = 1.5;

  bg.addImage(bgImg2);

  //creating sprite for survivor
  survivor = createSprite(100,450,20,20);
  survivor.addAnimation("running", survivor_running);
  survivor.addAnimation("collided", survivor_collided);
  survivor.scale =1.0;

  //creating sprite for invisisble ground
  ground = createSprite(100,450,20,20);
  ground.addImage(groundImage);
  ground.x = ground.width /2;

  //creating new groups for a object
  obstaclesGroup = new Group();
  foodsGroup = new Group();
  coinsGroup = new Group();
  cloudsGroup = new Group();

  //displaying the photo of gameOver image
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.visible = false;
 }

function draw(){ 
  background("pink");
  
 if (gameState===PLAY){ 
    //giving velcity for the ground and get calculate the score    
    ground.velocityX = -(6 + 3*score/100);

   //displaying the keypressed fucntion
   if(keyDown("space")  &&   survivor.y >= 100) {
    survivor.velocityY = -12;
}  
   survivor.velocityY = survivor.velocityY + 0.8  ;
    
  
  
    // moving the background in the X direction
  if(bg.x <450){
  bg.x = windowWidth/2;
  }


  if(score%10 === 0 && score > 0){
    bg.changeImage(bgImg2);
}

  // displaying the visible or invisisble
  ground.visible = false;

  //displaying the keypressed fucntion
  if(keyDown("space")  &&   survivor.y >= 100) {
    survivor.velocityY = -12;
   
}  
survivor.velocityY = survivor.velocityY + 0.8  ;

//using istouching function for destroy the food and score will increase 
if(foodsGroup.isTouching(survivor)){
  score = score+2;
  foodsGroup.destroyEach();
}

//using isTouching fucntion to destroy the coins and increase score +10
if(coinsGroup.isTouching(survivor)){
  score = score+10;
  coinsGroup.destroyEach();
}

  // displaying the collide
  survivor.collide(ground);
  
  // displaying the function which has been created for the objects
  spawnObstacles();
  spawnFoods();
  spawnCoins();
  spawnClouds();

  
  // moving the ground
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    //using istouching fucntion so if the survvor touches obsctale the gamestate will be ended
    if(obstaclesGroup.isTouching(survivor)){
     gameState = END;
  }
 
 }
else if(gameState===END){
    //set velcity of each game object to 0
    bg.velocityX = 0;
  ground.velocityX = 0;
  survivor.velocityY = 0;
  foodsGroup.setVelocityXEach(0);
  coinsGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  obstaclesGroup.setVelocityXEach(0);
  gameOver.visible = true;
  restart.visible = true;
   //set lifetime of the game objects so that they are never destroyed
   obstaclesGroup.setLifetimeEach(-1);
   foodsGroup.setLifetimeEach(-1);
   coinsGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);

   //changing the animation of the survivor
    survivor.changeAnimation("collided",survivor_collided);
   }
  drawSprites(); 
   // displaying the score 
   fill("red");
   text("Score: "+ score, 500,50);
    //changing the background if the score reaches 100
  if(score === 10){
    changeBG();
    }

    if(mousePressedOver(restart)) {
      reset();
    }

}


// creating function for obstcales
function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(1000,400,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
   // var rand = Math.round(random(1,6));
    obstacle.addAnimation(obstacle1);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1.0;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnFoods() {
  if(frameCount % 110 === 0) {
    var food = createSprite(600,195,10,40);
    //food.debug = true;
    food.velocityX = -(6 + 3*score/100);
    
    //generate random foods
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: food.addImage(Food1);
              break;
      case 2: food.addImage(food2);
              break;
      case 3: food.addImage(food3);
              break;
      case 4: food.addImage(food4);
              break;
      case 5: food.addImage(food5);
              break;
      case 6: food.addImage(food6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the food           
    food.scale = 1.0;
    food.lifetime = 300;
    //add each food to the group
    foodsGroup.add(food);
  }
}

// creating fucntion for coins 
function spawnCoins() {
  if(frameCount % 300 === 0) {
    var coin = createSprite(600,165,10,40);
    //coin.debug = true;
    coin.velocityX = -(6 + 3*score/100);
    
    //generate random coins
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: coin.addImage(coin1);
              break;
      case 2: coin.addImage(coin2);
              break;
      case 3: coin.addImage(coin3);
              break;
      case 4: coin.addImage(coin4);
              break;
      case 5: coin.addImage(coin5);
              break;
      case 6: coin.addImage(coin6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the coin           
    coin.scale = 0.6;
    coin.lifetime = 300;
    //add each coin to the group
    coinsGroup.add(coin);
  }
}

//writting function for clouds
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    var cloud = createSprite(1000,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 1.0;
    cloud.velocityX = -10;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = survivor.depth;
    survivor.depth = survivor.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

//creating function for changing the background
function changeBG(){
//changing the background image
bg2=createSprite(0,00,200,200);  
bg2.addImage(bgImg2); 
bg2.velocityX = -4; 
bg2.scale = 2;
}



function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  bg.velocityX = -4; 

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  foodsGroup.destroyEach();
  coinsGroup.destroyEach();
  
  survivor.changeAnimation("running",survivor_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}

/*

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameState = END;
var score;
var backImage;
var gameOverImage;
var reset;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 groundImage = loadImage("Typeform-Blog-BlackFriday-Cover-AskAwesomely.jpg");
  
  backImage = loadImage("jungle.jpg");
  //ground = loadImage("ground");
  
  gameOverImage = loadImage("200-2008543_game-over-png-rpg-transparent.png");
}



function setup() {
  createCanvas(600,400);
  back = createSprite(200,200,20,20);
 back.addImage("background", backImage);
  back.velocityX = -6;
//  back.y = back.width /2;
  banana = createSprite(200,200,20,20);
  banana.addImage("banana", bananaImage);
  banana.scale = 0.1;
  monkey = createSprite(100,200,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
// ground = createSprite(100,300,400,400);
//  ground.addImage("ground", groundImage);
 // ground.scale = 0.1;
 //obstacle=createSprite(200,350,20,20);
 // obstacle.addImage(obstacleImage);
//  obstacle.scale = 0.1;
   FoodGroup = new Group();
  obstacleGroup = new Group();
  score  = 0;
  ground = createSprite(200,370,400,10);
  ground.x = ground.width /2;
 
//  gameOver = createSprite(200,200,20,20);
 // gameOver.addImage("gameOver", gameOverImage);
 // gameOver.scale = 0.1;
 fill("black");
}


function draw() {
background("skyblue")
   //monkey.debug = true;
  drawSprites();
  
  spawnObstacle();
     spawnBanana();  
 // reset();
   ground.visible = false;
if(keyDown("space")  &&   monkey.y >= 100) {
        monkey.velocityY = -12;
       
    }  
    monkey.velocityY = monkey.velocityY + 0.8  ;
  //ground.velocityX = -(6 + 3*score/100);
      if(FoodGroup.isTouching(monkey)){
         score = score+2;
      FoodGroup.destroyEach();
        //monkey.scale = 0.2;
        
     
    }
 
  
  monkey.collide(ground);
     
  fill("red");
  textSize(20);
 
text("Score "+ score, 150,50);
//score = score + Math.round(getFrameRate()/60);
  
 if(back.x < 300){
    back.x = 500;
    
  }
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
if(back.x < 100){
    back.x = back.width/2;
    
  }
  
 switch(score){
   case 10: monkey.scale = 0.12;
          break;
     case 20: monkey.scale = 0.14;
             break;
     case 30: monkey.scale = 0.16;
             break;
     case 40: monkey.scale = 0.18;
             break;
             default : break;
 }   
     //gameOver.visible = true; 
  if( obstacleGroup.isTouching(monkey)){
   
 obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  gameOver.visible = false;
 
  monkey.changeAnimation("running" , monkey_running);
   score = 0;
     
    }
   
}
function spawnBanana(){
  if(World.frameCount % 120 === 0){
  var  banana=createSprite(300,400,20,20);
   //banana.depth = 1;
    banana.addImage(bananaImage);
   banana.scale = 0.1;
    banana.y = Math.round(random(50,340));
   //obstacle.velocityX = -(8 + (score/10));
 banana.setLifetime = 50;
    
   FoodGroup.add(banana);
      banana.velocityX = -5;
  }
}
function spawnObstacle() {
  
  if(World.frameCount % 200 === 0){
  //   back = createSprite(200,200,20,20);
 //back.addImage("background", backImage);
  var   obstacle=createSprite(200,350,20,20);
  obstacle.depth = -6;
  obstacle.addImage(obstacleImage);
     obstacle.velocityX = -(6 + 3*score/100);
    obstacle.scale = 0.1;
    //obstacle.y = Math.round(random(50,370));
   obstacle.velocityX = -(8 + (score/10));
    obstacle.setLifetime = 50;
    obstacle.depth = 1;
    obstacleGroup.add(obstacle);
    
 obstacle.velocityX = -5;
  }
}
*/