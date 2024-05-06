import React, { useRef } from 'react';
import { serCreateAttachment } from '../services/masterServices';
import asyncWrapper from '../utils/asyncWrapper';

const FileAttachment = () => {
    const hiddenFileInput = useRef(null);

    const handleIconClick = () => {
        hiddenFileInput.current.click();
    };

    const handleFileChange = asyncWrapper(async (event) => {
        const formData = new FormData();
        formData.append('filearray', selectedFile);
        formData.append('filesize', selectedFile.size);
        formData.append('path', "upload\\attachfile\\");

        const postData = event?.target?.files[0]
        const data = await toBase64(postData)
        const response = await serCreateAttachment(data)
        console.log(response);
    });

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });

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
    )
}

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

//     try {
//       const response = await fetch('@Url.Action("UploadAttachFile","LetterManagement", new { area = "UserArea"})', {
//         method: 'POST',
//         body: formData,
//       });

//       const result = await response.json();

//       if (result.status === "success") {
//         setMessage("پیوست انجام شد");
//         setMessageColor('green');
//         setMessage(result.imagename);
//       } else if (result.status === 'badsize') {
//         setMessage('حجم فایل بیش از  15 مگابایت است');
//         setMessageColor('red');
//       }
//     } catch (error) {
//       setMessage("در حین آپلود اشکالی بوجود آمد.");
//       setMessageColor('red');
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={uploadFile}>Upload</button>
//       <p style={{ color: messageColor }}>{message}</p>
//     </div>
//   );
// }

// export default FileUploadComponent;
