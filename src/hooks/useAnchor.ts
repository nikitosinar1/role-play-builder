import React, { useCallback, useState } from 'react';

const useAnchor = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpen = Boolean(anchorEl);

  const onClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const onClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    isOpen,
    onClick,
    onClose,
    anchorEl,
  };
};

export default useAnchor;
