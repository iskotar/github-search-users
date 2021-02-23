import React from 'react';
import { List } from 'antd';
import ListItem from './ListItem'

const SearchResultList = (props) => {
const {list} = props

  return (
    <List
      itemLayout="horizontal"
      dataSource={list}
      renderItem={user => (
        <ListItem user={user}/>
      )}
    />
  );
};

export default SearchResultList;
