import './App.css'
import React, { useState } from 'react'
import Pager from './Pager'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Octokit } from '@octokit/core'
import { Input, Button } from 'antd'
import SearchResultList from './SearchResultList'

const { Search } = Input

function App () {
  const octokit = new Octokit()
  const [searchQuery, setSearchQuery] = useState('')

  const [list, setList] = useState([])
  const [count, setCount] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [url, setUrls] = useState('https://github.com/search?type=users')

  const getSearchResult = async (page) => {

    await octokit.request('GET /search/users', {
      q: searchQuery,
      p: page,
      page: page,
      per_page: 10
    })
    .then((res) => {
      setList(res.data.items)
      setCount(res.data.total_count)
      setUrls(res.url.replace('api.github.com/search/users?', 'github.com/search?type=users&'))
    })
    .catch((err) => console.error(err))
  }

  const onChange = selectedPage => {
    setCurrentPage(selectedPage)
    getSearchResult(selectedPage)
  }

  return (
    <div className="App">
      <Search
        placeholder="enter github user name"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={getSearchResult}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mt-3 text-left"
      />
      <Button href={url} className="mt-3 mb-3">Open on GitHub: {url}</Button>
      <SearchResultList list={list} className="mb-3"/>
      <Pager
        currentPage={currentPage}
        count={count}
        onChange={onChange}
      />
      {count && <div className="mt-3">Total count: {count}</div>}
    </div>
  )
}

export default App
