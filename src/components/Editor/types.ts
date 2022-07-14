import React from 'react';

import { BaseEditor, Descendant, Editor } from 'slate';
import { ReactEditor } from 'slate-react';
import { RenderElementProps } from 'slate-react/dist/components/editable';

export type CustomText = { text: string };

export type Variable = {
  type: 'tracker';
  name: string;
  children: CustomText[];
};

export type PlainText = {
  type: 'plain-text';
  children: Descendant[];
};

export type CustomElement = Variable | PlainText;

export type CustomEditor = BaseEditor & ReactEditor;

export type RPBEditorProps = {
  editor: Editor;
  onChange: (value: Descendant[]) => void;
  onKeyDown: Exclude<React.TextareaHTMLAttributes<HTMLDivElement>['onKeyDown'], undefined>;
  renderElement: (props: RenderElementProps) => JSX.Element;
  initialValue: Descendant[];
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  className?: string;
};

export type Plugin = (
  Component: React.FunctionComponent<RPBEditorProps>
) => React.FunctionComponent<RPBEditorProps>;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
