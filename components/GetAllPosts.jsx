
import SinglePost from './SinglePost';
import fetchPosts from "@/utils/postsRequest"

const GetAllPosts = async () => {

  // const [posts, setPosts] = useState()

  // useEffect(() => {
  //   const getPosts = async() => {
  //   const res = await fetch("/api/posts")
  //   const data = await res.json()
  //   console.log(data)
  //   if(res.status === 200 ){
  //     setPosts(data)
  //   }
  //   }
  //   getPosts()
  // },[])

  const posts = await fetchPosts()
  const sortedPosts = posts.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );

return (
  <div className="w-full max-w-[680px] mx-auto mt-4">
      {sortedPosts.map((post) => (
        <SinglePost post={post} key={post._id} />
      ))}
    </div>
  )
}

export default GetAllPosts
