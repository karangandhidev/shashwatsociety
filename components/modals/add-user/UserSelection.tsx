import React from "react";

const UserSelectionModal: React.FC<{
  users: { id: string; name: string; added: boolean }[];
  setUsers: React.Dispatch<React.SetStateAction<{ id: string; name: string; added: boolean }[]>>;
  onClose: () => void;
  onSave: (selected: string[]) => void;
}> = ({ users, setUsers, onClose, onSave }) => {
  const handleUserChange = (userId: string) => {
    // Toggle the added status for the user
    setUsers(prev =>
      prev.map(user => (user.id === userId ? { ...user, added: !user.added } : user))
    );
  };

  const handleSave = () => {
    const selectedUserIds = users.filter(user => user.added).map(user => user.id);
    onSave(selectedUserIds);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-5 shadow-lg w-80">
        <h2 className="text-lg font-bold">Select Users</h2>
        <div className="max-h-60 overflow-y-auto">
          {users.map(user => (
            <div key={user.id} className="flex items-center">
              <input
                type="checkbox"
                checked={user.added}
                onChange={() => handleUserChange(user.id)}
                className="m-2.5"
              />
              <span className="ml-2">{user.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button className="text-blue-500" onClick={onClose}>Cancel</button>
          <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export { UserSelectionModal };