/*    The main jest:
      - Each game consists of 3 rounds.
        - Each round has 3 'tick' events: The user will select(perhaps pre-select) to either attack, defend, or charge up/stack) for each tick. The opponent will also chose the same for each tick.
        - Each player starts with 5 HP, first to 0 Hp loses.


    Basic interactions:
        - Shielding an attack will either reduce or completely mitigate the DMG of the attack.
        - An unblocked standard attack deals 1 DMG, if blocked(defended) if will deal 0 DMG instead.
        - A unblocked charged attack will deal up to 3 DMG, if blocked its DMG will be reduced by 50%.
        - A player is vulnerable and open to DMG attacks when charging their own attack. 

     Cheese prevention/different cases:
         - To deal with over-defensive play-styles , block can be used at most 2 times per round, however it can not be used consecutively(as of now) -this will cause shield break, stunning you for the next tick.
         - If a player deals 3 consecutive attacks they will gain fatigue, causing their next attack to deal 50% less damage, however waiting 3 ticks will remove the effects of fatigue.

         - After 3 consecutive attacks, each non-fatigued attack grants perseverance. A standard persevered attack deals 2 base DMG and increases by 1.5 per charge. (If one is willing to wait the 3 rounds to remove fatigue, the base strength of their attacks will increase)
        
         - If both players deal attacks the DMG will be taken respectively.
*/
 


// **If p1 attacks and p2 defends it doesn't register**  (Getting close though :)) - dont forget to take a break..





 //document.querySelector('status') = status;
 // variables for the HTML elements  
 let playerMove = document.querySelector("p");
 let stat = document.getElementById("stat");
 let p2Stat = document.getElementById("p2stat");
 let p1Input = document.getElementById("p1Input");
 let p1Select = document.getElementById("p1Select");
 let startGame = document.getElementById("startGame");
 let gameStart = document.getElementById("startGame");
 let resetBtn = document.getElementById("reset");
 let result = document.getElementById("result");

 let p2Input = document.getElementById("p2Input");
 let p2Select = document.getElementById("p2Select");
//
 // maybe these can be moved.
 let p1Atk;
 let p2Atk;
 let p1Def;
 let p2Def;

 let Atk = 0 
 
// Creating Objects for the player and player 2

const player = {
    actCnt : 0,
    Moves : ["a", "s", "d"],
    Attack(){
        this.CheckFatigue();
        if(player.isFatigued){
            player2.BaseHp = player2.BaseHp - 0;
        }
        if(player2.hasShield){
            player2.BaseHp = player2.BaseHp - (player.BaseAtk * .5);
        }
        else{
            
          //   playerMove.innerText = "Player 1: You attacked!";
        actCnt++;
        player2.BaseHp = player2.BaseHp - player.BaseAtk;
          // p2Stat.innerText = `player 2 now has ${player2.BaseHp} HP!`;
           showResults();
           p1Input.value = "";
           
        }
    },
    CheckFatigue(){
        if(actCnt = 3){
            this.isFatigued = true;
        }
    },
    ResetFatigue(){
        this.actCnt = 0;
    },
    Defend(){
        this.ResetFatigue();
        
      //  playerMove.innerText = "Player 1: defended!";
        // if(CheckShielding = 2){
        //     player.hasShield = false;
        // }
        p1Input.value = "";
        p2Input.value = "";
        player.hasShield = true;
        

    },

    BaseHp : 5,
    BaseAtk : 1,
    BaseDef : 1,
    isFatigued: false,
    hasPerseverance: false,
    shieldBreak : false,
    PerseveredAtk : 2,
    BaseCharge : 1,
    PerseveredCharge : 2,
    TickChoice : 3,
    isWinner : false,
    hasShield : false

    
}

const player2 = {
    Moves : ["a", "s", "d"],
    Attack(){
        let actCnt;
        actCnt++;

        this.CheckFatigue();
        if(player2.isFatigued){
            player.BaseHp = player.BaseHp - 0;
        }
        if(player.hasShield){
            player.BaseHp = player.BaseHp - (player2.BaseAtk * .5);
        }
        else{
            
           //  playerMove.innerText = "Player 2: You attacked!";
        actCnt++;
        player.BaseHp = player.BaseHp - player2.BaseAtk;
          // stat.innerText = `player 1 now has ${player.BaseHp} HP!`;
          // showResults();
          // p2Input.value = "";
        }
        
    },
    CheckFatigue(){
        if(actCnt = 3){
            this.isFatigued = true;
        }
    },
    ResetFatigue(){
        this.actCnt = 0;
    },
    Defend(){
        this.ResetFatigue();
       // playerMove.innerText = "Player 2: defended!";
        // if(CheckShielding = 2){
        //     player.hasShield = false;
        // }
       // p2Input.value = "";
        player2.hasShield = true;
    },
    BaseHp : 5,
    BaseAtk : 1,
    BaseDef : 1,
    isFatigued: false,
    hasPerseverance: false,
    shieldBreak : false,
    PerseveredAtk : 2,
    BaseCharge : 1,
    PerseveredCharge : 2,
    TickChoice : 3,
    isWinner : false,
    hasShield : false
}


// I added the player 1&2 Object to the Start game event listener so that stats will restart on click  (thinking of creating a restart function and just calling it here instead. Then I can put back the Objects up top)
gameStart.addEventListener("click",function() {
    document.getElementById("welcome").style.visibility = "visible";
       //showResults();
       

// finding a way to store the users choice.  This will need to be edited and optimized.   Eventually there will need to be a way to start both players choices for all 3 ticks In each Round.
 getPlayerOne();
 get2ndPlayer();
//execution();
result.addEventListener('click', execution);
});


//tring to have a function to handle both moves against each other at the same time.
function execution(){
    //getPlayerOne();
//get2ndPlayer();
   switch(true){
    case(p1Atk == 1 && p2Def == 1):
        playerMove.innerText =("player 2  blocked player 1's attack!");
        p2Stat.innerText = `player 2 now has ${player2.BaseHp} HP!`;
        stat.innerText = `player 1 now has ${player.BaseHp} HP!`;
        
        break;
    case(p1Atk == 1 && p2Atk == 1):
    playerMove.innerText = "Both players attacked!";
    p2Stat.innerText = `player 2 now has ${player2.BaseHp} HP!`;
    stat.innerText = `player 1 now has ${player.BaseHp} HP!`;


       // alert(" players traded!");
        break;
    case(p1Def == 1 && p2Atk == 1):
        playerMove.innerText = ("player 1 blocked player 2's attack!");
        p2Stat.innerText = `player 2 now has ${player2.BaseHp} HP!`;
        stat.innerText = `player 1 now has ${player.BaseHp} HP!`;
        break;
}
showResults();
}
function getPlayerOne(){
    //prompt("P1: enter a move.");
p1Select.addEventListener('click', function(){
    if (p1Input.value == "a") {
          p1Atk = 1; 
        //  get2ndPlayer();
         
        
        player.Attack();
 
     }
     if (p1Input.value == "d") {
         p1Def = 1;
         //get2ndPlayer();
         
 
         player.Defend();
 
     }
    //   if (p1Input.value == "s") {
    //       player.
 });
}


// function to get the second players move choice
function get2ndPlayer(){
    p2Select.addEventListener('click', function(){
    if (p2Input.value == "a") {
        p2Atk = 1;

        player2.Attack();
      // p2Input.value = " ";

   }
   if (p2Input.value == "d") {
      p2Def = 1;
      //p1Input.value = " ";
       //p2Input.innerText = "";
      player2.Defend();
    }
   p2Input.value = "";
      //execution();
});
        
}
function showResults() {
 if(player2.BaseHp == 0){
   alert("player 1 wins!");
   resetGame();
 }
 if(player.BaseHp == 0){
    alert("player 2 wins!");
    resetGame();
 }
 
}

// Finding a way to reset the game state and stats.
resetBtn.addEventListener("click", resetGame);
function resetGame(){
    player.BaseHp = 5;
    player.BaseAtk = 1;
    player.BaseDef = 1;
    player.isFatigued = false;
    player.hasPerseverance = false;
    player.shieldBreak = false,
    player.PerseveredAtk = 2,
    player.BaseCharge = 1,
    player.PerseveredCharge = 2,
    player.TickChoice = 3,
    player.isWinner = false,
    player.hasShield = false

    player2.BaseHp = 5;
    player2.BaseAtk = 1;
    player2.BaseDef = 1;
    player2.isFatigued = false;
    player2.hasPerseverance = false;
    player2.shieldBreak = false,
    player2.PerseveredAtk = 2,
    player2.BaseCharge = 1,
    player2.PerseveredCharge = 2,
    player2.TickChoice = 3,
    player2.isWinner = false,
    player2.hasShield = false

   stat.innerText = " ";
   playerMove.innerText = "Player 1 ";
   p1Input.value = "";
   p2Input.innerText = " ";
   p2Stat.innerText = "";
   
   document.getElementById("startGame").style.visibility = "hidden";

  
}
//move = prompt("Hello player. Chose your move");


// startGame.addEventListener("click", function(){
//     document.getElementById("Attack").style.visibility = "visible";
//     document.getElementById("Charge").style.visibility = "visible";
//     document.getElementById("Block").style.visibility = "visible";
//     document.getElementById("prompt").style.visibility = "visible";
//     document.getElementById("startGame").style.visibility = "hidden";
//     let AtkFirst = document.getElementById("Attack").value;
//     let ChgFirst = document.getElementById("Charge").value;
//     let BlkFirst = document.getElementById("Block").value;
   
//         first_tick();  
    
// })


// function first_tick() {
             
// //             document.getElementById("Attack").addEventListener("keypress", function(event) {
// //     event.preventDefault();
// //     if (event.key === 13) {
// //         document.getElementById("Attack").click();
// //     }  
// // });
            
//             while(move1 == a ||move1 == s || move1 == d){
//               if(move1 == a) {
//                  console.log("player attacked");
//                 tick_Atk();
//                 checkHP();
//              }

   
            
            
//             document.getElementById("Charge").addEventListener("click",function() {
//                 console.log("player charged");
//                  move1 = "Charge";
//             });

//             document.getElementById("Block").addEventListener("click",function() {
//                 console.log("player blocked");
//                  move1 = "Block";
//             });
//         }
//         console.log("please enter a valid option...");
// }

// function tick_Atk(){
//     Atk ++;
//     move1 = "Attack";
//     player.BaseHp -= 1;
// }
 
// function checkHP() {
    
//  console.log(`Attack successful! Your opponent's HP is now: ${player.BaseHp}.`);
// }



// --------- GG --------------
//function tickEvents(){}tickEvents();
  //
 // console.log(document.querySelector('input[name="fav_language"]:checked').value);
//const Form = document.forms.form;
//const checked = Form.querySelector('input[name="first_move]:checked');
//console.log(checked.value);
//console.log(Array.from(form.elements.first_move).find(radio => radio.checked));


