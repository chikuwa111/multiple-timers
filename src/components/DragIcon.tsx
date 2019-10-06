import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import Button from './ui/Button';
import { MoveIcon } from './ui/Icon';

function DragIcon() {
  return (
    <Button as="i" color="gray">
      <MoveIcon />
    </Button>
  );
}

export default SortableHandle(DragIcon);
