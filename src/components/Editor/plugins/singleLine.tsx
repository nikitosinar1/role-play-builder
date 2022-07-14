import React, { useMemo } from 'react';

import { Editor, Transforms } from 'slate';

import { Plugin, RPBEditorProps } from '../types';

const singleLinePlugin = (editor: Editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      if (editor.children.length > 1) {
        Transforms.mergeNodes(editor);
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};

export const withSingleLine: Plugin = (Comp) => {
  const Wrapper = ({ editor, ...rest }: RPBEditorProps) => {
    const wrappedEditor = useMemo(() => singleLinePlugin(editor), []);

    return (
      <Comp {...rest} editor={wrappedEditor} />
    );
  };

  Wrapper.displayName = `withSingleLine(${Comp.displayName})`;

  return Wrapper;
};
