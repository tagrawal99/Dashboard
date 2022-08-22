import React from 'react'
import './Dashboard.css'
import {UserData} from '../Data';
import {useState} from 'react';
import BarChart from '../components/BarChart';
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Dashboard({parsedData}) {
    var [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [userData, setUserData] = useState({

        labels: UserData.map((data) => data.year),
        datasets: [
          {
            label: "Users Gained",
             data: UserData.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
      const [pie, setPie] = useState(
        {

            labels: UserData.map((data) => data.year),
            datasets: [
              {
                label: "Users Gained",
                 data: UserData.map((data) => data.userGain),
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
              },
            ],
          }
      );

      const [items] = useState([
        {label: "Allies for Health + Wellbeing",value: "Allies for Health + Wellbeing"},
        {label: "Amarillo Habitat for Humanity",value: "Amarillo Habitat for Humanity"},
        {label: "Animal Shelter Demo",value: "Animal Shelter Demo"},
        {label: "Aurora Area Interfaith Food Pantry ",value: "Aurora Area Interfaith Food Pantry "},
        {label:"Boise Valley Habitat for Humanity",value:"Boise Valley Habitat for Humanity"},
        {label: "Civic Champs Michael Demo",value: "Civic Champs Michael Demo"},
        {label: "Comal County Habitat for Humanity",value: "Comal County Habitat for Humanity"},
        {label: "Dream Alive",value: "Dream Alive"},
        {label: "Dress For Success Pittsburgh",value: "Dress For Success Pittsburgh"},
        {label: "Food Pantry Demo",value: "Food Pantry Demo"},
        {label: "Footlite Musicals",value: "Footlite Musicals"},
        {label: "Genesis Prep",value: "Genesis Prep"},
        {label: "Georgetown Ministry Center",value: "Georgetown Ministry Center"},
        {label: "Greater Dalton Habitat for Humanity",value: "Greater Dalton Habitat for Humanity"},
        {label: "Greater Nashua Habitat for Humanity",value: "Greater Nashua Habitat for Humanity"},
        {label: "Habitat for Humanity - Bowling Green / Warren County",value: "Habitat for Humanity - Bowling Green / Warren County"},
        {label: "Habitat for Humanity Demo Account",value: "Habitat for Humanity Demo Account"},
        {label: "Habitat for Humanity Mid-Yellowstone Valley",value: "Habitat for Humanity Mid-Yellowstone Valley"},
        {label: "Habitat for Humanity of Greater Garland",value: "Habitat for Humanity of Greater Garland"},
        {label: "Habitat for Humanity of Henderson, KY",value: "Habitat for Humanity of Henderson, KY"},
        {label: "Habitat for Humanity of Jefferson County - Indiana",value: "Habitat for Humanity of Jefferson County - Indiana"},
        {label: "Habitat For Humanity Of Monroe County",value: "Habitat For Humanity Of Monroe County"},
        {label: "Habitat for Humanity of Morrison County",value: "Habitat for Humanity of Morrison County"},
        {label: "Habitat for Humanity of Sumner County",value: "Habitat for Humanity of Sumner County"},
        {label: "Habitat for Humanity of the San Juans",value: "Habitat for Humanity of the San Juans"},
        { label: "Humane Society of Harris County", value: "Humane Society of Harris County" }
      ]);

  
      function p(event) {
        const Bar = parsedData.filter((e) =>e.organization_name.includes(event.target.value) );
        console.log(Bar)
        var given_start_date = startDate.toISOString().slice(0,10)
          var given_end_date = endDate.toISOString().slice(0,10)
          var calculated_start_day = parseInt(given_start_date.split("-")[2])
          var calculated_start_month = parseInt(given_start_date.split("-")[1])
          var calculated_end_day = parseInt(given_end_date.split("-")[2])
          var calculated_end_month = parseInt(given_end_date.split("-")[1])
        var map = Bar.reduce(function(map, data) {
        var year = data.Year
          var month = data.month
          var day = data.day
          var total = +data.hours_volunteered
          if( month >=calculated_start_month && month <=calculated_end_month){
          map[month] = (map[month] || 0) + total
        //   map[day] = (map[day] || 0) + total
          }
          return map
        }, {})
        var array = Object.keys(map).map(function(month) {
            return {
              Month: month,
              totalHours: map[month]
            }
          })
        var pie_map = Bar.reduce(function (pie_map, data) {
            var month = data.month;
            var p = data.activity_source;
            if (month >= calculated_start_month && month <= calculated_end_month && pie_map[p]) {
                pie_map[p] = (pie_map[p] || 0) + 1;
                //   map[day] = (map[day] || 0) + total
            }
            else{
                pie_map[p] =1
            }
            return pie_map;
        }, {})
        console.log(pie_map)
        var array1 = Object.keys(pie_map).map(function(ac) {
            return {
              activity: ac,
              count: pie_map[ac]
            }
          })
          setUserData({
      
            labels: array.map((data) => data.Month),
            datasets: [
              {
                label: "Total Volunteer hours",
                 data: array.map((data) => data.totalHours),
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
              },
            ],
          })
          setPie({
      
            labels: array1.map((data) => data.activity),
            datasets: [
              {
                label: "Total Activity",
                 data: array1.map((data) => data.count),
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
              },
            ],
          })
        }
        

  return (
    <div>
         <div id="wrapper">
            <h3>PLEASE SELECT THE RANGE FOR THE STATISTICS</h3>
         <div id="first">      
     <DatePicker
       selected={startDate}
       selectsStart
       startDate={startDate}
       endDate={endDate}
       onChange={date => setStartDate(date)}
     />
     </div>
     <div id="second">
     <DatePicker
       selected={endDate}
       selectsEnd
       startDate={startDate}
       endDate={endDate}
       minDate={startDate}
       onChange={date => setEndDate(date)}
     />
     </div>
   </div>
   <br></br>
   <h3>PLEASE SELECT THE ORGANIZATION</h3>
    <select onChange={p}>
        {items.map(item => (
        <option
          key={item.value}
          value={item.value}
        >
          {item.label}
        </option>
      ))}
    </select>
     <div style = {{ paddingTop : 40}}>
      <div className='container'>
          <div style={{ width: 500 }}>
            <BarChart chartData={userData} />
          </div>
          <br></br>
          <br></br>
          <div style={{ width: 500 }}>
            <LineChart chartData={userData} />
          </div>
      </div>
      <br></br>
      <br></br>
      <div style={{ width: 400 }}>
        <PieChart chartData={pie} />
      </div>
        
    </div>
    </div>   
  )
}

export default Dashboard;