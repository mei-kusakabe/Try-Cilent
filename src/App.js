import React, { useEffect, useState } from 'react';
import './App.css';
import { FaPlus, FaMinus, FaFolder } from "react-icons/fa";

function App() {
  const [folders, setFolders] = useState([{ name: 'root', subfolders: [] }]);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('root');

  useEffect(() => {
    fetch('http://localhost:5000/allfolders')
      .then(res => res.json())
      .then(data => setFolders(data));
  })

  console.log(folders);


  const handleCreateFolder = () => {
    const newFolder = { name: newFolderName, subfolders: [] };
    const newFolders = [...folders];
    if (selectedFolder === 'root') {
      newFolders.push(newFolder);
    } else {
      const parentFolder = findFolderByName(selectedFolder, newFolders);
      parentFolder.subfolders.push(newFolder);
    }
    setFolders(newFolders);
    setNewFolderName('');


    fetch('http://localhost:5000/allfolders', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folders)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.acknowledged) {

          // form.reset();
          // toast('Folder Created Successfully!');
          alert('Folder Added Successfully!')
        }
      })
      .catch(error => console.error(error));


  };

  const handleDeleteFolder = (id, folderName, parentFolderName) => {
    const newFolders = [...folders];
    if (parentFolderName === 'root') {
      newFolders.splice(newFolders.findIndex(folder => folder.name === folderName), 1);
    } else {
      const parentFolder = findFolderByName(parentFolderName, newFolders);
      parentFolder.subfolders = parentFolder.subfolders.filter((folder) => folder.name !== folderName);
    }
    setFolders(newFolders);
    setSelectedFolder('root');

    // const proceed = window.confirm('Are you sure you want to delete this folder?');
    // if (proceed) {
    //   fetch(`http://localhost:5000/folders/${folders._id}`, {
    //     method: 'DELETE',
    //     headers: {
    //       authorization: `Bearer ${localStorage.getItem('book-trekker-token')}`
    //     }
    //   })
    //     .then(res => res.json())
    //     .then(data => {
    //       console.log(data);
    //       if (data.deletedCount > 0) {
    //         refetch();
    //         toast.success(`Seller ${folders.folderName} deleted successfully`)
    //       }
    //     })
    // }


    fetch(`http://localhost:5000/allfolders/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      // body: JSON.stringify(folders)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.deletedCount > 0) {
          alert('deleted successfully');
          const remaining = folders.filter(odr => odr._id !== id);
          setFolders(remaining);
        }
      })
      .catch(error => console.error(error));



  };

  const handleNewFolderNameChange = (event) => {
    setNewFolderName(event.target.value);
  };

  const handleFolderClick = (folderName) => {
    setSelectedFolder(folderName);
  };

  const findFolderByName = (name, folders) => {
    for (let i = 0; i < folders.length; i++) {
      const folder = folders[i];
      if (folder.name === name) {
        return folder;
      }
      if (folder.subfolders.length > 0) {
        const subfolder = findFolderByName(name, folder.subfolders);
        if (subfolder !== null) {
          return subfolder;
        }
      }
    }
    return null;
  };

  const renderFolder = (folder, parentFolderName) => {
    return (
      <div key={folder.name} className=" " >
        <div className={selectedFolder === folder.name ? 'selected' : ''} onClick={() => handleFolderClick(folder.name)}>
          <FaFolder className='folder' />    <span className='foldername'>{folder.name}</span>
        </div>
        {
          folder.name !== 'root' && (
            <button onClick={() => handleDeleteFolder(folder.name, parentFolderName)}><FaMinus className='plus' /></button>
          )
        }
        {
          folder.subfolders.length > 0 && (
            <div>
              {folder.subfolders.map((subfolder) => {
                return renderFolder(subfolder, folder.name);
              })}
            </div>
          )
        }
        <div>
          <input type="text" value={newFolderName} onChange={handleNewFolderNameChange} />
          <button onClick={() => handleCreateFolder()}><FaPlus className='plus' /></button>
        </div>
      </div >
    );
  };

  return (
    <div className="App">
      <h1>Folder Structure Viewer</h1>
      {folders.map((folder) => {

        return renderFolder(folder, 'root');

      })}

    </div>
  );
}

export default App;
