// Event Propagation/ Event flow :
/* 
  It's an order in which event are handle in DOM
  Steps: 
  Event Capturing (Top to Bottom): When an event is triggered it move form top level to bottom to that specific target element
  Target Phase: This is th phase when event reached to the specific targeted element
  Event Bubbling (Bottom to top): Event bubbling means returning back to the root  after event reached to that targeted element 


  EG: 
  <div id="parent">
  <button id="click">Click Me </button>
  </div>

  cont parent = document.getElementById("parent");
  cont button = document.getElementById("click");

   Capturing phase: parent listener (runs first)
   parent.addEventListener("click", function () {
     console.log("Parent (capturing)");
   }, true); // `true` enables capturing

  Bubbling phase 
  button.addEventListener("click",(){
    console.log("I am clicked")
  } )

 */

  

// Event  Delegation : Technique for listening events by delegation parent as a listener

/* 
EG:
 <div id="parent">
  <button id="click1">Click Me </button>
  <button id="click2">Click Me </button>

  </div>

  cont parent = document.getElementById("parent");
  cont button = document.getElementById("click");

   Capturing phase: parent listener (runs first)
   parent.addEventListener("click", function (event) {
   if(event.target.element ==="BUTTON"){
    console.log("Event delegation: Clicked from parent to that child");
    }
   });

  Bubbling phase 
  button.addEventListener("click",(){
    console.log("I am clicked")
  } )
 */
