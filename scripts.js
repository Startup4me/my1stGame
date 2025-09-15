
    /*======== App state & helpers ========*/
    let selectAvatar=null;
    const gameScreen=document.getElementById('game-screen');
    const startScreen=document.getElementById('start-screen');
    const muteBtn =document.getElementById('muteBtn');
    const muteIcon=document.getElementById('muteIcon');
    const muteText =document.getElementById('muteText');

    const bgSound=document.getElementById('bgSound');
     const winSound=document.getElementById('winSound');
     const lossSound=document.getElementById('lossSound');
     const tieSound=document.getElementById('tieSound');
    const usernameEl = document.getElementById('username');
    const avatarGrid=document.getElementById('avatarGrid');
    const playerNameE1=document.getElementById('playerName');
    const playerAvatarEl = document.getElementById('playerAvatar');
    // mute/unmute toggle
    let isMuted =false;
    function updateMuteUI(){ 
      muteIcon.innerText= isMuted?'🔇':'🔊';
      muteText.innerText=isMuted?'muted':'Unmuted';
      [bgSound,lossSound,winSound,tieSound].forEach(a=>a.muted=isMuted);
    }
    muteBtn.addEventListener('click',()=>{
      isMuted=!isMuted;
      updateMuteUI();
    });
   updateMuteUI();
 
   //avatar (click to select)
   avatarGrid.querySelectorAll('.avatar').forEach(node=>{
  node.addEventListener('click',()=>{
    avatarGrid.querySelectorAll('.avatar').forEach(n=>n.classList.remove('selected'));
    node.classList.add('selected');//👨‍💻🚨🚨🚨 used last node value instead
    selectAvatar=node.innerHTML;})
 })

  playBtn.addEventListener('click',()=>{
    const name=usernameEl.value.trim() || 'Player';
    console.log(name);// for checking purpose

    if(!selectAvatar){
      // if user hasn't picked, auto-select first
      const Avatars =avatarGrid.querySelectorAll('.avatar');
      const third=Avatars[2];
      if(third){third.classList.add('selected');
      selectAvatar=third.innerHTML;
    }}
      //save values visually
      playerAvatarEl.innerHTML=selectAvatar ||'🐱‍💻';
      playerNameE1.textContent=name;
      //Start background music on this user gesture(allowed by browser)
      if(!isMuted){
        bgSound.play().catch(err=>console.warn("bgMusic blocked: ",err));
      }
      

    
    startScreen.style.display='none';
    gameScreen.style.display='flex';
  });

  function resetToMenu(){
   startScreen.style.display='flex';
   gameScreen.style.display='none';

  }
 /*🎈🎈🎈🎈🎈 fo changing the game-screen
   startScreen.style.display='none';
    gameScreen.style.display='flex';*/
 
    let attempt=5;
    let score =JSON.parse(localStorage.getItem("score"))||{
      user:0,
      computer:0,
      tie:0
    }
    function generateComputerChoice (){
  
    let choices= ["Bat","Ball","Stump"];
    return choices[Math.floor(Math.random()*choices.length)]
  
    } 
    function getResult(userChoice,computerChoice){
    console.log(computerChoice);
   if(userChoice=="Bat"){
     if(computerChoice=="Ball"){score.user++;
      return 'User Won 🎉';
    console.log( 'User Won 🎉')  ;
     }
     else if(computerChoice=="Bat"){score.tie++;
      return `It a tie 🤝`;
     }
     else if(computerChoice=="Stump"){score.computer++;
      return`Computer has won 🤖`;
     }
   } else if(userChoice=='Ball'){
    if(computerChoice==`Bat`){score.computer++;
       return `Computer has won 🤖`;
    }else if(computerChoice==`Ball`){score.tie++;
      return `It's a tie 🤝`;
    }else if(computerChoice=='Stump'){score.user++;
      return 'User won 🎉';
    }
   }else{
  if(computerChoice==`Bat`){score.user++;
       return `User won 🎉`;
    }else if(computerChoice==`Ball`){score.computer++;
      return `Computer has won 🤖`;
    }else if(computerChoice=='Stump'){score.tie++;
      return `It's a tie 🤝`;
    }
   }

  }  
  //Function to display result
  function display(userChoice=0,computerChoice=0,resultMsg=0){
    if(resultMsg!==0){
   document.getElementById("result").innerText=`You chose: ${userChoice} | Computer chose: ${computerChoice}\n → ${resultMsg}!`;}

    document.getElementById("user-score").innerText=`You: ${score.user}`;
    document.getElementById("computer-score").innerText=`Computer: ${score.computer}`;
       document.getElementById("tie-score").innerText=`Tie: ${score.tie}`;
   document.getElementById("attempts-left").innerText=`Attempts Left: ${attempt}`;
  }


  function playGame(userChoice){
    
  let computerChoice=generateComputerChoice();
   
  let resultMsg=getResult(userChoice,computerChoice);
    attempt--; // reduce attempt

  //Save score in local storage
 localStorage.setItem("score",JSON.stringify(score));

  display(userChoice,computerChoice,resultMsg);
    if(attempt===0){
    endGame();
  }
  }
 let endScreen =document.querySelector("#end-screen");
  function endGame(){
    //let endScreen =document.querySelector("#end-screen");
    let endMessage=document .getElementById("end-message");
   // endScreen.style.display="flex";
   
    // Small timeout so transition works
    // setTimeout(()=>{
    //   endScreen.classList.add("show");
    // },50);
    endScreen.classList.add("show");
  
    if(score.user > score.computer){
      endScreen.style.backgroundColor = "#02610b";
     endScreen.style.backgroundImage = "linear-gradient(10deg,rgba(2, 97, 11, 1) 17%, rgba(3, 105, 13, 1) 25%, rgba(9, 143, 22, 1) 40%, rgba(20, 176, 5, 1) 56%, rgba(51, 255, 0, 1) 74%, rgba(41, 191, 4, 1) 100%)";
      endMessage.innerHTML=`<div>🎉Congrats, You Win! 🎉</div><div style="margin-top:8px;">Well played <strong>${playerNameE1.textContent}</strong></div>`;
      winSound.play();
    }else if(score.computer> score.user){
      //endScreen.style.background="rgb(223 7 7)";
        endScreen.style.backgroundColor = "#b30b0b";
     endScreen.style.backgroundImage = "linear-gradient(10deg,rgba(179, 11, 11, 1) 7%, rgba(194, 19, 19, 1) 19%, rgba(199, 12, 12, 1) 33%, rgba(232, 7, 7, 1) 58%, rgba(242, 56, 56, 1) 80%, rgba(245, 61, 61, 1) 100%)";
      endMessage.innerHTML=`<div>😏 You Lose! 😏</div><div style="margin-top:8px">Try again, <strong>${playerNameE1.textContent}</strong></div>`;
      lossSound.play();
    }else{
    endScreen.style.background="#362c2c";
    endScreen.style.backgroundImage="linear-gradient(10deg,rgba(54, 44, 44, 1) 16%, rgba(70, 57, 57, 1) 41%, rgba(79, 64, 64, 1) 51%, rgba(97, 78, 78, 1) 62%, rgba(125, 102, 102, 1) 78%, rgba(145, 125, 125, 1) 100%)";
      endMessage.innerHTML=`<div>🤝 It's a Tie! 🤝</div><div style="margin-top:8px">Close game, <strong>${playerNameE1.textContent}</strong></div>`;
    tieSound.play();
    } //resetGame();
  }
 function  resetGame(){
  endScreen.classList.remove("show");
  console.log("Called reset function ✋🏻");
  score={user:0,computer:0,tie:0};
  attempt=5;
  localStorage.setItem("score",JSON.stringify(score));
  document.getElementById("result").innerText="";
//  document.getElementById("end-screen").style.display="none";//✅ Hide overlay when reset
  //document.getElementById("score").innerText ="SCORE RESET!";
  display();
 }

 //✅ Play Again button listener
 document.getElementById("play-again").addEventListener("click",()=>{resetGame(); // same as reset

 });

 //🔻 used for checking quick css changes in end-screen 👇⏬

/*window.onload=()=>{
  score={user:0,computer:0,tie:10};//testing for css
  endGame();
 };*/

document.getElementById("winSound").onerror=()=>{
  console.error("❌ win sound file not found!")};

  document.getElementById("lossSound").onerror=()=>{
  console.error("❌ loss sound file not found!");
};
  document.getElementById("tieSound").onerror=()=>{
  console.error("❌ tie sound file not found!");
};