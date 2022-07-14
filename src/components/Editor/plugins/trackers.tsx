import React, {
  createContext, useCallback, useContext, useMemo, useState,
} from 'react';

import {
  Descendant, Editor, Range, Transforms,
} from 'slate';
import {
  ReactEditor, RenderElementProps, useFocused, useSelected,
} from 'slate-react';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';

import Tracker from 'core/Tracker';
import { RPBEditorProps, Plugin } from '../types';

const LINE_HEIGHT = 24;
const ITEM_HEIGHT = 32;

const TrackersPluginContext = createContext<Tracker[]>([]);

const PaperProps = {
  style: {
    maxHeight: ITEM_HEIGHT * 5,
    minWidth: 150,
  },
};

const MenuListProps = {
  dense: true,
  disablePadding: true,
};

const trackersPlugin = (editor: Editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => (element.type === 'tracker' ? true : isInline(element));

  editor.isVoid = (element) => (element.type === 'tracker' ? true : isVoid(element));

  return editor;
};

const TrackerRender = ({ attributes, element, children }: RenderElementProps) => {
  const selected = useSelected();
  const focused = useFocused();

  if (element.type !== 'tracker') return null;

  return (
    <span {...attributes} contentEditable={false}>
      {children}
      <Chip
        component="span"
        color="primary"
        label={element.name}
        variant={focused && selected ? 'filled' : 'outlined'}
        size="small"
        sx={{ userSelect: 'none' }}
      />
    </span>
  );
};

TrackerRender.displayName = 'TrackerRender';

export const withTrackers: Plugin = (Comp) => {
  const Wrapper = ({
    editor: _editor,
    renderElement: _renderElement,
    onChange: _onChange,
    onKeyDown: _onKeyDown,
    ...rest
  }: RPBEditorProps) => {
    const trackers = useContext(TrackersPluginContext);
    const editor = useMemo(() => trackersPlugin(_editor), []);
    const [search, setSearch] = useState<{ range: Range; word: string } | null>(null);

    const items = useMemo(() => {
      if (!search) return [];
      return trackers.filter((i) => i.name.startsWith(search.word));
    }, [search, trackers]);

    const anchorPosition = useMemo(() => {
      if (!search) return { top: 0, left: 0 };
      const domRange = ReactEditor.toDOMRange(editor, search.range);
      const rect = domRange.getBoundingClientRect();
      return {
        top: rect.top + window.scrollX + LINE_HEIGHT,
        left: rect.left + window.scrollY,
      };
    }, [search]);

    const renderElement = useCallback((props: RenderElementProps) => {
      if (props.element.type === 'tracker') return <TrackerRender {...props} />;
      return _renderElement(props);
    }, [_renderElement]);

    const onChange = useCallback((value: Descendant[]) => {
      const { selection } = editor;

      if (selection && Range.isCollapsed(selection)) {
        const start = Editor.start(editor, selection);
        const blockStart = Editor.before(editor, start, { unit: 'block' });
        const range = blockStart && Editor.range(editor, blockStart, start);
        const beforeText = range && Editor.string(editor, range);
        const beforeMatch = beforeText && beforeText.match(/@([A-z]+)$/);

        if (beforeMatch) {
          const wordLength = beforeMatch[1].length + 1;
          const wordStart = { ...start, offset: start.offset - wordLength };
          const wordRange = Editor.range(editor, wordStart, start);
          setSearch({ range: wordRange, word: beforeMatch[1] });
        } else {
          setSearch(null);
        }
      }

      _onChange(value);
    }, [_onChange]);

    const onItemClick = useCallback((tracker: Tracker) => {
      if (!search) return;
      Transforms.select(editor, search.range);
      Transforms.insertNodes(editor, [{ text: '' }, {
        type: 'tracker',
        name: tracker.name,
        children: [{ text: '' }],
      }, { text: '' }]);
      Transforms.move(editor);
      setSearch(null);
    }, [search]);

    const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
      if (search) {
        switch (event.key) {
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            if (items[0]) onItemClick(items[0]);
            break;
          case 'Escape':
            event.preventDefault();
            setSearch(null);
            break;
          default: break;
        }
      }

      _onKeyDown(event);
    }, [search, _onKeyDown]);

    const onMenuClose = useCallback(() => setSearch(null), []);
    const onMouseDown = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => e.preventDefault(),
      [],
    );

    return (
      <>
        <Comp
          {...rest}
          editor={editor}
          renderElement={renderElement}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />

        <Menu
          open={anchorPosition && Boolean(items.length)}
          anchorPosition={anchorPosition}
          anchorReference="anchorPosition"
          onClose={onMenuClose}
          autoFocus={false}
          disableAutoFocus
          onMouseDown={onMouseDown}
          PaperProps={PaperProps}
          MenuListProps={MenuListProps}
        >
          {items.map((i) => (
            <MenuItem key={i.name} onClick={() => onItemClick(i)}>
              <ListItemText>{i.name}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  Wrapper.displayName = `withTrackers(${Comp.displayName})`;

  return Wrapper;
};
