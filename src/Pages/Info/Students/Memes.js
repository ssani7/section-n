import { faComment, faImage, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import ReactPlayer from 'react-player'
import haha from '../../../images/icons/laughing.png'
import like from '../../../images/icons/like.png'
import sad from '../../../images/icons/sad.png'
import angry from '../../../images/icons/angry.png'
import love from '../../../images/icons/heart.png'
import dislike from '../../../images/icons/dislike.png'
import noReact from '../../../images/icons/laughing.png'
import { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { InView } from 'react-intersection-observer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import auth from '../../../firebase.init';
import { ghostInput } from '../../User/Settiings/EditPortfolio';
import Footer from '../../Shared/Footer';
import NLoading from '../../Shared/Loading/NLoading';


const Memes = () => {
    const [caption, setCaption] = useState("");
    const [media, setMedia] = useState({});
    const [loadingData, setLoadingData] = useState({});
    const [user, loading] = useAuthState(auth);

    const [openReact, setOpenReact] = useState({

    })

    const today = new Date();

    const { postId } = useParams();


    const mediaRef = useRef();
    const scrollRef = useRef([]);

    const [posts, setPost] = useState([
        {
            _id: 3233,
            postUploader: "Wonder Zahid",
            uploaderDp: "https://placeimg.com/192/192/people",
            uploadDate: "23 August, 2022",
            caption: "When you are looking for caption to test the meme section",
            media: "https://youtu.be/DmH6YPWhaDY",
            reactions: [
                { email: "sanaullah15-4995@diu.edu.bd", react: "haha" },
                { email: "sanaulla@diu.edu.bd", react: "love" },
                { email: "sanaul-4995@diu.edu.bd", react: "haha" },
            ]
        },
        {
            _id: 3234,
            postUploader: "Wonder Zahid",
            uploaderDp: "https://placeimg.com/192/192/people",
            uploadDate: "23 August, 2022",
            caption: "When you are looking for caption to test the meme section",
            media: "https://res.cloudinary.com/ssani7/video/upload/v1661512073/Watch_-_Facebook_aub7aj.mkv",
            reactions: [
                { email: "sanaullah15-4995@diu.edu.bd", react: "haha" },
                { email: "sanaulla@diu.edu.bd", react: "love" },
                { email: "sanaul-4995@diu.edu.bd", react: "haha" },
            ]
        },
        {
            _id: 3235,
            postUploader: "Wonder Zahid",
            uploaderDp: "https://placeimg.com/192/192/people",
            uploadDate: "23 August, 2022",
            caption: "When you are looking for caption to test the meme section",
            media: "https://res.cloudinary.com/ssani7/video/upload/v1661512136/Watch_-_Facebook_zs6078.mp4",
            reactions: [
                { email: "sanaullah15-4995@diu.edu.bd", react: "haha" },
                { email: "sanaulla@diu.edu.bd", react: "love" },
                { email: "sanaul-4995@diu.edu.bd", react: "haha" },
            ]
        },
        {
            _id: 3236,
            postUploader: "Wonder Zahid",
            uploaderDp: "https://placeimg.com/192/192/people",
            uploadDate: "23 August, 2022",
            caption: "When you are looking for caption to test the meme section",
            media: "https://youtu.be/DmH6YPWhaDY",
            reactions: [
                { email: "sanaullah15-4995@diu.edu.bd", react: "haha" },
                { email: "sanaulla@diu.edu.bd", react: "love" },
                { email: "sanaul-4995@diu.edu.bd", react: "haha" },
            ]
        },
    ]);


    // longpress
    const [action, setAction] = useState('');

    const timerRef = useRef();
    const isLongPress = useRef(false);

    if (loading) return <NLoading />

    function handleOnClick(_id) {
        if (isLongPress.current) {
            setAction(`longpress_${_id}`);
            setOpenReact({ ...openReact, [_id]: true });
        }
        else {
            setAction(`click_${_id}`);
            const newPosts = [...posts];
            const newPost = newPosts.find(p => p._id === _id);
            const reactIndex = newPost.reactions.findIndex(r => r.email === user.email)
            // newPost.reactions[reactIndex] = { email: user.email, react:  }
            if (reactIndex > -1) {
                newPost.reactions.splice(reactIndex, 1);
            }
            setPost(newPosts);
            setOpenReact({ ...openReact, [_id]: false });;
        }
    }
    function handleOnMouseUp() {
        clearTimeout(timerRef.current);
        setAction("");

    }
    function handleOnMouseDown(_id) {
        setTimer(_id);
    }
    function handleOnTouchStart(_id) {
        setTimer(_id);
    }
    function handleOnTouchEnd() {
        clearTimeout(timerRef.current);
        setAction("");
    }

    function setTimer(_id) {
        isLongPress.current = false;
        timerRef.current = setTimeout(() => {
            isLongPress.current = true;
            setAction(`longpress${_id}`);
            setOpenReact({ ...openReact, [_id]: true });
        }, 300);
    }


    const reactions = [
        { name: "like", icon: like },
        { name: "love", icon: love },
        { name: "haha", icon: haha },
        { name: "sad", icon: sad },
        { name: "angry", icon: angry },
        // { name: "dislike", icon: dislike },
    ]

    const handleChangeReact = (id, react) => {
        const newPosts = [...posts];
        const newPost = newPosts.find(p => p._id === id);
        const reactIndex = newPost.reactions.findIndex(r => r.email === user.email);
        if (reactIndex > -1) {
            newPost.reactions[reactIndex] = { email: user.email, react: react }
        }
        else {
            newPost.reactions.push({ email: user.email, react: react })
        }
        setPost(newPosts);
        setOpenReact({ ...openReact, [id]: false });;
    }

    if (postId && postId < posts.length) {
        window.scrollTo(0, scrollRef?.current[postId]?.offsetTop - 100);
    }

    async function handleMedia(e) {
        const formData = new FormData();
        if (e.target.files.length === 1) {
            const fileType = e.target.files[0].type.split("/")[0];
            if (fileType === "image" || fileType === "video") {
                setLoadingData({ ...loadingData, uploadingMedia: true });

                formData.append("file", e.target.files[0]);
                formData.append("upload_preset", "section-N-diu-memes");

                const response = await axios.post(`https://api.cloudinary.com/v1_1/ssani7/auto/upload`, formData);
                console.log(response)

                if (response.status === 200) {
                    setMedia({
                        fileType: fileType,
                        media: response?.data?.url
                    });

                    if (fileType === "video") setLoadingData({ ...loadingData, uploadingMedia: false });

                }
                else {
                    setLoadingData({ ...loadingData, uploadingMedia: false });
                    toast.error(`${response.status} Something Went Wrong`);
                }
            }
            else {
                toast.error("Please choose an image or a video");
            }

        }
        else {
            setLoadingData({ ...loadingData, uploadingMedia: false });
            toast.error("Please select 1 media file less than 10 mb")
        }

    }

    async function post() {
        setLoadingData({ ...loadingData, postingMeme: true });

        const meme = {
            email: user.email,
            date: format(today, "PP"),
            media: media,
            caption: caption
        }

        try {
            const response = await axios.post("http://localhost:5000/memes", meme);

            setLoadingData({ ...loadingData, postingMeme: false });

            if (response.data.insertedId) {
                toast.success("Posted Meme");
            }
            else {
                toast.error("Server Error");
            }
        } catch (error) {
            setLoadingData({ ...loadingData, postingMeme: false });
            console.log(error)
        }
    }


    return (
        <div className='pt-20 bg-base-100'>
            <h2 className='text-2xl font-bold text-center'>Memes of Section N</h2>

            <div className='mt-10 max-w-full mx-6 md:max-w-5xl md:mx-auto shadow-lg p-5 md:p-10 rounded-xl flex flex-col items-center bg-base-300'>

                <div className='mr-auto mb-2 flex items-center'>
                    <div class="w-12 h-12 rounded-full ring-offset-base-100 ring-offset-2 overflow-hidden">
                        <img className='' src={user?.photoURL} alt='' />
                    </div>
                    <h2 className='ml-4 md:text-xl font-semibold poppins h-fit'>{user?.displayName}</h2>
                </div>

                <input onChange={(e) => handleMedia(e)} ref={mediaRef} type="file" className='hidden' />
                <textarea type="text"
                    onChange={(e) => setCaption(e.target.value)}
                    rows={5}
                    placeholder='Add a caption'
                    className={`w-full h-auto max-w-sm md:max-w-full ${ghostInput} border-b border-base-content my-5 text-xl placeholder:opacity-50`} />

                {
                    media?.fileType && (
                        <>
                            {
                                media?.fileType === "image"
                                    ? (
                                        <div className='h-80 w-9/12 my-5'>
                                            <img
                                                onLoad={() => setLoadingData({ ...loadingData, uploadingMedia: false })}
                                                className='w-full h-full object-contain' src={media.media} alt="" />
                                        </div>)
                                    : <div className='player-wrapper my-5 mx-auto h-80 w-9/12'>
                                        <ReactPlayer
                                            className='react-player'
                                            url={"http://res.cloudinary.com/ssani7/video/upload/v1661972321/section-N-diu-memes/jy0d01tycyxhgvhyegpw.mp4"}
                                            width="100%"
                                            height="100%"
                                            controls />
                                    </div>
                            }
                        </>
                    )

                }

                {
                    loadingData?.uploadingMedia
                        ? <span className='btn btn-outline capitalize loading'>Uploading</span>
                        : <span onClick={() => mediaRef.current.click()} className='btn btn-outline capitalize '><FontAwesomeIcon icon={faImage} className="mr-2" />Upload Media</span>
                }

                {
                    loadingData?.postingMeme
                        ? <button className='w-full mt-5 btn btn-primary capitalize loading'>Posting</button>
                        : <button disabled={(media.fileType || caption) ? false : true} onClick={() => post()} className='w-full mt-5 btn btn-primary capitalize'>Post</button>
                }
            </div>

            {
                posts.map((post, index) => (
                    <div ref={el => scrollRef.current[index] = el}
                        className='w-full h-fit pt-6 px-4 md:max-w-5xl md:mx-auto mt-10 bg-base-200 md:rounded-xl'>
                        <div class="flex items-center px-5">
                            <div class="w-12 rounded-full ring-offset-base-100 ring-offset-2 overflow-hidden">
                                <img src={post.uploaderDp} alt='' />
                            </div>
                            <div className='flex flex-col ml-4 '>
                                <p className='md:text-xl font-semibold poppins h-fit'>{post.postUploader}</p>
                                <p className='text-xs'>{post.uploadDate}</p>
                            </div>
                        </div>

                        <div className='my-8 text-lg mx-5'>
                            <h2>{post.caption}</h2>
                        </div>

                        <div className='player-wrapper max-w-2xl my-10 mx-auto'>

                            <ReactPlayer
                                className='react-player'
                                url={post.media}
                                width="100%"
                                height="100%"
                                // playing={inView ? true : false}
                                controls />
                        </div>


                        <div className='w-full border md:rounded-lg border-base-content p-3 flex items-center justify-between md:justify-evenly px-10 md:px-5 relative'>
                            <div className='flex items-center group no-menu select-none'>
                                {
                                    <div
                                        onClick={() => handleOnClick(post._id)}
                                        onMouseUp={() => handleOnMouseUp()}
                                        onMouseDown={() => handleOnMouseDown(post._id)}
                                        onTouchStart={() => handleOnTouchStart(post._id)}
                                        onTouchEnd={() => handleOnTouchEnd()}
                                        className="select-none transition duration-200 cursor-pointer md:hover:scale-110 active:scale-90">
                                        <img
                                            className='w-14 h-14 md:w-20 md:h-20  md:mr-3 cursor-pointer pointer-events-none object-contain rounded-full'
                                            src={reactions.find(r => r.name === post.reactions.find(react => react?.email === user.email)?.react)?.icon || noReact}
                                            alt=""
                                        />
                                    </div>
                                }
                                {/* <h2>{post.reactions.length}</h2> */}

                                <input
                                    onChange={(e) => setOpenReact({ ...openReact, [post._id]: e.target.checked })}
                                    checked={openReact[post._id]}
                                    className='hidden' />

                                <div className={`absolute z-30 flex w-fit left-0 rounded-2xl items-center justify-center bg-white bottom-full p-2 md:px-5 mb-4 transition duration-75 ${openReact[post._id] ? "visible translate-y-0" : "invisible translate-y-5"}`}>
                                    {
                                        reactions?.map((reaction, i) => (
                                            <div className={`react-container${i} cursor-pointer`}>
                                                <img
                                                    src={reaction.icon} alt=""
                                                    onClick={() => handleChangeReact(post._id, reaction.name)}
                                                    className="w-14 h-14 mr-2 md:w-20 md:h-20 md:mx transition duration-200 hover:scale-150 active:scale-150 rounded-full" />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className='flex items-center'>
                                <FontAwesomeIcon icon={faComment} className="w-8 h-8 mr-2 md:w-10 md:h-10 md:mr-3 transform transition duration-1000 md:hover:scale-110 active:scale-90 cursor-pointer" />
                                {/* <h2>544</h2> */}
                            </div>

                            <div
                                onClick={() => {
                                    navigator.clipboard.writeText(`https://section-n-diu.web.app/memes/${index}`);
                                }}
                                className='flex items-center group'>
                                <FontAwesomeIcon icon={faShare} className="w-8 h-8 mr-2 md:w-10 md:h-10 md:mr-3 transition-all md:hover:scale-125 active:scale-90 cursor-pointer" />
                                <h2>544</h2>
                            </div>
                        </div>
                    </div>
                ))
            }
            <Footer />
        </div>
    );
};

export default Memes;

/* 
<FontAwesomeIcon
                                    icon={reaction.icon}
                                    onClick={() => setReact(reaction.name)}
                                    className="w-10 h-10 mr-3 hover:text-pink-500 transition-all hover:scale-125 active:scale-90 cursor-pointer" />

*/