// app/profile/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [username, setUsername] = useState(session?.user.name || '');
  const [profilePic, setProfilePic] = useState(session?.user.image || '');

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Save the updated profile data (e.g., call API to update the profile)
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-[#F28179]">Profile</h1>
      <div className="mt-6">
        <div className="flex items-center space-x-4">
          <img src={profilePic || '/default-profile.jpg'} alt="Profile Picture" className="w-24 h-24 object-cover rounded-full" />
          <label htmlFor="profile-image" className="sr-only">Select Profile Picture</label>
          <input id="profile-image" type="file" accept="image/*" onChange={handleProfilePicChange} className="file-input" title="Select profile picture" placeholder="Select profile picture" />
        </div>
        <div className="mt-4">
          <label className="text-lg">Username</label>
          <input
            id="username-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            title="Username"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button onClick={handleSaveProfile} className="mt-6 bg-[#F28179] text-white p-2 rounded">
          Save Profile
        </button>
      </div>
    </div>
  );
}
