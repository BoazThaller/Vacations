import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import FadeIn from 'react-fade-in';


export default function ChartTest() {
  const [ dataChart, setDataChart ] = useState ({});


useEffect(() => {
    const fetchData = async () => {
      let followers:any = [];
      let destination:any = [];
      await axios.get("http://localhost:3001/followedVacations/")
        .then ( response => {
          for ( let dataObj of response.data ) {
            destination.push(dataObj.destination);
            followers.push(parseInt(dataObj.followers));
            console.log(response)
          }
        }); 
      setDataChart({ 
        labels: destination, 
        datasets: [{ 
          label: 'Followers', 
          data: followers 
        }]
        
      });
    }
    
    fetchData();
},[]);
  

    return( 
      <div className='chartContainer'>
        <FadeIn delay={300} transitionDuration={600}>
          <h1>Followed Vacations</h1>
          <Bar data={ dataChart } /> 
        </FadeIn>
      </div>
    )
}

