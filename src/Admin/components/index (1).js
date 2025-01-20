import React from 'react'
import ReactDom from 'react-dom/client';
//import and Export  curly braces mustin should use
import A from './App'

const root=ReactDom.createRoot(document.getElementById('root'));


root.render(
  <A/>
);

// function Menu(){
//   console.log(person);



//   return(<header>
//     <ul>
//       <li>home</li>
//       <li>About</li>
//       <li>contact</li>
//     </ul>
//   </header>)
// }
// root.render(<Menu/>);

// export default Menu



//function component


// function Header(){

//   let menus=['Home','About us','Contact Us']
//   return (
//     <header>
//     <ul>
//        <li>{menus[0]}</li>
//        <li>About</li>
//     </ul>
//     </header>

//   )
// }
// root.render(<Header/>);



// class component

// class Menu extends React.Component{
//   render(){
//     let menus=['Home','About us','Contact Us'];
//     return(
//       <header>
//            <ul>
//               <li>{menus[0]}</li>
            
//            </ul>
//           </header>

//     )
//   }
// }

// root.render(<Menu/>)

