import React, { useEffect, useState } from 'react'
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import Button from './Button';
import { db } from '../firebase';

function FolderCreate(props) {
    const [document,setDocument]=useState(null);
    const create = () => {
    
    }
    useEffect(() => {
        db.collection("documents").onSnapshot((snapshot) => {
          setDocument(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
        console.log(document);
      }, []);
    return (
        <div>
            <div className="modal-card signin-card">
                <span className="close-modal" onClick={() => {
                    props.closemodal();
                }}>
                    &times;
                </span>
                <div className="form-group mt-5">
                    <h2 className='text-center mt-2 mb-3 text-xl'>Create a new folder</h2>
                    <input type={Text} className='form-field' placeholder='Folder name' />
                </div>
                <Button buttonText='Create' clickHandler={create} active icon={ArrowUpTrayIcon} />
            </div>
        </div>
    )
}

export default FolderCreate