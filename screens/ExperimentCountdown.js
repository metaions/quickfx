import React from 'react';
import { View, Text } from 'react-native'
import CountdownTimer from '../component/CountdownTimer';
export default function ExperimentCountdown() {


    const thisDate = new Date().toString()
    const thisDateW = new Date()
    console.log(thisDate);

    let otherDateReal = thisDateW//.toString()
    let otherDate = thisDate.split(' ')
    if (parseInt(otherDate[4].split(':')[0]) >= 17)//&& parseInt(otherDate[4].split(':')[1])>30)
    {
        if (parseInt(otherDate[4].split(':')[1]) >= 30 && parseInt(otherDate[4].split(':')[0]) == 17) {

            var numberOfDaysToAdd = 1;
            console.log('otherdatareal: '+otherDateReal);
            var result = new Date(otherDateReal.setDate(otherDateReal.getDate() + numberOfDaysToAdd));
            console.log('its in 20 :'+result);
            otherDate = result.toString().split(' ')

            otherDate[4] = "05:30:00"
        }
        else if (parseInt(otherDate[4].split(':')[1]) < 30 && parseInt(otherDate[4].split(':')[0]) == 17) {
            //no need for timer at this level
        }
        else {
            var numberOfDaysToAdd = 1;
            var result = otherDateReal.setDate(otherDateReal.getDate() + numberOfDaysToAdd);
            otherDate = result.split(' ')
            otherDate[4] = "05:30:00"
        }
    }
    else if(parseInt(otherDate[4].split(':')[0]) >=0 && parseInt(otherDate[4].split(':')[0]) <=5 ){
        if(parseInt(otherDate[4].split(':')[1]) >=30 && parseInt(otherDate[4].split(':')[0]) ==5){
            //dont do anything
        }
        else{

            // otherDate = result.split(' ')
                otherDate[4] = "05:30:00"
        }
    }
    else{
        //should not show timers
    }
    const fullOtherDate = otherDate.toString().replace(/,/ig, ' ')
    console.log('fullotherdate '+fullOtherDate);
    let DiffDate = (new Date(fullOtherDate) - new Date(thisDate))
    console.log(new Date(fullOtherDate)+'    '+new Date(thisDate));
    console.log(DiffDate);

    const NOW_IN_MS2 = new Date().getTime();

    const dateTimeAfter = NOW_IN_MS2 + DiffDate;
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            {/* <Text style={{}}>{NOW_IN_MS1}</Text>
          */}
            <CountdownTimer targetDate={dateTimeAfter} />
        </View>
    )
}
//     var someDate = new Date();
// var numberOfDaysToAdd = 1;
// var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
// console.log(new Date(result).toString())

    // const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];


// else if()

// .map(it=>{
    //     return(
//         console.log(it)
//     )
// })

//thisDate.split(' ',3)