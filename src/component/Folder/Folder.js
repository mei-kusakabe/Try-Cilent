import React, { useState } from 'react';

function Folder({ name, children, onAddFolder, onDeleteFolder }) {
    const [isAddingFolder, setIsAddingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");

    const handleAddFolder = () => {
        setIsAddingFolder(true);
    };

    const handleCancelAddFolder = () => {
        setIsAddingFolder(false);
        setNewFolderName("");
    };

    const handleCreateFolder = () => {
        if (newFolderName) {
            onAddFolder(name, newFolderName);
            setIsAddingFolder(false);
            setNewFolderName("");
        }
    };

    const handleDeleteFolder = () => {
        onDeleteFolder(name);
    };

    return (
        <div className="folder">
            <div className="folder-buttons">
                <button onClick={handleAddFolder}>Add Folder</button>
                {name !== "root" && <button onClick={handleDeleteFolder}>Delete Folder</button>}
            </div>
            <h3>{name}</h3>
            {isAddingFolder && (
                <div>
                    <input value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} />
                    <button onClick={handleCreateFolder}>Create Folder</button>
                    <button onClick={handleCancelAddFolder}>Cancel</button>
                </div>
            )}
            {children}
        </div>
    );
}

export default Folder;