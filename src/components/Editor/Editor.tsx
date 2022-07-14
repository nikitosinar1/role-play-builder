import React, { useMemo } from 'react';

import {
  Slate, Editable, withReact, DefaultElement, RenderElementProps,
} from 'slate-react';
import { createEditor, Descendant } from 'slate';

import { compose } from 'utils';

import { RPBEditorProps, Plugin } from './types';
import { withSingleLine } from './plugins/singleLine';
import { withTrackers } from './plugins/trackers';

const RPBEditor = ({
  editor: _editor,
  onChange,
  onKeyDown,
  renderElement,
  className,
  onFocus,
  onBlur,
  initialValue,
}: RPBEditorProps) => {
  const editor = useMemo(() => withReact(_editor), []);

  return (
    <Slate
      onChange={onChange}
      editor={editor}
      value={initialValue}
    >
      <Editable
        onKeyDown={onKeyDown}
        renderElement={renderElement}
        className={className}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </Slate>
  );
};

RPBEditor.displayName = 'RPBEditor';

export const createRPBEditor = (
  plugins: Plugin = (x) => x,
): React.FunctionComponent<Partial<RPBEditorProps>> => {
  const Comp = plugins(RPBEditor);
  const defaultCb = () => {};
  const defaultEditor = createEditor();
  const defaultRenderElement = (props: RenderElementProps) => <DefaultElement {...props} />;

  const defaultValue: Descendant[] = [{
    type: 'plain-text',
    children: [{ text: '' }],
  }];

  const Wrapper = ({ initialValue, ...rest }: Partial<RPBEditorProps>) => (
    <Comp
      editor={defaultEditor}
      onChange={defaultCb}
      onKeyDown={defaultCb}
      renderElement={defaultRenderElement}
      initialValue={initialValue || defaultValue}
      {...rest}
    />
  );

  Wrapper.displayName = `create(${Comp.displayName})`;

  return Wrapper;
};

const plugins = compose(withSingleLine, withTrackers);

export default createRPBEditor(plugins);
