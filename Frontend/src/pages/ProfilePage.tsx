import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import '../assets/styles/ProfilePageStyle.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LineSeparator from '../components/ui/LineSeparator';
import CustomisedButton from '../components/ui/CustomisedButton';
import api from '../services/api';

export default function ProfilePage() {
  const { user } = useUser();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEdit = (action: 'edit' | 'cancel' | 'save') => {
    if (action === 'edit') {
      setEditMode(!editMode);
    } else if (action === 'cancel') {
      setEditMode(false);
    } else if (action === 'save') {
      const updateUser = async () => {
        setLoading(true);
        try {
          const updatedUser = {
            name: username,
            email: email,
            password: currPassword,
          };
          const response = await api.put(`/users/${user?.userId}`, updatedUser);
          if (response.status === 200) {
            console.log('User updated successfully');
            setEditMode(false)
          }
        } catch (err) {
          console.error('Error updating user: ', err);
        } finally {
          setLoading(false);
        }
      };
      updateUser();
    }
  };
  useEffect(() => {
    if (user) {
      setUsername(user.name);
      setEmail(user.email);
    }
  }, [user]);


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='profile-first-section'>
        <AccountCircleOutlinedIcon sx={{ fontSize: "9rem" }} />
        <strong>{user.name}</strong>
      </div>
      <LineSeparator />
      <div className='profile-info-section'>
        <div className="grid-item label">Username</div>
        <div className="grid-item value">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={editMode ? "input-field editable" : "input-field"}
            readOnly={!editMode}
          />
        </div>
        <div className="separator"></div>

        <div className="grid-item label">Email</div>
        <div className="grid-item value">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={editMode ? "input-field editable" : "input-field"}
            readOnly={!editMode}
          />
        </div>
        <div className="separator"></div>
        {editMode ? (<>
          <div className="grid-item label">Current Password</div>
          <div className="grid-item value">
            <input
              type="password"
              onChange={(e) => setCurrPassword(e.target.value)}
              className={editMode ? "input-field editable" : "input-field"}
              readOnly={!editMode}
            />
          </div>
          <div className="separator"></div>

          <div className="grid-item label"> New Password</div>
          <div className="grid-item value">
            <input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              className={editMode ? "input-field editable" : "input-field"}
              readOnly={!editMode}
            />
          </div>
        </>
        ) : (<></>)}

      </div>
      <LineSeparator />
      <div className='profile-btn-section'>
        {!loading ? (
          <>
            {editMode ? (
              <>
                <CustomisedButton onClick={() => handleEdit('save')}>Save Changes</CustomisedButton>
                <button className="cancel-profile-edit" onClick={() => handleEdit('cancel')}>Cancel</button>
              </>
            ) : (
              <CustomisedButton onClick={() => handleEdit('edit')}>Edit Profile</CustomisedButton>
            )}
          </>
        ) : (
          <>
          <div> Loading ... </div>
          </>
        )}

      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
}
