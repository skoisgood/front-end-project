import { useEffect, useState } from 'react'

const usePosts = () => {
  const [posts, setPosts] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('http://localhost:8000/content', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })

        const data = await res.json()

        setPosts(data.data.sort((a, b) => b.id - a.id))
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
