import React, {Component} from 'react';
import axios from 'axios';

const Exercise = props => (
  
  <tr>
    <td>{props.ranking}</td>
    <td>{props.name}</td>
    <td>{props.duration}</td>
  </tr>
)

export default class Rank extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      exercises: []
      
    };
  }
  
  componentDidMount(){
    
    axios.get('http://localhost:5000/rank/')
      .then(response => {
        this.setState({
          exercises: response.data
        })
      
      })
      .catch((error) => {
        console.log(error);
      })
   
  }
  
  exerciseList() {

    let today_user = [];
       this.state.exercises.forEach(e => { 
       today_user.push(e.username);
      })
    
    const uniqueNames = today_user.filter((val,id,array) => array.indexOf(val) === id);
    var map = {};
    uniqueNames.forEach(e => {
      map[e] = 0;
    })
  
    this.state.exercises.forEach(ex => uniqueNames.forEach(name => { if(ex.username === name){ map[ex.username] += ex.duration; }}))
    
    var arr1 = Object.entries(map).sort((a,b)=>b[1]-a[1]);
    return arr1.map((name,i) => {
          
       return <Exercise key={i} name={name[0]} duration={name[1]} ranking={i+1} />

  })
 }
  render(){
    return(
      <div>
        <h3>Today's Ranking</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Ranking</th>
              <th>Username</th>
              <th>Total Time</th>
            
            </tr>
          </thead>
         <tbody>
           {this.exerciseList()}
         </tbody>
       </table>

      </div>
    )
  }
} 