import { useEffect, useState } from 'react'

const usePosts = () => {
  const [posts, setPosts] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('https://api.learnhub.thanayut.in.th/content')

        const data = await res.json()

        console.log(data.data)
        setPosts(data.data)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { posts, setPosts, isLoading }
}

export default usePosts
