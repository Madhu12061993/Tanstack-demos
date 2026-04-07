import { useQuery } from '@tanstack/react-query'
import './App.css'


interface FetchTodos {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}
const fetchTodos = async (): Promise<FetchTodos[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  // if (!res.ok) {
  //   throw new Error('Failed to fetch todos');
  // }
  return res.json();
};

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todo'],
    queryFn: fetchTodos
  });
  if (isLoading) return <p>Loading....</p>
  if(error) return <p>Error</p>

  // if (error instanceof Error) {
  //   return <p>Error: {error.message}</p>;
  // }
  return (
    <>
      {data?.map((todo) => (
        <div key={todo.id} >
          <ul  className='list-unstyled'>
            <li>ID : {todo.id}</li>
            <li>TITLE : {todo.title}</li>
            <li>Completed : {String(todo.completed)}</li>
            <li>userId : {todo.userId}</li>
          </ul>
        </div>
      ))}
    </>
  )
}

export default App
