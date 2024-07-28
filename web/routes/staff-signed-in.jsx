import { useState, useEffect } from 'react';
import { useAction } from "@gadgetinc/react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "@gadgetinc/react";
import { api } from "../api";

const StaffOperations = () => {
  const navigate = useNavigate();
  const user = useUser(api);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [role, setRole] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [keys, setKeys] = useState('');
  const [{data, loading, error}, updateUser] = useAction(api.user.update);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const actionResult = await api.fetchUsers();
        if (actionResult.success) {
          setUsers(actionResult.users); // Adjust according to the actual shape of your result
        } else {
          console.error("Error fetching users:", actionResult.errors);
        }
      } catch (error) {
        console.error("Fetching users failed:", error);
      }
    };

    fetchUsers();

    if (!user || user.account !== 'staff') {
      navigate('/not-auth'); // Redirect them to a not authorized page or home page
    }
    
  }, [user, navigate]);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    const user = users.find(user => user.id === event.target.value);
    setKeys(user ? user.keys : "");
    setCurrentRole(user ? user.account : "")
  };

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  const handleKeysChange = (event) => {
    setKeys(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async () => {
    if (selectedAction === "changeKeys" && selectedUser) {
      try {
        const result = await updateUser({
          id: selectedUser,
          keys: keys,
        });
        // Check if there is no error and data is returned
        if (!error && result) {
          console.log('Update success:', result);
          setFeedbackMessage('User keys updated successfully!');
        } else {
          // Handle case where action does not throw an error, but does not succeed
          setFeedbackMessage('Failed to update user keys.');
        }
      } catch (err) {
        // Handle errors that throw exceptions
        console.error('Error updating user keys:', err);
        setFeedbackMessage('Error updating user keys.');
      }
    } else if (selectedAction === "assignRole" && selectedUser) {
    try {
      // Use the updateUser action to assign a role
      // Assuming 'role' is the field to update and it's stored in the 'keys' state for this example
      const result = await updateUser({
        id: selectedUser,
        account: role , // Ensure this matches your data model
      });

      if (!error && result) {
        setFeedbackMessage('User role updated successfully!');
      } else {
        setFeedbackMessage('Failed to update user role.');
      }
    } catch (err) {
      console.error('Error updating user role:', err);
      setFeedbackMessage('Error updating user role.');
    }
  }
  };

  return (
    <div className="app-content d-flex justify-content-center vw-70 align-items-right">
      <div className="rounded-container p-4">
        <h1 className="form-title mb-4 text-center">Staff Operations</h1>

        {/* User Selection */}
        <div className="mb-3 d-flex">
          <p className="m-2"> Select User </p>
          <select className="custom-input form-control" value={selectedUser} onChange={handleUserChange}>
            <option value="">Select User</option>
            {users.map((user, index) => (
              <option key={index} value={user.id}>{`${user.firstName || "Unknown"} (${user.email})`}</option>
            ))}
          </select>
        </div>

        {/* Action Selection */}
        <div className="mb-3 d-flex">
          <p className="m-2"> What to do? </p>
          <select className="custom-input form-control" value={selectedAction} onChange={handleActionChange}>
            <option value="">Select Action</option>
            <option value="changeKeys">Change Keys</option>
            <option value="assignRole">Assign Role</option>
          </select>
        </div>

        {/* Change Keys Section */}
        {selectedAction === 'changeKeys' && (
          <div className="mb-3 d-flex">
          <p className="m-2"> Keys Change </p>
            <input className="custom-input form-control" type="text" value={keys} onChange={handleKeysChange} />
          </div>
        )}

        {/* Assign Role Section */}
        {selectedAction === 'assignRole' && (
          <div className="mb-3 d-flex">
          <p className="m-2"> Assign Role </p>
            <select className="custom-input form-control" value={role} onChange={handleRoleChange}>
              <option value="">Select Role</option>
              <option value="artist">Artist</option>
              <option value="client">Client</option>
              <option value="staff">Staff</option>
            </select>
            {/* Optionally display the current role */}
            <p> current: { currentRole|| 'Not assigned'} </p>
          </div>
        )}

        <button className="custom-button btn btn-dark btn-lg btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>

        {feedbackMessage && (
          <div className={`alert ${error ? 'alert-danger' : 'alert-success'}`} role="alert">
            {feedbackMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffOperations;
