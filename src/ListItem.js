import React from 'react';
import { List, Avatar } from 'antd';

const ListItem = ({user}) => {
  console.log(user)
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={user.avatar_url} />}
        title={<a href={user.html_url}>{user.login}</a>}
        description=""
      />
    </List.Item>
  );
};

export default ListItem;
