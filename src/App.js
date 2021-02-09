import './App.css'
import React, { useEffect, useState } from 'react'
import Pager from './Pager'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Octokit } from '@octokit/core'
import { Input, Button } from 'antd'
import SearchResultList from './SearchResultList'
import SimpleModal from './SimpleModal'
import Sorter from './Sorter'

const { Search } = Input

function App () {
  const octokit = new Octokit()
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [textmodal, setTextModal] = useState('')
  const [list, setList] = useState([])
  const [count, setCount] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [url, setUrls] = useState('https://github.com/search?type=users')
  const [sortOption, setSortOption] = useState('')

  useEffect(() => {
    searchQuery && getSearchResult()
  }, [sortOption, currentPage])

  const getSearchResult = async () => {
    await octokit.request('GET /search/users', {
      q: searchQuery,
      p: currentPage,
      page: currentPage,
      per_page: 10,
      sort: sortOption
    })
    .then((res) => {
      setList(res.data.items)
      setCount(res.data.total_count)
      setUrls(res.url.replace('api.github.com/search/users?', 'github.com/search?type=users&'))
    })
    .catch((err) => {
      setShowModal(true)
      setTextModal(`${err}`)
      console.error(err)
    })
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
      <Sorter onChange={setSortOption}/>
      <Button href={url} className="mt-3 mb-3">Open on GitHub: {url}</Button>
      <SearchResultList list={list} className="mb-3"/>
      <Pager
        currentPage={currentPage}
        count={count}
        onChange={setCurrentPage}
      />
      {count && <div className="mt-3">Total matches: {count}</div>}
      <SimpleModal onShow={showModal} onClose={setShowModal} text={textmodal}/>
    </div>
  )
}

export default App


