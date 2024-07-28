import React, { useState, useEffect } from "react";
import { useAction, useUser } from "@gadgetinc/react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api";
import Chip from "@material-ui/core/Chip";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const UserOperations = () => {
  const navigate = useNavigate();
  const user = useUser(api);
  const [keys, setKeys] = useState([{ handle: "", shopId: "" }]);
  const [name, setName] = useState("");
  const [acc, setAcc] = useState("");
  const [{ data, loading, error }, updateUser] = useAction(api.user.update);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newKey, setNewKey] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const validKeys = keys.filter(key => key.handle.trim() && key.shopId.trim());

  const shops = [
    { value: "57144868925", label: "YNM" },
    { value: "62983274690", label: "YNE" },
  ];

	useEffect(() => {
		setName(user?.firstName || "");
		const initialKeys = Array.isArray(user?.keys)?user.keys:[{handle: "",shopId: "",},];
		setKeys(initialKeys);
    setAcc(user?.account);
	}, [user]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = ''; // Standard for most browsers
      }
    };

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [hasUnsavedChanges]);


  const handleNavigate = (path) => {
		navigate(path);
	};

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    // Optionally clear newKey or any temporary states when toggling edit mode
  };

const handleInputChange = (event, index, field) => {
  if (field === "name") {
    // If the change is for the name field
    setName(event.target.value);
    setHasUnsavedChanges(true);
  } else {
    // If the change is for keys
    const updatedKeys = keys.map((key, keyIndex) => {
      if (index === keyIndex) {
        return { ...key, [field]: event.target.value };
      }
      return key;
    });
    setKeys(updatedKeys);
    setHasUnsavedChanges(true);
  }
};


  const handleAddKey = () => {
    // Set default structure for newKey with an empty tag and default shopId
    if (!newKey) {
      setNewKey({ handle: "", shopId: shops[0].value });
    }
  };

  const confirmAddKey = () => {
    if (newKey && newKey.handle.trim() && newKey.shopId) {
      setKeys([...keys, newKey]);
      setNewKey(null); // Reset after adding
    }
  };

const handleDeleteKey = (index) => () => {
  console.log(`Deleting key at index: ${index}`); // Debug log
  setKeys((currentKeys) => currentKeys.filter((_, i) => i !== index));
};

const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  
  // Validate form data here if needed (e.g., name is not empty)
  if (!name.trim()) {
    setFeedbackMessage("Name cannot be empty.");
    return; // Exit if validation fails
  }
  
  // Prepare the data for submission
  const updatedUserData = {
    id: user.id, // Assuming user ID is stored in user state
    firstName: name,
    keys: validKeys, // Use the filtered validKeys for submission
    account: acc,
  };
  
  try {
    // Use the updateUser action or a similar API call to submit the data
    const result = await updateUser(updatedUserData);
    
    // Check if the API call was successful
    if (result && !error) {
      setHasUnsavedChanges(false);
      setFeedbackMessage("User settings updated successfully!");
      setIsEditing(false); // Optionally exit editing mode after successful update
    } else {
      // Handle case where API call doesn't throw an error, but fails
      setFeedbackMessage("Failed to update user settings. Please try again.");
    }
  } catch (err) {
    console.error('Error updating user settings:', err);
    // Handle errors that throw exceptions
    setFeedbackMessage("An error occurred while updating user settings.");
  }
};

  return (
    <div className="rounded-container vw-70 dash-outer">
        <h1 className="form-title mb-4 text-center">User Settings</h1>
        <form onSubmit={handleSubmit} className="mb-3 mw-80">

            {/* Name field */}
          <div className="d-flex justify-content-around align-items-center">
          <p className="w-25 font-weight-bolder "> Name </p>
          <input
            className={` w-75 form-control mb-2 ${isEditing ? '' : 'read-only'}`}
            type="text"
            value={name}
            onChange={(e) => handleInputChange(e, null, "name")}
            readOnly={!isEditing}
            style={isEditing ? {} : { background: 'lavender', cursor: 'text' }}
          />
          </div>

            {/* Display Account Type */}
          <div className="d-flex justify-content-around align-content-center">
            <p className="w-25 font-weight-bolder"> Role </p>
            {(acc === "artist" || acc === "client") ? (
              <select
                className={`w-75 form-control mb-2`}
                value={acc}
                onChange={(e) => setAcc(e.target.value)}
                disabled={!isEditing}
                style={isEditing ? {} : { background: 'lavender', cursor: 'text' }}
              >
                <option value="artist">Artist</option>
                <option value="client">Client</option>
              </select>
            ) : (
              // Display for staff members, where the account type cannot be changed
              <div className="w-75 form-control mb-2" style={{ background: 'lavender', cursor: 'not-allowed' }}>
                {/* Display "Staff" with the StarIcon for staff members */}
                {acc === "staff" ? <span> <StarIcon style={{ verticalAlign: 'middle' }}/> Staff <StarIcon style={{ verticalAlign: 'middle' }}/></span> : acc}
              </div>
            )}
          </div>

          {/* Tags/Chips */}
          <div className="d-flex justify-content-around align-items-left  ">
            <p className="w-25 font-weight-bolder "> Keys </p>
            <div className="d-flex flex-wrap w-75 form-control mb-2">
            {validKeys.length > 0 ? (
              validKeys.map((key, index) => {
                const { label, Icon } = shops.find(shop => shop.value === key.shopId) || {};
                const chipClass = label === "YNM" ? "chip ynm-chip" : "chip yne-chip";
                return (
                <Chip
                  key={index}
                  icon={shops.find(shop => shop.value === key.shopId)?.label === "YNM" ? <WbSunnyIcon /> : <NightsStayIcon />}
                  label={`${key.handle} (${shops.find(shop => shop.value === key.shopId)?.label})`}
                  onDelete={isEditing ? handleDeleteKey(index) : null}
                  className={chipClass}
                  deleteIcon={isEditing ? <HighlightOffIcon /> : undefined}
                  style={isEditing ? {} : { background: 'lavender'}}
                
                />
              );
            })
          ) : <p >No keys. Click Edit to add!</p>}
          </div>
          </div>

          {/* New Key Form */}
          {isEditing && newKey &&(
            <div className="custom-form-2">
              <input
                type="text"
                placeholder="Tag"
                value={newKey?.handle || ''}
                onChange={(e) => setNewKey({ ...newKey, handle: e.target.value })}
                className="form-control m-1"
              />
              <select
                className="form-control m-1"
                value={newKey?.shopId || shops[0].value}
                onChange={(e) => setNewKey({ ...newKey, shopId: e.target.value })}
              >
                {shops.map((shop, index) => (
                  <option key={index} value={shop.value}>{shop.label}</option>
                ))}
              </select>
              <button type="button" className="btn btn-success m-1" onClick={confirmAddKey}>
                <CheckCircleIcon />
              </button>
            </div>
          )}

          {isEditing && !newKey && (
            <button type="button" className="btn btn-dark border m-1 " onClick={handleAddKey}>+ Add</button>
          )}

          <div className="d-flex justify-content-center align-items-center mt-3">
						<button
							type="button"
							className="btn btn-dark border m-1"
							onClick={toggleEditMode}>
							{isEditing ? "Cancel" : "Edit"}
						</button>
						{isEditing && (
							<button
                type="submit"
                className={`btn ${hasUnsavedChanges ? 'btn-warning' : 'btn-dark'} border m-1`}
              >
                Save Changes
              </button>
						)}
						{!isEditing && (
							<button
								onClick={() => handleNavigate("/signed-in")}
								className="btn btn-dark border m-1">
								Back
							</button>
						)}
					</div>
        </form>
        
        {feedbackMessage && (
          <div className={`alert ${error ? 'alert-danger' : 'alert-success'}`} role="alert">
            {feedbackMessage}
          </div>
        )}
    </div>
  );
};

export default UserOperations;
