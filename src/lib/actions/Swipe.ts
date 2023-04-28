import { spring } from "svelte/motion";

interface SwipeProps {

}

export const swipe = (node:HTMLElement, params:SwipeProps) =>{
    
let x:number;
let startingX:number;
const elementWidth = node.clientWidth; //largeur écran
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

    node.addEventListener('mousedown', handleMouseDown)

    function handleMouseDown(event:MouseEvent){
        console.log('mousedown');
        x = event.clientX;
        startingX = event.clientX;
        window.addEventListener('mousemove', handleMouseMove);//a l'intérieur de l'event mousedown !! car appeler seulement si
        window.addEventListener('mouseup', handleMouseUp);
    }

    function handleMouseMove(event:MouseEvent){
        //console.log(`moving ${event.clientX} - ${event.clientY}`);
         //clientX donne la valeur selon la fenêtre et la différence position du click et la positon de la souris
         //Delta x = différence from where you click vs where we are currently => + ou - 33px
         const dx = event.clientX - x;
         //console.log(`dx = ${dx}`);
         x = event.clientX;
         coordinates.update(($coords => {
            return {
                x: $coords.x + dx,
                y:0
            }
         } ))
         
    }

    function updateCoordinates(x){
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
        updateCoordinates(x);
    }

    //swipe right
    if(movement < 20){
        x = rightSnapX;
        updateCoordinates(x);
    }

   
}

    function handleMouseUp(event:MouseEvent){
        //console.log(`mouse Up`);
        const endingX = event.clientX;
        moveCardOver(endingX);//bouge l'el. jusqu'a un certain point
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp); 
    }
    
    return {
        update(){},
        destroy(){
            node.removeEventListener('mousedown', handleMouseDown)
        
        }
    }
}

