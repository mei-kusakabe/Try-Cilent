import React, { useState } from 'react';

const SubFolder = ({ name, subfolders, onDelete }) => {
    const [subFolders, setSubFolders] = useState(subfolders);
    const handleAddFolder = () => {
        const newFolder = {
            name: "New Folder",
            subfolders: []
        };
        setSubFolders([...subFolders, newFolder]);
    };

    const handleDeleteFolder = (index) => {
        const newFolders = [...subFolders];
        newFolders.splice(index, 1);
        setSubFolders(newFolders);
    };

    return (
        <div>
            <h2>{name}</h2>
            <button onClick={handleAddFolder}>Add Folder</button>
            <button onClick={onDelete}>Delete</button>
            {subFolders.map((folder, index) => (
                <SubFolder
                    key={index}
                    name={subFolders.name}
                    subfolders={subFolders.subfolders}
                    onDelete={() => handleDeleteFolder(index)}
                />
            ))}
        </div>
    );
};

export default SubFolder;