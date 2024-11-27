import React, { useEffect, useState } from "react";
import { handleSubmit } from "../../views/pages/examPaper/examsubmit";
import { commonDispatch } from "../../dispatch";
import { useSelector } from "react-redux";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { userExamEnrollApi } from "../../api/exam";

const useExamTime = () => {
    const navigate=useNavigate();
    const [examduration, setExamDuration] = useState("")

    const { setUserExamData ,showNotification,setUserTodayExamData} = commonDispatch()
  

    const userData = useSelector((state) => state?.user);
    const userTodayExamData = userData?.userTodayExamData
  
    useEffect(() => {

        var currentTime = moment().format("HH:mm:ss");

        let endTime;

        if (userData?.userExamData) {
            if (userData?.userExamData.length > 0) {
                endTime = userData?.userExamData[0]?.end_time;
            }
        }

        let seconds
        if (endTime) {
            var ary1 = currentTime.split(':'), ary2 = endTime.split(':');
            var minsdiff = parseInt(ary2[0], 10) * 60 + parseInt(ary2[1], 10) - parseInt(ary1[0], 10) * 60 - parseInt(ary1[1], 10);
            seconds = minsdiff * 60
            setExamDuration(seconds)
        }

    }, [userData]);

    // useEffect for count intervalt time 
    useEffect(() => {


        const interval = setInterval(() => {
            if (examduration > 0) {
                setExamDuration(examduration - 1);
            }
            if (examduration === 0) {
                handleSubmit(userTodayExamData, userExamEnrollApi, showNotification,setUserTodayExamData,"completeTime",navigate)
                setUserExamData({})
                clearInterval(interval);
            }


        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [examduration]);
    return [examduration];
};

export default useExamTime