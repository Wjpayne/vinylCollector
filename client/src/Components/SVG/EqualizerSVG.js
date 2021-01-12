import Style from "./stylesvg.css"



const SVG = ({



  style = {Style}, id= "equalizer", width ="90px", height="250px", viewBox="0 0 10 7" }) => (

 <svg
 id = {id}
 style = {style}
 width = {width}
 height = {height}
 viewBox = {viewBox}
 xmlns = "http://www.w3.org/2000/svg"
 xmlnsXlink = "http://www.w3.org/1999/xlink"
 fill = "#FFFFFF"
 >


   <rect id="bar1" transform="translate(0.500000, 6.000000) rotate(180.000000) translate(-0.500000, -6.000000) " x="0" y="5" width="1" height="2px"></rect>
   <rect id="bar2" transform="translate(3.500000, 4.500000) rotate(180.000000) translate(-3.500000, -4.500000) " x="3" y="2" width="1" height="5"></rect>
   <rect id="bar3" transform="translate(6.500000, 3.500000) rotate(180.000000) translate(-6.500000, -3.500000) " x="6" y="0" width="1" height="7"></rect>
   <rect id="bar4" transform="translate(9.500000, 5.000000) rotate(180.000000) translate(-9.500000, -5.000000) " x="9" y="3" width="1" height="4"></rect>
  
   
 </svg>
  )



  
 
 


export default SVG