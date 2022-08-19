import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { storage } from '../../firebase.init';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { toast } from "react-toastify"
import { useEffect } from 'react';
import NLoading from '../Shared/NLoading'

const Slides = () => {
    const [slideCheck, setSlideCheck] = useState({});
    const [courseCheck, setCourseCheck] = useState({});
    const [loading, setLoading] = useState({
        loadingData: true
    });
    const [slides, setSlides] = useState([]);
    console.log(slides)
    console.log(loading)


    const inputRef = useRef([]);

    const handleUpload = (e, semester, course) => {
        const inputFile = e.target.files[0];

        if (inputFile) {
            setLoading({ ...loading, course: course });
            const fileRef = ref(storage, `slides/${semester}/${course}/${inputFile.name}`);
            uploadBytes(fileRef, inputFile)
                .then(() => {
                    setLoading({ ...loading, course: '' })
                    toast.success("Uploaded Successfully");
                })
                .catch(err => {
                    console.log(err);
                    toast.error("Something went wrong");
                })

        }
    }

    useEffect(() => {
        const newSlides = [...slides];

        listAll(ref(storage, `slides/`))
            .then((res) => {
                res?.prefixes?.forEach((prefix, semIndex) => {
                    newSlides.push({ semester: prefix._location.path_.split('/')[1], course: [] })


                    listAll(ref(storage, prefix._location.path_))
                        .then(res2 => {
                            res2.prefixes?.forEach((prefix2, courseIndex) => {
                                newSlides[semIndex]?.course.push({ courseName: prefix2._location?.path_?.split('/')[2], slides: [] });
                                console.log(newSlides)

                                listAll(ref(storage, prefix2._location?.path_))
                                    .then(res3 => {
                                        if (res3.items.length > 0) {
                                            res3.items?.forEach(item => {
                                                getDownloadURL(item)
                                                    .then(url => {
                                                        newSlides[semIndex].course[courseIndex].slides.push(url);

                                                        setLoading({ ...loading, loadingData: false });

                                                        setSlides(newSlides);
                                                    })
                                            })
                                        }
                                        else {
                                            setSlides(newSlides);
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
                setLoading({ ...loading, loadingData: false })
            })
    }, [])

    if (loading.loadingData) return <NLoading />

    return (
        <div className='pt-20 overflow-hidden'>
            {
                slides.map((semDiv, i) => (
                    <div key={i} className='mt-5'>
                        <button
                            onClick={() => setSlideCheck({ ...slideCheck, [`slide${i}`]: !slideCheck[`slide${i}`] })}
                            className='border p-3 w-full btn btn-outline'>
                            {semDiv.semester}
                            <FontAwesomeIcon icon={faAngleDown} className={`transition-all ${slideCheck?.[`slide${i}`] && "rotate-180"} ml-5 `} />
                        </button>

                        <input type="checkbox"
                            checked={slideCheck?.[`slide${i}`] || false}
                            onChange={(e) => setSlideCheck({ ...slideCheck, [`slide${i}`]: e.target.checked })}
                            className="hidden" />

                        <div className={`p-3 bg-base-200 ${slideCheck?.[`slide${i}`] || "hidden"}`}>
                            {
                                semDiv.course.map((course, ci) => (
                                    <div key={ci} className={`transition-all  flex flex-col justify-center items-center my-6`}>

                                        <div className='w-full'>
                                            <button
                                                onClick={() => setCourseCheck({ ...courseCheck, [`slide${ci}`]: !courseCheck[`slide${ci}`] })}
                                                className='border p-3 w-full btn btn-outline'>
                                                {course.courseName}
                                                <FontAwesomeIcon icon={faAngleDown} className={`transition-all ${courseCheck?.[`slide${ci}`] && "rotate-180"} ml-5 `} />
                                            </button>

                                            <input type="checkbox"
                                                checked={courseCheck?.[`slide${ci}`] || false}
                                                onChange={(e) => setCourseCheck({ ...courseCheck, [`slide${ci}`]: e.target.checked })}
                                                className="hidden" />

                                            <div className={`${courseCheck?.[`slide${ci}`] || "hidden"} flex flex-col justify-center items-center w-full bg-base-300 p-5`}>

                                                <ol className='list-decimal'>

                                                    {
                                                        course.slides.length === 0 && <span>No Slide Uploaded</span>
                                                    }
                                                    {
                                                        course.slides?.map((slide, slideI) => (
                                                            <li key={slideI}>
                                                                <a href={slide} className='link'>{
                                                                    (slide.split("%2F")[3].split("?")[0]).replace("%20", " ")
                                                                }</a>
                                                            </li>
                                                        ))
                                                    }

                                                </ol>

                                                <input onChange={(e) => handleUpload(e, semDiv.semester, course.courseName)}
                                                    ref={el => inputRef.current[ci] = el} type="file" className='hidden' />

                                                {
                                                    loading.course === course.courseName
                                                        ? <span className='btn btn-primary mt-7 loading capitalize'>Uploading</span>
                                                        : <button onClick={() => inputRef.current[ci].click()} className={`btn btn-primary mt-7 capitalize `}>Upload Slide</button>
                                                }
                                            </div>


                                        </div>

                                    </div>
                                ))
                            }
                        </div>

                    </div>
                ))
            }
        </div>
    );
};

export default Slides;