import { faPassport } from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";


export default function Menu(props) {

  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);

  const showInventory = (event) => {
    history.push("/inventory");
  }

//   useEffect(() => {
//     if(showMenu){
//       document.addEventListener('click', closeMenu);
//     }
//     else{
//       document.addEventListener('click', closeMenu);
//       console.log("Else");
//     }
    
//  }, [showMenu]);

  const displayMenu = (event) => {
    if(showMenu === true){
      setShowMenu(false);
    }
    else{
      setShowMenu(true);
    }
  }

  // const closeMenu = (event) => {
  //   setShowMenu(false);
  //   document.removeEventListener('click', closeMenu);
  // }  
  
  return (
    <span>
      <div>
        <button onClick={() => { displayMenu() }} className="btn btn-primary">
          {props.doc_name}
        </button>

        {
          showMenu
            ? (
              <div className="menu" style={{ border: "1px solid", backgroundColor: "white", zIndex: 10, position: "absolute", boxShadow: "5px 10px #c4c4c4" }}>
                <div style={{ margin: "7px" }}><button className="btn btn-outline-primary" onClick={() => { showInventory() }}> Inventory Management </button></div>
                <div style={{ margin: "7px" }}><button className="btn btn-outline-primary"> Registration Requests </button></div>
                <div style={{ margin: "7px" }}><button className="btn btn-outline-primary"> Admin Function</button></div>
              </div>
            )
            : (
              null
            )
        }
      </div>
    </span>
  );
}
