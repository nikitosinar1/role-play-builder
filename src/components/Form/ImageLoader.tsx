import React, { useCallback } from 'react';

import Button, { ButtonProps } from '@mui/material/Button';

type Props = {
  onChange: (dataImg: string) => void;
  children: React.ReactNode;
  name: string;
  fullWidth?: boolean;
  sx?: ButtonProps['sx'];
};

const ImageLoader = ({
  children,
  onChange: _onChange,
  name,
  fullWidth,
  sx,
}: Props) => {
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target?.files?.[0];

    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (!result) return;
      _onChange(result as string);
    };

    reader.readAsDataURL(selectedFile);
  }, [_onChange]);

  return (
    <Button
      component="label"
      fullWidth={fullWidth}
      sx={sx}
    >
      {children}
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={onChange}
        name={name}
      />
    </Button>
  );
};

ImageLoader.displayName = 'ImageLoader';

export default ImageLoader;
