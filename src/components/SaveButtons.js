import React from 'react';
import { Button } from 'react-bootstrap';

const SaveButtons = ({ onSave, onSaveDraft, onDiscard }) => {
  return (
    <div className="save-buttons">
      <Button variant="primary" onClick={onSave}>Save</Button>
      <Button variant="secondary" onClick={onSaveDraft}>Save Draft</Button>
      <Button variant="danger" onClick={onDiscard}>Discard</Button>
    </div>
  );
};

export default SaveButtons;
