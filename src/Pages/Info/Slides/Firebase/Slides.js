import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ref, uploadBytes } from 'firebase/storage';
import React, { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { toast } from 'react-toastify';
import NLoading from '../../../../components/shared/Loading/NLoading';
import { storage } from '../../../../firebase.init';
import useDBUser from '../../../../hooks/useDBUser';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Slides = () => {
	pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
	const [userData, loadingData] = useDBUser();

	const [slideCheck, setSlideCheck] = useState({});
	const [courseCheck, setCourseCheck] = useState({});
	const [loading, setLoading] = useState({
		// loadingData: true
	});
	const [semesters, setSemesters] = useState([
		{
			semester: 'fall-2022',
			course: [
				{
					courseName: 'OOP',
					slides: [
						'https://firebasestorage.googleapis.com/v0/b/section-n-diu.appspot.com/o/slides%2FFall_2022%2FDiscrete_Math%2FLecture%201.pdf?alt=media&token=1a079832-1c92-46ec-9253-e1d73f842264',
						'https://firebasestorage.googleapis.com/v0/b/section-n-diu.appspot.com/o/slides%2FFall_2022%2FDiscrete_Math%2FLecture%201.pdf?alt=media&token=1a079832-1c92-46ec-9253-e1d73f842264',
						'https://firebasestorage.googleapis.com/v0/b/section-n-diu.appspot.com/o/slides%2FFall_2022%2FDiscrete_Math%2FLecture%201.pdf?alt=media&token=1a079832-1c92-46ec-9253-e1d73f842264',
					],
				},
				{
					courseName: 'Discrete math',
					slides: [
						'https://firebasestorage.googleapis.com/v0/b/section-n-diu.appspot.com/o/slides%2FFall_2022%2FDiscrete_Math%2FLecture%201.pdf?alt=media&token=1a079832-1c92-46ec-9253-e1d73f842264',
						'https://firebasestorage.googleapis.com/v0/b/section-n-diu.appspot.com/o/slides%2FFall_2022%2FDiscrete_Math%2FLecture%201.pdf?alt=media&token=1a079832-1c92-46ec-9253-e1d73f842264',
						'https://firebasestorage.googleapis.com/v0/b/section-n-diu.appspot.com/o/slides%2FFall_2022%2FDiscrete_Math%2FLecture%201.pdf?alt=media&token=1a079832-1c92-46ec-9253-e1d73f842264',
					],
				},
			],
		},
		{
			semester: 'Spring-2023',
			course: [
				{
					courseName: 'OOP',
					slides: [
						'https://firebasestorage.googleapis.com/v0/b/section-n-diu.appspot.com/o/slides%2FFall_2022%2FDiscrete_Math%2FLecture%201.pdf?alt=media&token=1a079832-1c92-46ec-9253-e1d73f842264',
						'https://firebasestorage.googleapis.com/v0/b/section-n-diu.appspot.com/o/slides%2FFall_2022%2FDiscrete_Math%2FLecture%201.pdf?alt=media&token=1a079832-1c92-46ec-9253-e1d73f842264',
						'https://firebasestorage.googleapis.com/v0/b/section-n-diu.appspot.com/o/slides%2FFall_2022%2FDiscrete_Math%2FLecture%201.pdf?alt=media&token=1a079832-1c92-46ec-9253-e1d73f842264',
					],
				},
				{
					courseName: 'Discrete math',
					slides: [
						'https://firebasestorage.googleapis.com/v0/b/section-n-diu.appspot.com/o/slides%2FFall_2022%2FProblem_Solving_Theory%2FL2.1_Tokens%2C%20Expression%20Evaluation.pptx?alt=media&token=1efa3f87-5214-4571-8505-2e041b4bc4e2',
						'https://firebasestorage.googleapis.com/v0/b/section-n-diu.appspot.com/o/slides%2FFall_2022%2FProblem_Solving_Theory%2FL2.1_Tokens%2C%20Expression%20Evaluation.pptx?alt=media&token=1efa3f87-5214-4571-8505-2e041b4bc4e2',
						'https://firebasestorage.googleapis.com/v0/b/section-n-diu.appspot.com/o/slides%2FFall_2022%2FProblem_Solving_Theory%2FL2.1_Tokens%2C%20Expression%20Evaluation.pptx?alt=media&token=1efa3f87-5214-4571-8505-2e041b4bc4e2',
					],
				},
			],
		},
	]);

	const inputRef = useRef([]);
	const content = useRef();

	const handleUpload = (e, semester, course) => {
		const inputFile = e.target.files[0];

		if (inputFile) {
			setLoading({ ...loading, course: course });
			const fileRef = ref(storage, `slides/${semester}/${course}/${inputFile.name}`);
			uploadBytes(fileRef, inputFile)
				.then(() => {
					setLoading({ ...loading, course: '' });
					toast.success('Uploaded Successfully');
				})
				.catch((err) => {
					console.log(err);
					setLoading({ ...loading, course: '' });
					toast.error('Something went wrong');
				});
		}
	};

	/* useEffect(() => {
        const newSlides = [...semesters];

        listAll(ref(storage, `slides/`))
            .then((res) => {
                res?.prefixes?.forEach((prefix, semIndex) => {
                    newSlides.push({ semester: prefix._location.path_.split('/')[1], course: [] })


                    listAll(ref(storage, prefix._location.path_))
                        .then(res2 => {
                            res2.prefixes?.forEach((prefix2, courseIndex) => {
                                newSlides[semIndex]?.course.push({ courseName: prefix2._location?.path_?.split('/')[2], slides: [] });

                                listAll(ref(storage, prefix2._location?.path_))
                                    .then(res3 => {
                                        if (res3.items.length > 0) {
                                            res3.items?.forEach(item => {
                                                getDownloadURL(item)
                                                    .then(url => {
                                                        newSlides[semIndex].course[courseIndex].slides.push(url);

                                                        setLoading({ ...loading, loadingData: false });

                                                        setSemesters(newSlides);
                                                    })
                                            })
                                        }
                                        else {
                                            setSemesters(newSlides);
                                            setLoading({ ...loading, loadingData: false })
                                        }

                                    })
                            })
                        })
                        .catch()
                })
            })
            .catch(err => {
                console.log(err)
                if (err.message.includes("Quota for bucket")) content.current = <h2 style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>{err.message}</h2>;
                setLoading({ ...loading, loadingData: false })
            })
    }, []) */

	if (loading.loadingData) return <NLoading />;

	if (content.current) return content.current;

	return (
		<div className="pt-20 overflow-hidden">
			{semesters.map((semester, i) => (
				<div key={i} className="mt-5">
					<button onClick={() => setSlideCheck({ ...slideCheck, [`slide${i}`]: !slideCheck[`slide${i}`] })} className="border p-3 w-full btn btn-outline btn-primary capitalize">
						{semester.semester}
						<FontAwesomeIcon icon={faAngleDown} className={`transition-all ${slideCheck?.[`slide${i}`] && 'rotate-180'} ml-5 `} />
					</button>

					<input type="checkbox" checked={slideCheck?.[`slide${i}`] || false} onChange={(e) => setSlideCheck({ ...slideCheck, [`slide${i}`]: e.target.checked })} className="hidden" />

					<div className={`py-2 px-4 bg-base-300 border border-t-0 border-primary ${slideCheck?.[`slide${i}`] || 'hidden'}`}>
						{semester.course.map((course, ci) => (
							<div key={ci} className={`transition-all flex flex-col justify-center items-center my-2`}>
								<div className="w-full">
									<button onClick={() => setCourseCheck({ ...courseCheck, [`slide${ci}`]: !courseCheck[`slide${ci}`] })} className="border p-3 w-full btn btn-outline capitalize">
										{course.courseName}
										<FontAwesomeIcon icon={faAngleDown} className={`transition-all ${courseCheck?.[`slide${ci}`] && 'rotate-180'} ml-5 `} />
									</button>

									<input type="checkbox" checked={courseCheck?.[`slide${ci}`] || false} onChange={(e) => setCourseCheck({ ...courseCheck, [`slide${ci}`]: e.target.checked })} className="hidden" />

									<div className={`${courseCheck?.[`slide${ci}`] || 'hidden'} flex flex-col justify-center items-center w-full bg-base-300 p-5`}>
										<div className="grid grid-cols-2 md:grid-cols-4 gap-5">
											{course.slides.length === 0 && <span>No Slide Uploaded</span>}
											{course.slides?.map((slide, slideI) => (
												<div key={slideI} className="">
													{/* <embed className='embed' src={slide} type="" /> */}
													{slide.toLowerCase().includes('pdf') ? (
														<Document file={slide}>
															<Page pageNumber={1} />
														</Document>
													) : (
														<iframe src="https://docs.google.com/presentation/d/1Bs3SxYjgNqq-40jVy1_01uMJJqA4KEoT/edit#slide=id.p1" width="100%" className="react-pdf__Page__canvas" title="fds">
															This is an embedded document, powered by
														</iframe>
													)}
													{/* <Document file={slide} >
                                                                    <Page pageNumber={1} />

                                                                </Document> */}
													<li key={slideI}>
														<a href={slide} className="link">
															{
																// (slide.split("%2F")[3].split("?")[0]).replace("%20", " ")
																'Download Slide'
															}
														</a>
													</li>
												</div>
											))}
										</div>

										<input onChange={(e) => handleUpload(e, semester.semester, course.courseName)} ref={(el) => (inputRef.current[ci] = el)} type="file" className="hidden" />

										{loadingData ? (
											<span className="btn btn-primary mt-7 loading capitalize">Loading User Data</span>
										) : (
											<>
												{userData?.verification === 'verified' && (
													<>
														{loading.course === course.courseName ? (
															<span className="btn btn-primary mt-7 loading capitalize">Uploading</span>
														) : (
															<button onClick={() => inputRef.current[ci].click()} className={`btn btn-primary mt-7 capitalize `}>
																Upload Slide
															</button>
														)}
													</>
												)}
											</>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default Slides;
