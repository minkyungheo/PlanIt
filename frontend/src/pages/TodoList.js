import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Container,PageTitle, Button, Input, Textarea, FormGroup, EmptyState } from '../styles/CommonComponents';
import {
  GuestNotice,
  TodoFormCard,
  TodosContainer,
  TodoCard,
  TodoHeader,
  TodoCheckbox,
  TodoTitle,
  TodoContent,
  TodoFooter,
  TodoActions,
  TodoEditForm,
} from './TodoListStyles';

const TodoList = () => {
  const { token, user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, [token]);

  const fetchTodos = async () => {
    if (token) {
      try {
        const response = await axios.get('/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const localTodos = localStorage.getItem('guestTodos');
        if (localTodos) {
          setTodos(JSON.parse(localTodos));
        }
      } catch (error) {
        console.error('Failed to load local todos:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const saveToLocalStorage = (todosList) => {
    localStorage.setItem('guestTodos', JSON.stringify(todosList));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (token) {
      try {
        const response = await axios.post('/api/todos', {
          title,
          content,
          completed: false,
        });
        setTodos([response.data, ...todos]);
        setTitle('');
        setContent('');
      } catch (error) {
        alert(error.response?.data?.error || 'Todo 생성에 실패했습니다');
      }
    } else {
      const newTodo = {
        id: Date.now(),
        title,
        content,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const newTodos = [newTodo, ...todos];
      setTodos(newTodos);
      saveToLocalStorage(newTodos);
      setTitle('');
      setContent('');
    }
  };

  const handleUpdate = async (id) => {
    if (token) {
      try {
        const response = await axios.put(`/api/todos/${id}`, {
          title: editTitle,
          content: editContent,
        });
        setTodos(todos.map(todo => todo.id === id ? response.data : todo));
        setEditingId(null);
        setEditTitle('');
        setEditContent('');
      } catch (error) {
        alert(error.response?.data?.error || 'Todo 수정에 실패했습니다');
      }
    } else {
      const updatedTodos = todos.map(todo => 
        todo.id === id 
          ? { ...todo, title: editTitle, content: editContent, updatedAt: new Date().toISOString() }
          : todo
      );
      setTodos(updatedTodos);
      saveToLocalStorage(updatedTodos);
      setEditingId(null);
      setEditTitle('');
      setEditContent('');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    if (token) {
      try {
        await axios.delete(`/api/todos/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
      } catch (error) {
        alert(error.response?.data?.error || 'Todo 삭제에 실패했습니다');
      }
    } else {
      // 게스트 모드: 로컬 스토리지에서 삭제
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      saveToLocalStorage(updatedTodos);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    if (token) {
      // 로그인된 경우: 서버에 업데이트
      try {
        const todo = todos.find(t => t.id === id);
        const response = await axios.put(`/api/todos/${id}`, {
          title: todo.title,
          content: todo.content,
          completed: !completed,
        });
        setTodos(todos.map(t => t.id === id ? response.data : t));
      } catch (error) {
        alert(error.response?.data?.error || '상태 변경에 실패했습니다');
      }
    } else {
      // 게스트 모드: 로컬 스토리지에 업데이트
      const updatedTodos = todos.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !completed, updatedAt: new Date().toISOString() }
          : todo
      );
      setTodos(updatedTodos);
      saveToLocalStorage(updatedTodos);
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditContent(todo.content || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Container>
          <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container>
        <PageTitle>Todo List</PageTitle>

        {!token && (
          <GuestNotice>
            <p>
              💡 게스트 모드로 사용 중입니다. 로그인하시면 데이터가 서버에 저장되어 어디서나 접근할 수 있습니다.
            </p>
          </GuestNotice>
        )}
        <TodoFormCard>
          <h2>새 Todo 추가</h2>
          <form onSubmit={handleCreate}>
            <FormGroup>
              <Input
                type="text"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Textarea
                placeholder="내용 (선택사항)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="3"
              />
            </FormGroup>
            <Button type="submit" primary>
              추가
            </Button>
          </form>
        </TodoFormCard>

        <TodosContainer>
          {todos.length === 0 ? (
            <EmptyState>Todo가 없습니다. 새로운 Todo를 추가해보세요!</EmptyState>
          ) : (
            todos.map(todo => (
              <TodoCard key={todo.id} completed={todo.completed}>
                {editingId === todo.id ? (
                  <TodoEditForm>
                    <Input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      required
                    />
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows="3"
                    />
                    <TodoActions>
                      <Button onClick={() => handleUpdate(todo.id)} primary>
                        저장
                      </Button>
                      <Button onClick={cancelEdit}>
                        취소
                      </Button>
                    </TodoActions>
                  </TodoEditForm>
                ) : (
                  <>
                    <TodoHeader>
                      <TodoCheckbox
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(todo.id, todo.completed)}
                      />
                      <TodoTitle completed={todo.completed}>{todo.title}</TodoTitle>
                    </TodoHeader>
                    {todo.content && <TodoContent>{todo.content}</TodoContent>}
                    <TodoFooter>
                      <span>
                        생성: {new Date(todo.createdAt).toLocaleString('ko-KR')}
                      </span>
                      {todo.updatedAt !== todo.createdAt && (
                        <span>
                          수정: {new Date(todo.updatedAt).toLocaleString('ko-KR')}
                        </span>
                      )}
                    </TodoFooter>
                    <TodoActions>
                      {token && (
                        <Button
                          onClick={() => navigate(`/todos/${todo.id}/history`)}
                        >
                          수정이력
                        </Button>
                      )}
                      <Button onClick={() => startEdit(todo)}>
                        수정
                      </Button>
                      <Button onClick={() => handleDelete(todo.id)} danger>
                        삭제
                      </Button>
                    </TodoActions>
                  </>
                )}
              </TodoCard>
            ))
          )}
        </TodosContainer>
      </Container>
    </>
  );
};

export default TodoList;

