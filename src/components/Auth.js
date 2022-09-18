import React, { useEffect, useState } from 'react'
import { FolderOpenIcon, PhotoIcon, ShareIcon, ArrowPathIcon, ArchiveBoxIcon, PlusIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/solid'
import Button from '../UIcomponents/Button'
import { db } from '../firebase'
import { getAuth } from 'firebase/auth'
import FolderCreate from '../UIcomponents/FolderCreate';
import Modal from '../UIcomponents/Modal';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
function Auth() {

    const [foldermodal, setFoldermodal] = useState(false);
    const [authuser, setAuthuser] = useState(null);
    const [data, setData] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [imgUrl, setImgUrl] = useState(null);
    const ShareDocs = () => {


    }
    const DeleteDocs = () => {

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target[0]?.files[0];
        if (!file) return;
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                    db.collection('documents').add({
                        files: downloadURL,
                        user: "hey"
                    })
                    alert('Done')
                    db.collection("documents").onSnapshot((snapshot) => {
                        setData(
                            snapshot.docs.map((doc) => ({
                                id: doc.id,
                                data: doc.data(),
                            }))
                        );
                    });

                });
            }
        );
    }
    const closemodal = () => {
        setFoldermodal(false);
    }
    const foldercreate = () => {
        setFoldermodal(true);
    }
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            setAuthuser(user)
        }
        db.collection("documents").onSnapshot((snapshot) => {
            setData(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
        console.log({ data });

    }, [foldermodal, authuser])


    db.collection("documents").onSnapshot((snapshot) => {
        setData(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        );
    });


    return (

        <>
            {(foldermodal) && (
                <Modal>
                    <FolderCreate closemodal={closemodal} />
                </Modal>
            )}
            <div className='flex p-3'>
                <div className='max-w-lg space-y-6 '>
                    <div className='flex items-center space-x-3'>
                        {/* <div>
                            <FolderOpenIcon className="h-6 w-6 text-[#6a5feb]" />
                        </div> */}
                        <div>
                            <h4 className='font-bold'>{authuser ? authuser.displayName : ""}</h4>
                        </div>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <div>
                            <FolderOpenIcon className="h-6 w-6 text-[#6a5feb]" />
                        </div>
                        <div>
                            <h4>My Files</h4>
                        </div>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <div>
                            <ArrowPathIcon className="h-6 w-6 text-[#6a5feb]" />
                        </div>
                        <div>
                            <h4>Recent</h4>
                        </div>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <div>
                            <PhotoIcon className="h-6 w-6 text-[#6a5feb]" />
                        </div>
                        <div>
                            <h4>Photos</h4>
                        </div>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <div>
                            <ShareIcon className="h-6 w-6 text-[#6a5feb]" />
                        </div>
                        <div>
                            <h4>Shared</h4>
                        </div>
                    </div>

                    <div className='flex items-center space-x-3'>
                        <div>
                            <ArchiveBoxIcon className="h-6 w-6 text-[#6a5feb]" />
                        </div>
                        <div>
                            <h4>Recycle bin</h4>
                        </div>
                    </div>
                </div>
                {/* this is comment */}
                <div className="vr ml-4 lg:ml-8" style={{ height: '100vh', backgroundColor: '#6a5feb' }}>

                </div>
                <div className='ml-12'>
                    <div className=' items-center'>
                        <Button buttonText='New Folder' clickHandler={foldercreate} active icon={PlusIcon} />
                        {/* <Button buttonText='Upload' active icon={ArrowUpOnSquareIcon} /> */}
                        <form className='mt-5' onSubmit={handleSubmit}>
                            <input type='file' />
                            <button type='submit'>Upload</button>
                        </form>
                    </div>
                    <hr className='mt-3 w-full bg-[#6a5feb]' style={{ width: '80vw' }} />
                    <div className='flex flex-wrap space-x-3'>
                        {
                            data?.map((d, index) => {
                                return (
                                    <>
                                        <div className="card mt-3" style={{ width: '18rem' }} key={index}
                                        >
                                            <img src="https://wwwcdn.imo.org/localresources/en/OurWork/PublishingImages/IMO%20Circular%20image_640x360.jpg" className="card-img-top" alt="..." onClick={() => {
                                                window.open(d.data.files, '_blank');
                                            }} />
                                            <div className='flex justify-between'>
                                                <div>
                                                    <ArchiveBoxIcon className="h-9 w-9 p-2 cursor-pointer text-[#6a5feb]" onClick={DeleteDocs} />
                                                </div>
                                                {/* <div>
                                                    <ShareIcon className="h-9 w-9 p-2 cursor-pointer   text-[#6a5feb]" onClick={ShareDocs} />
                                                </div> */}
                                                <div>
                                                <a href="mailto:?subject=Checkout the shared document..&amp;body=Check out this document http://www.website.com."
                                                    title="Checkout the document shared by me..">
                                                    <img src="http://png-2.findicons.com/files/icons/573/must_have/48/mail.png"
                                                    className='h-9 w-9 p-1 cursor-pointer'
                                                    />
                                                </a>
                                                </div>
                                                
                                            </div>



                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Auth