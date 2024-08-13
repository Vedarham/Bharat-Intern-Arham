let textWrapper = document.querySelector(".title")
textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,"<span class='letter'>$&</span>"
)

anime.timeline().add({
    targets:".title .letter",
    fontFamily:"'Whisper', cursive",
    translateY:[100,0],
    translateZ:0,
    opacity:[0,1],
    easing:"easeOutExpo",
    duration:2000,
    delay:(el,i)=>4800+40*i,
})

TweenMax.to(".box",2.4,{
    y:"-100%",
    ease:Expo.easeInOut,
    delay:1,
})

TweenMax.to(".box img",4,{
   scale:"2",
    ease:Expo.easeInOut,
    delay:0,
})

TweenMax.to(".wrapper-img",2.4,{
        width:"400",
        height:"500",
     ease:Expo.easeInOut,
     delay:0.4,
     boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"

 })

 TweenMax.from(".img",0.4,{
    opacity:0,
     ease:Expo.easeInOut,
     delay:1.4,
 })

 TweenMax.to(".left",2.4,{
    x:"-80",
    rotation:-10,
 ease:Expo.easeInOut,
 delay:1.8,
})
TweenMax.to(".right",2.4,{
    x:"80",
    rotation:10,
 ease:Expo.easeInOut,
 delay:1.8,
})

TweenMax.staggerFrom(
    ".menu > div, .hero-container >div",2,{
       opacity:0,
        y:30,
        ease:Expo.easeInOut,
        delay:2.2,
    },0.1
)


function wheelScrollAnimation (){
    window.addEventListener("wheel",(e)=>{
        if(e.deltaY>0){
            gsap.to(".marque",{
                transform:'translateX(-200%)',
                duration:4,
                repeat:-1,
                ease:"none"
            })
            gsap.to(".marque span",{
                rotate:0,
            })
        }
        else{
            gsap.to(".marque",{
                transform:'translateX(0%)',
                duration:4,
                repeat:-1,
                ease:"none"
            })
            gsap.to(".marque span",{
                rotate:180,
            })
        }
     })
}

wheelScrollAnimation()