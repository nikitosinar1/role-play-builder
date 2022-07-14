import React, { useCallback } from 'react';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Descendant } from 'slate';
import { InputBaseComponentProps } from '@mui/material/InputBase';

import { createRPBEditor } from 'components/Editor/Editor';
import { compose } from 'utils';
import { withSingleLine } from 'components/Editor/plugins/singleLine';
import { withTrackers } from 'components/Editor/plugins/trackers';

const plugins = compose(withSingleLine, withTrackers);
const Editor = createRPBEditor(plugins);

type CustomEvent = { target: { value: Descendant[] | undefined; name: string } };

type RewrotenProps = {
  onChange?: (e: CustomEvent) => void;
  defaultValue?: Descendant[];
};

type EditorInputInnerProps = InputBaseComponentProps & RewrotenProps;

const EditorInputInner = ({
  onFocus: _onFocus,
  onBlur: _onBlur,
  onChange: _onChane,
  className,
  name,
  defaultValue,
}: EditorInputInnerProps) => {
  const onChange = useCallback((value: Descendant[]) => {
    if (!_onChane) return;

    if ('children' in value[0] && 'text' in value[0].children[0] && value[0].children[0].text === '') {
      _onChane({ target: { value: undefined, name } });
      return;
    }

    _onChane({ target: { value, name } });
  }, [_onChane, name]);

  const onFocus = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (_onFocus) _onFocus(event as React.FocusEvent<HTMLInputElement>);
  }, [_onFocus]);

  const onBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (_onBlur) _onBlur(event as React.FocusEvent<HTMLInputElement>);
  }, [_onBlur]);

  return (
    <Editor
      className={className}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      initialValue={defaultValue}
    />
  );
};

EditorInputInner.displayName = 'EditorInputInner';

type EditorInputProps = Omit<TextFieldProps, 'InputProps'> & RewrotenProps;

const InputProps = {
  inputComponent: EditorInputInner,
  sx: {
    '.MuiInputBase-input': {
      whiteSpace: 'pre!important',
      overflowX: 'auto',
      ml: 1.75,
      mr: 1.75,
      pl: 0,
      pr: 0,
    },
  },
} as TextFieldProps['InputProps'];

const EditorInput = (props: EditorInputProps) => (
  <TextField
    {...props}
    InputProps={InputProps}
  />
);

EditorInput.displayName = 'EditorInput';

export default EditorInput;
