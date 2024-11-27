
// export default Duration;
import React from 'react';
import moment from 'moment';

const Duration = ({ data, tableNameProp, writeAccess, setStatusUpdate }) => {

    let startTime = data.original.start_time;
    let endTime1 = data.original.end_time;

    let startMoment = moment(startTime, 'HH:mm:ss');
    let endMoment = moment(endTime1, 'HH:mm:ss');

    let duration = moment.duration(endMoment.diff(startMoment));

    let hours = Math.floor(duration.asHours());
    let minutes = duration.minutes();

    let Duration

    if (hours === 0) {
        Duration = `${minutes} minutes`
    }
    else if (hours >= 1 && minutes === 0) {
        Duration = `${hours} hour`
    }
    else {
        Duration = `${hours} hour,${minutes} minutes`
    }

    return (
        <div>
            {Duration}
        </div>

    );
};

export default Duration;


