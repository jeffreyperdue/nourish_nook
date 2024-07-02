// src/components/Tom.js
import React from 'react';
import './Tom.css';

const Tom = () => {
  return (
    <div className="tom-container">
      <div className="tom-body">
        <div className="tom-head">
          <div className="tom-eyes">
            <div className="tom-eye">
              <div className="tom-pupil"></div>
            </div>
            <div className="tom-eye">
              <div className="tom-pupil"></div>
            </div>
          </div>
          <div className="tom-mouth"></div>
          <div className="tom-leaves">
            <div className="tom-leaf leaf1"></div>
            <div className="tom-leaf leaf2"></div>
            <div className="tom-leaf leaf3"></div>
          </div>
        </div>
        <div className="tom-arms">
          <div className="tom-arm left">
            <div className="tom-hand">
              <div className="finger"></div>
              <div className="finger"></div>
              <div className="finger"></div>
              <div className="finger"></div>
              <div className="finger"></div>
            </div>
          </div>
          <div className="tom-arm right">
            <div className="tom-hand">
              <div className="finger"></div>
              <div className="finger"></div>
              <div className="finger"></div>
              <div className="finger"></div>
              <div className="finger"></div>
            </div>
          </div>
        </div>
        <div className="tom-legs">
          <div className="tom-leg">
            <div className="tom-foot">
              <div className="toe"></div>
              <div className="toe"></div>
              <div className="toe"></div>
              <div className="toe"></div>
              <div className="toe"></div>
            </div>
          </div>
          <div className="tom-leg">
            <div className="tom-foot">
              <div className="toe"></div>
              <div className="toe"></div>
              <div className="toe"></div>
              <div className="toe"></div>
              <div className="toe"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tom;
