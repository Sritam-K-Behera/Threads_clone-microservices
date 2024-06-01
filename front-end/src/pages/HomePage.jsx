import { Button, Flex, Spinner ,Box} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useShowToast from '../Hooks/useShowToast'
import Posts from "../components/Posts"
import SuggestedUsers from "../components/SuggestedUsers"
import { useRecoilState } from "recoil"
import postsAtom from "../atoms/postsAtom"

export const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [loading, setLoading] = useState(true)
  const showToast = useShowToast()
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true)
      setPosts([])
      try {
        const res = await fetch('/api/posts/feed')
        const data = await res.json()
        if (data.error) {
          showToast("Error", data.error, 'error')
        }
        // console.log(data)
        setPosts(data)
      } catch (error) {
        showToast('Error', error, 'error')
      } finally {
        setLoading(false)
      }
    }
    getFeedPosts()
  }, [showToast, setPosts])

  return (
    <Flex gap='10' alignItems={'flex-start'}>
      <Box flex={70}>
      {!loading && posts.length === 0 && <h1>Follow some users</h1>}
      {loading && (
        <Flex justify='center'>
          <Spinner size='xl' />
        </Flex>
      )}
      {posts.map((post) => (
        <Posts key={post._id} post={post} postedBy={post.postedBy} />
      ))}
      </Box>
      <Box flex={30}
      display={{
        base:'none',
        md:"block",
      }}
      >
        <SuggestedUsers />
      </Box>
    </Flex>

  )
}


export default HomePage