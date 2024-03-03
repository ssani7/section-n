import React, { useCallback, useRef, useState } from 'react';
import { toPng } from 'html-to-image';

const timeStamps = [
	{
		start: '8:30',
		end: '9:45',
	},
	{
		start: '9:45',
		end: '11:00',
	},
	{
		start: '11:00',
		end: '12:15',
	},
	{
		start: '12:15',
		end: '1:30',
	},
	{
		start: '1:30',
		end: '2:45',
	},
	{
		start: '2:45',
		end: '4:00',
	},
	{
		start: '4:00',
		end: '5:15',
	},
	{
		start: '5:15',
		end: '6:30',
	},
];

const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const RoutineGenerate = () => {
	const ref = useRef(null);

	const onButtonClick = useCallback(() => {
		if (ref.current === null) {
			return;
		}

		toPng(ref.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement('a');
				link.download = 'my-image-name.png';
				link.href = dataUrl;
				link.click();
			})
			.catch((err) => {
				console.log(err);
			});
	}, [ref]);

	const [isEdit, setIsEdit] = useState(false);

	const [classData, setClassData] = useState({
		Saturday: [],
		Sunday: [],
		Monday: [],
		Tuesday: [],
		Wednesday: [],
		Thursday: [],
		Friday: [],
	});

	const handleInput = (e, day, index) => {
		const input = e.target.value;
		const field = e.target.name;

		const newClassData = { ...classData };

		const slotData = { ...newClassData[day][index], [field]: input };

		newClassData[day][index] = slotData;

		setClassData(newClassData);
	};

	return (
		<div className="w-full flex flex-col xl:items-center justify-center overflow-auto">
			<div ref={ref}>
				<div className={`grid grid-cols-9 grid-rows-6 line border border-black  ${isEdit && 'min-w-[840px] xl:min-w-full'}`}>
					<div className="routineHeader border-r border-b border-black">
						<p>Version 2.0</p>
					</div>
					{timeStamps.map((slot) => (
						<div key={slot.start} className="routineHeader border-b border-r border-black ">
							<p>{slot.start}</p>
							<p>-</p>
							<p>{slot.end}</p>
						</div>
					))}
					{daysOfWeek.map((day) => (
						<div key={day} className="routineHeader col-start-1 col-end-2 !py-4 border-b border-r border-black">
							{day}
						</div>
					))}
					{daysOfWeek.map((day, index) => (
						<div key={index} style={{ gridRowStart: index + 2 }} className={`col-start-2 col-end-10 border-b border-black last:border-b-0 grid grid-cols-8`}>
							{timeStamps.map((time, index) => (
								<div key={index} className="border-r border-b border-black last:border-r-0 p-1 text-sm bg-[#353f4c] flex flex-col justify-center items-center">
									{isEdit ? (
										<>
											<input
												onChange={(e) => handleInput(e, day, index)}
												defaultValue={classData[day][index]?.course}
												name="course"
												type="text"
												placeholder="Course Name"
												className="input input-ghost w-full max-w-xs text-[8px] xl:text-sm h-8 xl:h-10 "
											/>
											<input
												onChange={(e) => handleInput(e, day, index)}
												defaultValue={classData[day][index]?.room}
												name="room"
												type="text"
												placeholder="Room"
												className="input input-ghost w-full max-w-xs text-[8px] xl:text-sm h-8 xl:h-10"
											/>
											<input
												onChange={(e) => handleInput(e, day, index)}
												defaultValue={classData[day][index]?.teacher}
												name="teacher"
												type="text"
												placeholder="Course Teacher"
												className="input input-ghost w-full max-w-xs text-[8px] xl:text-sm h-8 xl:h-10"
											/>
										</>
									) : (
										<>
											<p className="text-center text-[6px] md:text-sm font-semibold xl:text-sm leading-relaxed">{classData[day][index]?.course}</p>
											<p className="text-center text-[6px] md:text-sm font-semibold xl:text-sm leading-relaxed">{classData[day][index]?.room}</p>
											<p className="text-center text-[6px] md:text-sm font-semibold xl:text-sm leading-relaxed">{classData[day][index]?.teacher}</p>
										</>
									)}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
			<button className="btn btn-primary mx-auto mt-5" onClick={() => setIsEdit(!isEdit)}>
				Switch
			</button>
			<button className="btn btn-primary mx-auto mt-5" onClick={onButtonClick}>
				Download Routine
			</button>
		</div>
	);
};

export default RoutineGenerate;
