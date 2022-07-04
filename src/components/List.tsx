import React, { useCallback, useState } from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListMUI from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

type Item = {
  name: string;
  label: string;
  iconRight?: React.ReactNode;
  children?: Item[];
};

type ListItemCb = (item: Item) => void;

type ListItemProps = {
  item: Item;
  onClick?: ListItemCb;
};

const ListItem = ({ item, onClick: _onClick }: ListItemProps) => {
  const [open, setOpen] = useState(false);

  const onClick = useCallback(() => {
    if (item.children) setOpen((state) => !state);
    if (_onClick) _onClick(item);
  }, [item, _onClick]);

  return (
    <>
      <ListItemButton onClick={onClick}>
        <ListItemText>{item.label}</ListItemText>
        {!item.children && item.iconRight}
        {item.children && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>

      <Divider />

      {item.children && (
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
        <List
          items={item.children}
          onListItemClick={_onClick}
          _deep
        />
      </Collapse>
      )}
    </>
  );
};

ListItem.displayName = 'ListItem';

type ListProps = {
  items: Item[];
  onListItemClick?: ListItemCb;
  _deep?: boolean;
};

const sxDefault = {
  ml: -2,
  mr: -2,
  mt: -2,
};

const sxDeep = { pl: 2 };

const List = ({ items, onListItemClick, _deep }: ListProps) => (
  <ListMUI sx={_deep ? sxDeep : sxDefault} disablePadding={_deep}>
    {items.map((item) => (
      <ListItem
        key={item.name}
        item={item}
        onClick={onListItemClick}
      />
    ))}
  </ListMUI>
);
List.displayName = 'List';

export default List;
