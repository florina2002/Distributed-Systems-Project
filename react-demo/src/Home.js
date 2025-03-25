// import React from "react";
// import './App.css';
// import { Component } from "react";  
// import 'bootstrap/dist/css/bootstrap.min.css';
// import UserTable from "./components/UserTable";
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer} from 'react-toastify';
// import SockJsClient from 'react-stomp';



// class Home extends Component {
  
//   state = {
//     isConnected: false,
//   };
//   handleConnect = () => {
//     console.log('connected');
//     this.setState({ isConnected: true });
//   };
//   handleDisconnect = () => {
//     console.log('disconnected');
//     this.setState({ isConnected: false });
//   };
//   handleOnMessage = (msg) => {
//     console.log(msg);
//   };

//   render() {
//     return (
//       <div >
//       <ToastContainer autoClose={3000} />
//         <div className="App" >

//         {/*<SockJsClient
//             url='http://localhost:8083/ws'
//             topics={this.state.isConnected ? ['/topic/messages'] : []} 
//             onMessage={this.handleOnMessage} 
//             onConnect={this.handleConnect} 
//             onDisconnect={this.handleDisconnect} 
//             debug={false} 
//           />*/}

//           <div className='user-table' >
//             <UserTable />
//           </div> 

//         </div>
//       </div>
//     );
//   }
// }

// export default Home;



import React from "react";
import './App.css';
import { Component } from "react";  
import 'bootstrap/dist/css/bootstrap.min.css';
import UserTable from "./components/UserTable";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
class Home extends Component {

  render() {
    return (
      <div >
      <div >
      <ToastContainer autoClose={3000} />
        <div className="App" >
          <div className='user-table' >
            <UserTable />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Home;
