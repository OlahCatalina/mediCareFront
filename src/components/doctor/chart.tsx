import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
const moment = require("moment");

const AppointmentsChart = (props: { appointments: any[] }) => {

    const [appointments, setAppointments] = useState<any>([]);
    var getDaysArray = function (year: number, month: number) {
        var monthIndex = month - 1;
        var names = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        var date = new Date(year, monthIndex, 1);
        var result = [];
        while (date.getMonth() === monthIndex) {
            result.push(date.getDate() + '-' + names[date.getDay()]);
            date.setDate(date.getDate() + 1);
        }
        return result;
    }

    useEffect(() => {
        setAppointments(props.appointments);
    }, [props.appointments])


    const getDataSet = () => {
        let days: any = [];
        let appointmentsCount: any = [];
        let startDate = moment("2021-05-1");
        let endDate = moment().add(30, 'days');  
        for (let date = moment(startDate); date.diff(endDate) < 0; date.add(1, 'days')) {
            days.push(date.format('YYYY-MM-DD'));
        }
        days.forEach((day: any) => {
            let count = 0;
            appointments.forEach((app: any) => {
                if (app.date === day) {
                    count++;
                }
            });
            appointmentsCount.push(count);
        });
        return appointmentsCount;
    }

    const dates = getDaysArray(2021, 5);
    const data = {
        labels: dates,
        datasets: [
            {
                label: "Number of appointments",
                data: getDataSet(),
            }
        ]
    };

    const options = {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    displayFormats: {
                        'millisecond': 'MMM DD',
                        'second': 'MMM DD',
                        'minute': 'MMM DD',
                        'hour': 'MMM DD',
                        'day': 'MMM DD',
                        'week': 'MMM DD',
                        'month': 'MMM DD',
                        'quarter': 'MMM DD',
                        'year': 'MMM DD',
                    }
                }
            }],
            yAxes: [{
                 ticks: {
                    min: 0,
                    stepSize: 1,
                }
            }]

        },
    };
    return (
        <Bar
            style={{ "backgroundColor": "white" }}
            type="bar"
            data={data} options={options}
        />
    )
}

export default AppointmentsChart;