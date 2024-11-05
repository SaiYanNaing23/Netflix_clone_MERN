import React, { useEffect, useState } from 'react'
import { useContentStore } from '../store/content';
import axios from 'axios';

const useGetTrendingContent = () => {
  const [ trendingContent, setTrendingContent ] = useState(null);
  const { contentType, setContentLoadingUpdate } = useContentStore()

  useEffect(()=>{
    const getTrendingContent = async()=> {
        setContentLoadingUpdate(true)
        const res = await axios.get(`/api/v1/${contentType}/trending`)
        setTrendingContent(res.data.content)
        setContentLoadingUpdate(false)
    }
    getTrendingContent()
  }, [contentType])

  return { trendingContent }
}

export default useGetTrendingContent
