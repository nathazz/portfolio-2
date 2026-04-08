import { useState, useEffect } from 'react';
import { getAvatar } from '../../../services/requests/github';

const Avatar = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    getAvatar().then((data) => setAvatarUrl(data.avatar_url));
  }, []);

  if (!avatarUrl) return null;

  return <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />;
};

export default Avatar;
