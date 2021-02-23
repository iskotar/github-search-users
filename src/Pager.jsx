import React from 'react'
import { Pagination } from 'antd'

const Pager = (props) => {
  const { onChange, currentPage, count } = props

  if (!count) return null

  return (
    <Pagination
      total={count > 1000 ? 1000 : count}
      pageSize={10}
      current={currentPage}
      showSizeChanger={false}
      onChange={(selectedPage) => onChange(selectedPage)}
      hideOnSinglePage={true}
      showQuickJumper
      showLessItems
    />
  )
}

export default Pager
