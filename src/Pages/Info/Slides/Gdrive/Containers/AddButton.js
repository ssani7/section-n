import { faFileCirclePlus, faFolderPlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const AddButton = ({ folderId }) => {
	const [moadalOpen, setModalOpen] = useState(false);
	const [options, setOptions] = useState('');
	const [folderName, setFolderName] = useState('');
	const fileUpRef = useRef();

	async function createFolder() {
		try {
			const { data } = await axios.post('http://localhost:5000/createFolder', { parent: folderId, name: folderName });
			console.log(data);
		} catch (error) {}
	}
	return (
		<>
			<input type="checkbox" id="first-modal" checked={moadalOpen} className="modal-toggle" />
			<div className="modal">
				<div className="modal-box h-1/3 w-full max-w-sm md:max-w-xl relative flex flex-col items-center justify-center">
					<label htmlFor="first-modal" onClick={() => setModalOpen(false)} className="btn btn-outline btn-error btn-xs md:btn-sm absolute right-2 top-2">
						✕
					</label>
					<div className="w-full flex justify-evenly items-center">
						<div onClick={() => setOptions('folder')} className="cursor-pointer">
							<FontAwesomeIcon className="h-10 w-full mx-auto" icon={faFolderPlus} />
							<h2 className="text-center">Create Folder</h2>
						</div>
						<div
							onClick={() => {
								setOptions('file');
								fileUpRef.current.click();
							}}
							className="cursor-pointer">
							<FontAwesomeIcon className="h-10 w-full mx-auto" icon={faFileCirclePlus} />
							<h2 className="text-center">Add Files</h2>
							<input className="hidden" type="file" ref={fileUpRef} />
						</div>
					</div>
					{options === 'folder' && (
						<div className="w-full flex flex-col items-center gap-3 mt-5">
							<input type="text" placeholder="Folder Name" className="input input-bordered input-md w-full" onChange={(e) => setFolderName(e.target.value)} />
							<button onClick={() => createFolder()} className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">
								Add Folder
							</button>
						</div>
					)}
				</div>
			</div>

			<button onClick={() => setModalOpen(true)} className="btn btn-circle absolute right-5 bottom-10 md:right-10 md:bottom-10">
				<FontAwesomeIcon className="w-6 h-6" icon={faPlus} />
			</button>
		</>
	);
};

export default AddButton;
