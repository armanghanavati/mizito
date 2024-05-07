import React, { useRef, useState } from 'react';
import { serCreateAttachment } from '../services/masterServices';
import asyncWrapper from '../utils/asyncWrapper';
import { useDispatch } from 'react-redux';
import { RsetShowLoading } from '../hooks/slices/main';

const FileAttachment = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const hiddenFileInput = useRef(null);
  const dispatch = useDispatch();

  const handleIconClick = () => {
    hiddenFileInput.current.click();
  };

  // const handleFileChange = (event) => {
  //   // if (file.size >= 512000 * 10 * 3) {
  //   //   setMessage('حجم فایل بیش از 15 مگابایت است');
  //   //   setMessageColor('red');
  //   //   return;
  //   // }
  // };

  const handleFileChange = asyncWrapper(async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // formData.append('filearray', selectedFile);
    // formData.append('filesize', selectedFile.size);
    // const formData = new FormData();
    // formData.append('path', 'upload\\attachfile\\');
    console.log(event);
    const postData = event?.target?.files;
    // const data = await toBase64(postData);
    dispatch(RsetShowLoading({ value: true }));
    const response = await serCreateAttachment(postData);
    dispatch(RsetShowLoading({ value: false }));

    console.log(response);
  });

  //   const toBase64 = (file) =>
  //     new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => resolve(reader.result.split(',')[1]);
  //       reader.onerror = (error) => reject(error);
  //     });

  return (
    <div>
      <i
        onClick={handleIconClick}
        className="pt-2 rounded-pill px-2 sideCount text-white text-secondary bi bi-pin-angle mx-2 cursorPointer"
      />
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileAttachment;

// import React, { useState } from 'react';

// function FileUploadComponent() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file.size >= 512000 * 10 * 3) {
//       setMessage('حجم فایل بیش از 15 مگابایت است');
//       setMessageColor('red');
//       return;
//     }
//     setSelectedFile(file);
//   };

//   const uploadFile = async () => {
//     if (!selectedFile) return;
//     const formData = new FormData();
//     formData.append('filearray', selectedFile);
//     formData.append('filesize', selectedFile.size);
//     formData.append('path', "upload\\attachfile\\");

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={uploadFile}>Upload</button>
//       <p style={{ color: messageColor }}>{message}</p>
//     </div>
//   );
// }

// export default FileUploadComponent;
