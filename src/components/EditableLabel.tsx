import React, { ChangeEvent, useState, useCallback } from 'react';
import TextField from './ui/TextField';
import Label from './ui/Label';

type Props = {
  body: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function EditableLabel({ body, onChange }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleIsEditing = useCallback(
    () => setIsEditing(isEditing => !isEditing),
    [setIsEditing]
  );
  const focusTextField = useCallback((node: HTMLInputElement | null) => {
    if (node != null) node.focus();
  }, []);

  if (isEditing) {
    return (
      <TextField
        type="text"
        value={body}
        ref={focusTextField}
        onChange={onChange}
        onBlur={toggleIsEditing}
        placeholder="label"
      />
    );
  } else {
    return <Label onClick={toggleIsEditing}>{body}</Label>;
  }
}
