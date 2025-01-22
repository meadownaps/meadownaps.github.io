let i=1;
let toType;
let div;

// Generate accent colour, randomly cycling through m6

let m6;

if (localStorage.getItem("m6")==null || localStorage.getItem("m6")=='[]') {
    m6=["#9EDBF9","#B689C8","#FFC261","#FDF6AF","#F3B6CF","#5e4fa2"]; //#ebeff1. rarity alt
} else {
    m6=JSON.parse(localStorage.getItem("m6"));
}

let r6=Math.floor(Math.random() * m6.length);
var m6c=m6[r6]; // Choose random accent colour
m6.splice(r6,1)
localStorage.setItem("m6",JSON.stringify(m6));

// Get refresh count

if (localStorage.getItem("refreshCount")==null) {
    refreshCount=0;
} else {
    refreshCount=localStorage.getItem("refreshCount");
}

// Start script

function typewriter() {
    if (div==undefined) {
        div=document.getElementById('myName');
    }
    if (toType==undefined) {
        // toType=div.innerHTML;
        toType=["hi, i'm av! <br   /> i'm an aspiring artist/horse girl. <br   /> nice to meet you!",
        "hi, i'm av! <br   /> i'm just trying to find what's important.           <br/> i hope you tag along!"][refreshCount%2]
    }
    
    div.innerHTML=toType.slice(0,i).replace(/(?!<.*?>)<.*/,"").replace(/(?<=i'm )(da?v?i?d?\.?)/,"<span style=\"color:"+m6c+"\">$1</span>") + '_';
    // console.log(i)
    i++;
    if (i<=toType.length) {
        setTimeout(function() {typewriter()},50);
    }
    else {
        //if (refreshCount>0) {loop()}; // start drawing
        loop(); // draw 4 free lol
        refreshCount++;
        localStorage.setItem("refreshCount",refreshCount);
    };
}

window.onload = function() { setTimeout(function(){typewriter()},500) };
