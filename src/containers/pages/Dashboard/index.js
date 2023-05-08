import React, {Component} from 'react';

class Dashboard extends Component {
    render(){
        return(
            <div>
                <div>
                    <input placeholder='title'/>
                    <textarea placeholder='content'>

                    </textarea>
                    <button></button>
                </div>
                <button>Go to Register</button>
                <button>Go to Dashboard</button>
            </div>
        )
    }
}

export default Dashboard;