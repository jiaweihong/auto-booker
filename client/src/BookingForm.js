import React, { useState, useEffect } from 'react'
import CryptoJs from 'crypto-js';
import DateTimePicker from 'react-datetime-picker';
import './App.css'

const BookingForm = ({getPendingBookings, alertArr, setAlertArr}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [sportsCentre, setSportsCentre] = useState('David Ross');
    const [activity, setActivity] = useState('Volleyball - Hall C/D')
    const [dateTime, setDateTime] = useState(new Date());

    let davidRossActivities = ["Volleyball - Hall C/D", "Basketball 1/2 Court - Hall C/D", "Basketball 1/2 Court - Hall A/B", "Basketball Cross Court - Hall C/D (Near)", "Basketball Full Court - Hall C/D", "Basketball Full Court - Hall A/B", "Basketball Cross Court - Hall C/D (Far)"];
    let jubileeCampusActivities = ["Volleyball - Hall 1", "Basketball 1/2 Court - Hall 2", "Basketball 1/2 Court - Hall 1", "Basketball Full Court - Hall 1", "Basketball Full Court - Hall 2"];
    let dropdownActivies = null;
    let activityOptions = null;

    if (sportsCentre === "David Ross"){
        dropdownActivies = davidRossActivities;
    } else if (sportsCentre === "Jubilee Campus") {
        dropdownActivies = jubileeCampusActivities;
    }

    if (dropdownActivies != null){
        activityOptions = dropdownActivies.map((activity) => <option key={activity} value={activity}> {activity} </option>);
    }

    const setActivityStateTo1stInList = async () => {
        if (sportsCentre === "Jubilee Campus") {
            setActivity(jubileeCampusActivities[0]);
        } else if (sportsCentre === "David Ross") {
            setActivity(davidRossActivities[0]);
        }
    }

    const encryptPassword = (password) => {
        console.log(password);
        var ciphertext = CryptoJs.AES.encrypt(password, process.env.REACT_APP_ENCRYPTION_SECRET);
        console.log("after");

        let encryptedPassword = ciphertext.toString();
        return encryptedPassword; 
    }

    const updateAlertArr = (status) => { 
        let alert = '';
        
        if (status === 200) {
            alert = (<div className="alert alert-success" role="alert">
                Booking has been succesfully submitted
            </div>)
        } else {
            alert = (<div className="alert alert-danger" role="alert">
                Booking failed to submit. Please try again
            </div>)
        }
        
        setAlertArr(
            () => [...alertArr, alert]
        )

        setTimeout(removeRecentlyAddedAlert, 5000)
    }

    const removeRecentlyAddedAlert = () => {
        let alertDivArr = document.querySelectorAll('div.alert');
        let index = alertDivArr.length-1;

        alertDivArr[index].remove();
    }

    const submitForm = async (e) => {
        e.preventDefault();
 
        let encryptedPassword = encryptPassword(password);
        try {
            const body = {
                username: username,
                password: encryptedPassword,
                sportsCentre: sportsCentre,
                activity: activity,
                activityDay: dateTime.getDate(),
                activityMonth: dateTime.getMonth() + 1,
                activityYear: dateTime.getFullYear(),
                activityHour: dateTime.getHours()
            }

            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            getPendingBookings();

            updateAlertArr(res.status)
        } catch (error) {
            console.error(error);
        }
    }

    const getMinDate = () => {
        let minDate = new Date();
        minDate.setDate(minDate.getDate());

        return minDate;
    }

    useEffect(() => {
        setActivityStateTo1stInList();
    }, [sportsCentre])
    

  return (
    <div className='container mt-5'>
        <h3 className='text-center'>Submit booking form</h3>

        <form onSubmit={submitForm}>
            <div className="row">
                <div className="col-lg">
                    <div className="input-group">
                        <div className="input-group-text">Username</div>
                    
                        <input 
                            required 
                            placeholder='Not email' 
                            type='text' 
                            value={username} 
                            onChange={(e) => {setUsername(e.target.value)}}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="col-lg">
                    <div className="input-group">
                        <div className="input-group-text">Password</div>
                        <input 
                            required
                            type='text'
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            className="form-control"
                        >
                        </input>
                    </div>
                </div>
            </div>


            <div className="row mt-2">
                <div className="col-lg">
                    <div className="input-group">
                        <div className="input-group-text">Sport Centre</div>
                        <select
                            value={sportsCentre}
                            onChange={(e) => {setSportsCentre(e.target.value)}}
                            className="form-select"
                        >
                            <option value="David Ross">David Ross</option>
                            <option value="Jubilee Campus">Jubilee Campus</option>
                        </select>
                    </div>
                </div>

                <div className="col-lg">
                    <div className="input-group">
                        <div className="input-group-text">Activity</div>
                        <select
                            value={activity}
                            onChange={(e) => {setActivity(e.target.value)}}
                            className="form-select"
                        >
                            {activityOptions}
                        </select>
                    </div>
                </div>

                <div className="col-lg">
                    <div className="input-group">
                        <div className="input-group-text">Date</div>
                        <DateTimePicker 
                            onChange={setDateTime} 
                            value={dateTime} 
                            disableClock={true} 
                            clearIcon={null}
                            minDate={getMinDate()}
                        />
                    </div>
                </div>

                <div className="col-lg">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>

            </div>
        </form>

        {
            alertArr.map((alert) => {
                return (alert);
            })
        }
    </div>
  )
}

export default BookingForm;
