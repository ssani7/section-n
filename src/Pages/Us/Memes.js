import { faComment, faFaceAngry, faHeart, faImage, faLaughSquint, faShare, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faheac } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { ghostInput } from '../Settiings/EditPortfolio';
import ReactPlayer from 'react-player'
import haha from '../../images/icons/lol.png'
import like from '../../images/icons/like.png'
import sad from '../../images/icons/sad.png'
import angry from '../../images/icons/angry.png'
import love from '../../images/icons/heart.png'
import dislike from '../../images/icons/dislike.png'
import noReact from '../../images/icons/laughing.png'
import useLongPress from '../../hooks/useLongPress';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Footer from '../Shared/Footer';
import { useParams } from 'react-router-dom';

const Memes = () => {
    const [media, setMedia] = useState("https://youtu.be/DmH6YPWhaDY");
    const [user, loading] = useAuthState(auth);

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
            _id: 3233,
            postUploader: "Wonder Zahid",
            uploaderDp: "https://placeimg.com/192/192/people",
            uploadDate: "23 August, 2022",
            caption: "When you are looking for caption to test the meme section",
            media: "https://fb.watch/f7ynItW-bP/",
            reactions: [
                { email: "sanaullah15-4995@diu.edu.bd", react: "haha" },
                { email: "sanaulla@diu.edu.bd", react: "love" },
                { email: "sanaul-4995@diu.edu.bd", react: "haha" },
            ]
        },
        {
            _id: 3233,
            postUploader: "Wonder Zahid",
            uploaderDp: "https://placeimg.com/192/192/people",
            uploadDate: "23 August, 2022",
            caption: "When you are looking for caption to test the meme section",
            media: "https://fb.watch/f7zxJNn86V/",
            reactions: [
                { email: "sanaullah15-4995@diu.edu.bd", react: "haha" },
                { email: "sanaulla@diu.edu.bd", react: "love" },
                { email: "sanaul-4995@diu.edu.bd", react: "haha" },
            ]
        },
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
    ]);


    // longpress
    const [action, setAction] = useState('');

    const timerRef = useRef();
    const isLongPress = useRef(false);

    function handleOnClick(_id) {
        if (isLongPress.current) {
            setAction(`longpress_${_id}`);
            setOpenReact({ ...openReact, [_id]: true });
        }
        else {
            setAction(`click_${_id}`);
            setReactState({})
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



    const [openReact, setOpenReact] = useState({

    })


    const [reactState, setReactState] = useState({
        icon: love
    });

    const reactions = [
        { name: "like", icon: like },
        { name: "love", icon: love },
        { name: "haha", icon: haha },
        { name: "sad", icon: sad },
        { name: "angry", icon: angry },
        { name: "dislike", icon: dislike },
    ]

    const handleChangeReact = (id, react) => {
        const newPosts = [...posts];
        const newPost = newPosts.find(p => p._id === id);
        const reactIndex = newPost.reactions.findIndex(r => r.email === user.email)
        newPost.reactions[reactIndex] = { email: user.email, react: react }
        setPost(newPosts);
        setOpenReact({ ...openReact, [id]: false });;
    }

    const { postId } = useParams();

    if (postId && postId < posts.length) {
        window.scrollTo(0, scrollRef?.current[postId]?.offsetTop - 100);
    }

    return (
        <div className='pt-20 bg-base-100'>
            <h2 className='text-2xl font-bold text-center'>Memes of Section N</h2>

            <div className='mt-10 max-w-full mx-6 md:max-w-5xl md:mx-auto shadow-lg p-5 md:p-10 rounded-xl flex flex-col items-center bg-base-300'>
                {/* <input type="file" /> */}
                <textarea type="text"
                    placeholder='Add a caption'
                    className={`w-full h-auto max-w-sm md:max-w-full ${ghostInput} border-b border-base-content mb-5 text-xl placeholder:opacity-50`} />

                <span className='btn btn-outline capitalize '><FontAwesomeIcon icon={faImage} className="mr-2" />Upload Media</span>
            </div>

            {
                posts.map((post, index) => (
                    <div ref={el => scrollRef.current[index] = el} className='w-full pt-5 md:max-w-5xl md:mx-auto mt-10 bg-base-200 md:rounded-xl'>
                        <div class="flex items-center px-5">
                            <div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
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

                        <div className='my-10 h-96 w-full md:px-0 md:w-9/12 mx-auto z-10'>
                            <ReactPlayer url={post.media} width="100%" height="100%" controls className=" mb-10" />
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
                                        className="select-none cursor-pointer md:hover:scale-125 active:scale-90">
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
                                            <div className={`react-container${i}`}>
                                                <img
                                                    src={reaction.icon} alt=""
                                                    onClick={() => handleChangeReact(post._id, reaction.name)}
                                                    className="w-14 h-14 mr-2 md:w-20 md:h-20 md:mx transition-all hover:scale-150 active:scale-150 cursor-pointer rounded-full" />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className='flex items-center'>
                                <FontAwesomeIcon icon={faComment} className="w-8 h-8 mr-2 md:w-10 md:h-10 md:mr-3 transition-all md:hover:scale-125 active:scale-90 cursor-pointer" />
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