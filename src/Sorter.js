import React from 'react'
import { Radio, Row } from 'antd'

const Sorter = ({ onChange }) => {

  return (
    <Row className="mt-3">
      <div className="p-1 mr-2">Sort By:</div>
      <Radio.Group
        defaultValue=""
        buttonStyle="solid"
        onChange={(e) => onChange(e.target.value)}
      >
        <Radio.Button value="followers">Followers</Radio.Button>
        <Radio.Button value="repositories">Repositories</Radio.Button>
        <Radio.Button value="joined">Joined</Radio.Button>
      </Radio.Group>
    </Row>
  )
}

export default Sorter
