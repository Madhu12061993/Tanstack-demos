import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import './App.css'


interface FetchTodos {
  id: number;
  userId: number;
  title: string;
  body: string;
}
const fetchTodos = async (): Promise<FetchTodos[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  // if (!res.ok) {
  //   throw new Error('Failed to fetch todos');
  // }
  return res.json();
};

const FetchPosts = async (newpost: Omit<FetchTodos, 'id'>): Promise<FetchTodos> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newpost),
  });
  return res.json();
};
function App() {
  const queryclient = useQueryClient();
  const { data, isLoading, error } = useQuery<FetchTodos[]>({
    queryKey: ['posts'],
    queryFn: fetchTodos
  });

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: FetchPosts ,
    onSuccess:() => {
      queryclient.invalidateQueries({
        queryKey:['posts']
      });
    }
  })
  if (isLoading) return <p>Loading....</p>
  if (error || isError) return <p>Error</p>

  // if (error instanceof Error) {
  //   return <p>Error: {error.message}</p>;
  // }
  return (
    <>
      {isPending && <p>DATA IS BEING ADDED... </p>}
      {isSuccess && <p>Success....</p>}


      <button onClick={() => mutate({
        userId: 5000,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit hallo posts",
        body: "This is the body of this post"
      })
      }>
        Add Post
      </button>


      {data?.map((todo) => (
        <div key={todo.id} >
          <ul className='list-unstyled'>
            <li><strong>ID : {todo.id}</strong></li>
            <li><strong>TITLE : {todo.title}</strong></li>
            <p>Body : {todo.body}</p>
          </ul>
        </div>
      ))}
    </>
  )
}

export default App
