import { useState, useEffect } from 'react';
import { getAvatar } from '../../../services/requests/github';
import ProfileAvatr from '/assets/icon/profile.png';

const Avatar = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    getAvatar().then((data) => setAvatarUrl(data.avatar_url));
  }, []);

  if (!avatarUrl) return null;

  return (
    <img src={avatarUrl ?? ProfileAvatr} alt="Profile" className="h-full w-full object-cover" />
  );
};

export default Avatar;
