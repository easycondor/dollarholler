import type { Action } from "svelte/action";

import { spring } from "svelte/motion";

interface SwipeProps {
    triggerReset?:boolean;
}

export const swipe:Action<HTMLElement, SwipeProps> = (node, params) =>{
    
let x:number;
let startingX:number;
let elementWidth = node.clientWidth; //largeur écran

let triggerReset = params?.triggerReset || false;//si existe sinon flase

//physic animation stiffness and damping
const coordinates = spring(
    {x:0,y:0},
    {
        stiffness:0.2,
        damping:0.4,

    }
)

//store and update the values en passant les coordonnées
//translate3d (xvalue, yvalue, zvalue)
coordinates.subscribe(($coords)=> {
    node.style.transform = `translate3d(${$coords.x}px, 0, 0)`
}

)

//Swipe only on mobile < 1024
function setupEventListener(){
    if(isMobileBreakpoint()){
        node.addEventListener('mousedown', handleMouseDown)
        node.addEventListener('touchstart', handleTouchStart)
    }else{
        node.removeEventListener('mousedown', handleMouseDown)
        node.removeEventListener('touchstart', handleTouchStart)
    }

    //update th card width
    elementWidth=node.clientWidth;
}

setupEventListener();

window.addEventListener("resize", ()=>{
    setupEventListener();
})

    function isMobileBreakpoint(){
        const mediaQuery = window.matchMedia("(max-width: 1024px)");
        if(mediaQuery.matches){
            return true;
        }
    }


function resetCard() {
    coordinates.update(()=>{
        return { x : 0, y : 0 }
    })
    triggerReset=false;
}

//corrige le bug car cancel ne fonctionne qu'une seule fois
function outOfView() {
    node.dispatchEvent(
        new CustomEvent('outOfView')
    )
}

    function handleMouseDown(event:MouseEvent){
        console.log('mousedown');
        x = event.clientX;
        startingX = event.clientX;
        window.addEventListener('mousemove', handleMouseMove);//a l'intérieur de l'event mousedown !! car appeler seulement si
        window.addEventListener('mouseup', handleMouseUp);
    }

    function handleTouchStart(event:TouchEvent){
        console.log('mousedown');
        x = event.touches[0].clientX;
        startingX = event.touches[0].clientX;
        window.addEventListener('touchmove', handleTouchMove);//a l'intérieur de l'event mousedown !! car appeler seulement si
        window.addEventListener('touchend', handleTouchEnd);
    }



    function handleMouseMove(event:MouseEvent){
        //console.log(`moving ${event.clientX} - ${event.clientY}`);
         //clientX donne la valeur selon la fenêtre et la différence position du click et la positon de la souris
         //Delta x = différence from where you click vs where we are currently => + ou - 33px
         const dx = event.clientX - x;
         //console.log(`dx = ${dx}`);
         x = event.clientX;
         updateCoordinates(dx);
         
    }

    function handleTouchMove(event:TouchEvent){
        //calcul delta x
       const dx = event.touches[0].clientX - x;
       //reset x
       x= event.touches[0].clientX;
       //update coordinates
       updateCoordinates(dx);
         
    }

    function updateCoordinates(dx:number){
        coordinates.update(($coords => {
            return {
                x: $coords.x + dx,
                y:0
            }
         } ))
    }

    function setXCoordinates(x:number){
        coordinates.update(()=>{ 
            return  {x:x,y:0}
        })
    }

function moveCardOver(endingX:number){

    const leftSnapX = elementWidth * -.95; //90% de l'écran
    const rightSnapX = 0;

    const movement = startingX - endingX;

    //swipe left over 20px
    if(movement > 20){
        x = leftSnapX
        setXCoordinates(x);
        outOfView();
    }

    //swipe right
    if(movement < 20){
        x = rightSnapX;
        setXCoordinates(x);
    }

   
}

function handleTouchEnd(event:TouchEvent){
    //console.log(`mouse Up`);
    const endingX = event.changedTouches[0].clientX;
    moveCardOver(endingX);//bouge l'el. jusqu'a un certain point
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd); 
}

    function handleMouseUp(event:MouseEvent){
        //console.log(`mouse Up`);
        const endingX = event.clientX;
        moveCardOver(endingX);//bouge l'el. jusqu'a un certain point
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp); 
    }
    
    return {
        update(newParams:SwipeProps){
            if(newParams.triggerReset){
                resetCard();
            }
        },
        destroy(){
            node.removeEventListener('mousedown', handleMouseDown)
            node.removeEventListener('touchstart', handleTouchStart)
        
        }
    }
}

