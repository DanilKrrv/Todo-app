
import { useEffect, useState } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import lightBackgroundImage from "./assets/bg-desktop-light.jpg";
import darkBackgroundImage from "./assets/bg-desktop-dark.jpg";
import Header from './Components/Header';
import InputButton from './Components/inputButton';
import { v4 } from 'uuid';
import { addTodo, deleteTodo, fetchTodos, markTodoCompleted, countCompletedTodos, clearAllCompletedTodos, getActiveTodos, getCompletedTodos } from './actions/index.js';
import TodoList from './Components/TodoList.jsx';
import StatusBar from './Components/StatusBar.jsx';



function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [itemLeft, setItemLeft] = useState(0);

  const handleAddTodo = async (e) => {
    if (todo && e.keyCode == 13) {
      const newTodo = {
        id: v4(),
        title: todo,
        isCompleted: false,
      };

      await addTodo(newTodo);
      setTodos(await fetchTodos());
      setTodo('');

    };
  };

  const handleCompletedTodo = async (id) => {
    await markTodoCompleted(id);
    countCompletedTodos().then((count) => setItemLeft(count));
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(await fetchTodos());
  };

  const handleClearAllTodo = async () => {
    await clearAllCompletedTodos();
    fetchTodos().then((data) => {
      setTodos(data);
    });
  };

  const handleAllClick = async () => {
    fetchTodos().then((data) => {
      setTodos(data);
    });
  };

  const handleActiveClick = async () => {
    getActiveTodos().then(todos => setTodos(todos));
  };

  const handleCompletedClick = async () => {
    getCompletedTodos().then(todos => setTodos(todos))
  };

  useEffect(() => {
    fetchTodos().then((data) => {
      setTodos(data);
    });
  }, []);

  useEffect(() => {
    countCompletedTodos().then((count) => setItemLeft(count));
  }, [])

  return (
    <>
      <Box
        backgroundImage={colorMode == 'light' ?
          lightBackgroundImage :
          darkBackgroundImage}
        backgroundSize={"cover"}
        h={"40vh"}
      >
        <Box w={{ base: '80%', md: '60%', lg: '40%' }} p='4em 0' m='auto'>
          <Header colorMode={colorMode} toggleColorMode={toggleColorMode} />
          <InputButton
            colorMode={colorMode}
            todo={todo}
            setTodo={setTodo}
            addTodo={handleAddTodo}
          />
        </Box>
      </Box>
      <Box
        h={'60vh'}
        backgroundSize={'cover'}
        background={'#242424'}
        position={'relative'}
      >
        <Box minW={'100%'} m={'auto'} position={'absolute'} top={'-10'}>
          <Box w={{ base: '80%', md: '60%', lg: '40%' }} m={'auto'}>
            <Box maxH={'50vh'} overflowY={'auto'} borderRadius={'10px'} backgroundColor={colorMode == 'light' ? "white" : '#1a202c'} >
              <TodoList
                todos={todos}
                colorMode={colorMode}
                handleCompletedTodo={handleCompletedTodo}
                handleDeleteTodo={handleDeleteTodo}
                setTodos={setTodos}
              />
              <StatusBar
                colorMode={colorMode}
                itemLeft={itemLeft}
                handleClearAllTodo={handleClearAllTodo}
                handleAllClick={handleAllClick}
                handleActiveClick={handleActiveClick}
                handleCompletedClick={handleCompletedClick}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default App;
