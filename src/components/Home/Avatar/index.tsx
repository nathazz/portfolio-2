import { useEffect, useState } from 'react';

import { getAvatar } from '../../../services/requests/github';

import ProfileAvatr from '/assets/icon/profile.png';

const Avatar = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    getAvatar()
      .then((data) => setAvatarUrl(data.avatar_url))
      .catch(() => setAvatarUrl(ProfileAvatr));
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      {avatarUrl ? (
        <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
      ) : (
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
      )}
    </div>
  );
};

export default Avatar;
