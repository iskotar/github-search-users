import React from 'react'
import { Row } from 'antd'

const SimpleModal = ({ onShow, onClose, text }) => {

  return (
    onShow &&
    <div
      className="modal-backdrop"
      style={{ backgroundColor: '#00000094' }}
      onClick={() => onClose(false)}
    >
      <div
        className="modal-body bg-white w-25"
        style={{
          margin: '20vh auto',
          borderRadius: '5px'
        }}
      >
        <Row className="justify-content-end">
          <p className="modal-close-x btn btn-sm">X</p>
        </Row>
        <div className="modal-dialog text-center">
          {text}
        </div>
      </div>
    </div>
  )
}

export default SimpleModal
