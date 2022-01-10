
import Textfield from '@atlaskit/textfield'
import Button from '@atlaskit/button'
import Todos from './components/Todos';
import { useState ,useCallback,useEffect} from 'react';
import {v4} from 'uuid';

const  TODO_APP_STORAGE_KEY='TODO_APP';
function App() {
  const [todos, setTodos] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(()=>{
   const storage = localStorage.getItem(TODO_APP_STORAGE_KEY);
   if(storage){
     setTodos(JSON.parse(storage));
   }
  },[]);

  useEffect(()=>{
    localStorage.setItem(TODO_APP_STORAGE_KEY,JSON.stringify(todos));
  },[todos]
  );

  const onTextInputChange =useCallback((e)=>{
    setTextInput(e.target.value);
  },[]);

  const onAddClick =useCallback((e)=>{
    setTodos([...todos,{id: v4(), name: textInput,isComplete: false}]);
    setTextInput("");
  },[textInput,todos]);

  const onCheckClick= useCallback((id)=>{
    setTodos((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);


  return (
    <><h3>danh sach todolist</h3>
    <Textfield
     name='add-todo' 
     placeholder='add new todo' 
     elemAfterInput={
     <Button
      isDisabled={!textInput} 
      appearance ='primary' 
      onClick={onAddClick}
      >
        add
      </Button>
    }
    css={{ padding: "2px 4px 2px" }}
    value={textInput}
    onChange={onTextInputChange}
    ></Textfield>
    <Todos todos={todos} onCheckClick={onCheckClick}/>
    </>
  );
}

export default App;
