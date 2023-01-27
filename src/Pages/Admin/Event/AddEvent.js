import React, { useState } from 'react';
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'
import { toast } from 'react-toastify';

const today = new Date();

const AddEvent = () => {
    const [type, setType] = useState('single');
    const [name, setName] = useState('');
    const [guest, setGuest] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState();
    let formattedTime = '';
    let expires = '';
    const [timeAmountState, settimeAmountState] = useState(0);
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);


    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();



    // single day event
    const [selected, setSelected] = useState('');

    let singleFooter = <p>Please pick a day.</p>;
    if (selected) {
        singleFooter = <p>{format(selected, 'PP')}</p>;
    }

    useEffect(() => {
        if (selected) {
            setDate(format(selected, 'PP'));
        }
    }, [selected]);


    // multiple day Event
    const [days, setDays] = useState([]);

    let multipleFooter = <p>Please pick one or more days.</p>;


    if (days?.length > 0) {
        multipleFooter = <p>{days.map((day, i) => {
            if (i === (days.length - 1)) {
                return <span key={i}>{format(day, 'PP')}.</span>
            } else
                return <span key={i}>{format(day, 'PP')}, </span>
        })}
        </p>

    }


    // range day event
    const defaultSelected = {
        from: today,
        to: addDays(today, 2)
    };
    const [range, setRange] = useState();

    let rangeFooter = <p>Please pick a starting and an ending day.</p>;
    if (range?.from) {
        if (!range.to) {
            rangeFooter = <p>{format(range.from, 'PP')}</p>;
        } else if (range.to) {
            rangeFooter = (
                <p>
                    {format(range.from, 'PP')} to {format(range.to, 'PP')}
                </p>
            );
        }
    }

    const formatTime = (e, timeState) => {
        let timeAmount = 0;
        const time = e.target.value;
        const timeArr = time.split(":");
        let hours = parseInt(timeArr[0]);
        let meridian = 'AM';
        if (hours >= 12) {
            meridian = "PM";
            hours = (hours - 12).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
        }
        else if (hours < 12) {
            meridian = 'AM';
            if (hours === 0) {
                hours = 12;
            }
        } else {
            meridian = 'PM';
        }
        formattedTime = `${hours}:${timeArr[1]} ${meridian}`;

        if (timeState === "startTime") {
            setStartTime(formattedTime);
        }
        if (timeState === "endTime") setEndTime(formattedTime);

        if (endTime) {
            const endtTimeArr = endTime.split(":");
            timeAmount = (parseInt(endtTimeArr[0]) * 3.6e6) + (parseInt(endtTimeArr[1]) * 6e4);
            settimeAmountState(timeAmount);
        }
        else {
            const startTimeArr = startTime.split(":");
            timeAmount = (parseInt(startTimeArr[0]) * 3.6e6) + (parseInt(startTimeArr[1]) * 6e4);
            settimeAmountState(timeAmount);
        }

    }

    const onSubmit = async (data) => {
        let eventDate = '';
        if (type === "single") {
            if (date) {
                eventDate = date;
                const exdate = new Date(date);
                exdate.setTime(timeAmountState + exdate.getTime());
                expires = exdate;
            }
            else {
                toast.error("Please Select a Date")
            }
        }
        else if (type === "range") {
            if (!range?.from) {
                toast.error("Please Select a starting date");
            }
            else if (!range?.to) {
                toast.error("Please Select an Ending Date");
            }
            else {
                eventDate = `${format(range.from, 'PP')} to ${format(range.to, 'PP')}`;
                const dateTemp = (range?.to) ? (format(range.to, 'PP')) : (format(range.from, 'PP'));
                const exdate = new Date(dateTemp);
                exdate.setTime(timeAmountState + exdate.getTime());
                expires = exdate;
                console.log(exdate);
            }

        }
        else if (type === "multiple") {
            if (days.length > 0) {
                const ppDates = days.map(day => format(day, "PP"));
                eventDate = ppDates.toString().replace(/2022,/g, "2022, ");
                const dateTemp = (days[days.length - 1]);
                const exdate = new Date(dateTemp);
                exdate.setTime(timeAmountState + exdate.getTime());
                expires = exdate;
            }
            else {
                toast.error("Please select at least one date");
            }
        }

        const event = {
            name, date: eventDate, startTime, endTime, guest, expires
        }

        if (event?.name && event?.date && event?.startTime) {
            const confirm = window.confirm(`Confirm To Upload event ${event.name} on ${event.date} at ${event.time}`);

            if (confirm) {
                setLoading(true);
                await axios.post('https://section-n-server.vercel.app/events', event)
                    .then(res => {
                        if (res.data.insertedId) {
                            toast.success("Posted Event");
                            reset();
                        }
                        else {
                            toast.error("Failed To Post Event");
                        }
                        setLoading(false);
                    })
                    .catch(err => {
                        setLoading(false)
                        console.log(err)
                    });
            }

        }
    };

    return (
        <div className='w-full pb-10'>
            <div className='w-full mx-auto flex flex-col-reverse md:flex-row items-center justify-evenly mb-16'>
                {(type === "single") && (<div className='border w-fit'>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                    />
                </div>)}

                {type === "multiple" &&
                    <div className='border w-fit'>
                        < DayPicker
                            mode="multiple"
                            min={1}
                            selected={days}
                            onSelect={setDays}
                        /></div>}


                {type === "range" && <div className='border w-fit'>
                    <DayPicker
                        mode="range"
                        defaultMonth={today}
                        selected={range}
                        onSelect={setRange}
                    />
                </div>}
                <div className='text-center max-w-lg mb-20 md:my-0'>
                    <p className='font-bold text-2xl'>Event</p>
                    <p className='font-bold text-3xl my-3'>{name}</p>
                    <p className='text-2xl my-3'>
                        {type === 'single' && singleFooter}
                        {type === 'multiple' && multipleFooter}
                        {type === 'range' && rangeFooter}
                    </p>
                    <p className='text-2xl'>feat. <span className='font-bold'>{guest}</span></p>
                    <p className='text-2xl'>{startTime} {endTime && `to ${endTime}`}</p>
                </div>

            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="form-control flex-col items-center mx-6 lg:mx-0">
                <div className="input-group items-center">
                    <label htmlFor="type" >Select Event Type :</label>
                    <select name='type' value={type} onChange={(e) => setType(e.target.value)} className="select select-bordered ml-2">
                        <option value="single">Single Day Event</option>
                        <option value="multiple">Muliple Day Event</option>
                        <option value="range">Ranged Day Event</option>
                    </select>
                </div>

                <div className="form-control flex-row items-center mt-3 w-full">
                    <label className="whitespace-nowrap mr-2">Event name :</label>
                    <div className='w-full max-w-2xl flex flex-col items-center'>
                        <input type="text" placeholder="Type Event Name here" className="input input-bordered w-full" {...register('eventName', {
                            required: "Event Name is required",
                            onChange: (e) => setName(e.target.value)
                        })} />
                        {errors?.eventName && <small className='text-error text-left'>{errors?.eventName?.message}</small>}
                    </div>
                </div>

                <div className="form-control flex-row items-center mt-3 w-full">
                    <label className="whitespace-nowrap mr-2">Featured Guest :</label>
                    <div className='w-full max-w-2xl flex flex-col items-center'>
                        <input type="text" placeholder="Type Guest Name here" className="input input-bordered w-full" {...register('guest', {
                            onChange: (e) => setGuest(e.target.value)
                        })} />
                    </div>
                </div>

                <div className="form-control flex-row items-center mt-3 w-full">
                    <label className="whitespace-nowrap mr-2">Starting Time :</label>
                    <div className='w-full max-w-xs flex flex-col items-center'>
                        <input type="time" className="input input-bordered w-full cursor-pointer" {...register("eventTime", {
                            required: "Event Time is required",
                            onChange: (e) => formatTime(e, "startTime")
                        })} />
                        {errors?.eventTime && <small className='text-error text-left'>{errors?.eventTime?.message}</small>}
                    </div>
                </div>

                <div className="form-control flex-row items-center mt-3 w-full">
                    <label className="whitespace-nowrap mr-2">Ending Time :</label>
                    <div className='w-full max-w-xs flex flex-col items-center'>
                        <input type="time" className="input input-bordered w-full cursor-pointer" {...register("endtTime", {
                            onChange: (e) => formatTime(e, "endTime")
                        })} />
                    </div>
                </div>

                {
                    loading
                        ? <button className="btn btn-primary w-full max-w-2xl mt-16 text-center normal-case loading">loading</button>
                        : <input className='btn btn-primary w-full max-w-2xl mt-16 text-center' type="submit" />
                }

            </form>
        </div >
    );
};

export default AddEvent;