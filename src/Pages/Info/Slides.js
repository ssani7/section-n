import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { storage } from '../../firebase.init';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { toast } from "react-toastify"
import { useEffect } from 'react';

const Slides = () => {
    const [slideCheck, setSlideCheck] = useState({});
    const [uploading, setUploading] = useState(false);
    const [slidess, setSlides] = useState([
        { course: "", slides: [] },
        { course: "", slides: [] }
    ]);

    const inputRef = useRef([]);

    const handleUpload = (e, name) => {
        const inputFile = e.target.files[0];
        if (inputFile) {
            setUploading(true);
            const fileRef = ref(storage, `slides/${name}/${inputFile.name}`);
            uploadBytes(fileRef, inputFile)
                .then(() => {
                    setUploading(false)
                    toast.success("Uploaded Successfully");
                })
                .catch(err => {
                    console.log(err);
                    toast.error("Something went wrong");
                })

        }
    }

    useEffect(() => {
        listAll(ref(storage, `slides/`))
            .then((res) => {
                res?.prefixes?.forEach((prefix, index) => {
                    const i = index;
                    const newList = [...slidess];
                    newList[index].course = prefix._location.path_.split("/")[1];
                    setSlides(newList);

                    listAll(ref(storage, prefix._location.path_))
                        .then(response => {
                            response?.items?.forEach((item) => {
                                getDownloadURL(item)
                                    .then(url => {
                                        console.log(item._location.path_.split('/')[2])
                                        const newList = [...slidess];
                                        newList[i].slides = [...newList[i].slides, url];
                                        setSlides(newList);
                                    })
                            })
                        })
                })
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='pt-20'>
            {
                slidess.map((slide, i) => (
                    <div key={i} className='mt-10'>
                        <button
                            onClick={() => setSlideCheck({ ...slideCheck, [`slide${i}`]: !slideCheck[`slide${i}`] })}
                            className='border p-3 w-full'>
                            Slides for {slide.course}
                            <FontAwesomeIcon icon={faAngleDown} className={`transition-all ${slideCheck?.[`slide${i}`] && "rotate-180"} ml-5 `} />
                        </button>

                        <input type="checkbox"
                            checked={slideCheck?.[`slide${i}`] || false}
                            onChange={(e) => setSlideCheck({ ...slideCheck, [`slide${i}`]: e.target.checked })}
                            className="hidden" />

                        <div className={`transition-all ${slideCheck?.[`slide${i}`] || "hidden"} p-6 flex flex-col justify-center items-center`}>
                            <ul>
                                {
                                    slide.slides?.map((s, i) => (
                                        <li key={i}><a href={s} className='link'>{
                                            (s.split("%2F")[2].split("?")[0]).replace("%20", " ")
                                        }</a></li>
                                    ))
                                }

                            </ul>

                            <input onChange={(e) => handleUpload(e, slide.course)}
                                ref={el => inputRef.current[i] = el} type="file" className='hidden' />

                            {
                                uploading
                                    ? <span className='btn btn-primary mt-7 loading capitalize'>Uploading</span>
                                    : <button onClick={() => inputRef.current[i].click()} className={`btn btn-primary mt-7 capitalize `}>Upload Slide</button>
                            }
                        </div>

                    </div>
                ))
            }
        </div>
    );
};

export default Slides;