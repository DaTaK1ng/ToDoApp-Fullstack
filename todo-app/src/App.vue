<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { todoApi, type Todo } from './api/todoApi'

const todoList = ref<Todo[]>([])
const inputText = ref('')
const loading = ref(false)

// 加载所有Todo
async function loadTodos() {
  try {
    loading.value = true
    todoList.value = await todoApi.getAllTodos()
  } catch (error) {
    console.error('加载Todo失败:', error)
    alert('加载Todo失败')
  } finally {
    loading.value = false
  }
}

// 添加Todo
async function addTodo() {
  if (inputText.value.trim() === '') {
    alert('请输入内容')
    return
  }

  try {
    const newTodo = await todoApi.addTodo(inputText.value)
    todoList.value.unshift(newTodo) // 添加到列表开头
    inputText.value = ''
  } catch (error) {
    console.error('添加Todo失败:', error)
    alert('添加Todo失败')
  }
}

// 切换完成状态
async function toggleTodo(todo: Todo) {
  try {
    const updatedTodo = await todoApi.updateTodo(todo._id!, !todo.completed)
    const index = todoList.value.findIndex(t => t._id === todo._id)
    if (index !== -1) {
      todoList.value[index] = updatedTodo
    }
  } catch (error) {
    console.error('更新Todo失败:', error)
    alert('更新Todo失败')
  }
}

// 删除Todo
async function deleteTodo(todo: Todo) {
  try {
    await todoApi.deleteTodo(todo._id!)
    todoList.value = todoList.value.filter(t => t._id !== todo._id)
  } catch (error) {
    console.error('删除Todo失败:', error)
    alert('删除Todo失败')
  }
}

// 格式化日期
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN')
}

// 页面加载时获取数据
onMounted(() => {
  loadTodos()
})
</script>

<template>
  <div class="app-container">
    <h1 class="title">ToDo List</h1>

    <div class="todo-container">
      <input
        class="todo-input"
        type="text"
        placeholder="Add a new thing todo"
        v-model="inputText"
        @keyup.enter="addTodo"
      >
      <button class="add-button" @click="addTodo" :disabled="loading">
        {{ loading ? 'adding...' : 'add' }}
      </button>
    </div>

    <div class="todoListContainer">
      <div v-if="loading" class="loading">loading...</div>
      <div v-else-if="todoList.length === 0" class="empty-state">
        none
      </div>
      <ul v-else>
        <li v-for="todo in todoList" :key="todo._id" class="todo-item">
          <button
            @click="toggleTodo(todo)"
            class="completed-button"
            :class="{ 'completed': todo.completed }"
          >
            {{ todo.completed ? '✓' : '○' }}
          </button>

          <div class="todo-content">
            <span :class="{ 'completed-text': todo.completed }">
              {{ todo.text }}
            </span>
            <div class="todo-time">
              create time: {{ formatDate(todo.createdAt!) }}
              <span v-if="todo.updatedAt !== todo.createdAt">
                | update time: {{ formatDate(todo.updatedAt!) }}
              </span>
            </div>
          </div>

          <button class="delete-button" @click="deleteTodo(todo)">
            delete
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  * {
  box-sizing: border-box;
}

/* 主容器 - 苹果风格 */
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 60px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 标题样式 */
.title {
  font-size: 3.5rem;
  font-weight: 300;
  color: #1d1d1f;
  margin-bottom: 60px;
  text-align: center;
  letter-spacing: -0.02em;
}

/* 输入容器 */
.todo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 60px;
  width: 100%;
  max-width: 600px;
}

/* 输入框样式 - 苹果风格 */
.todo-input {
  flex: 1;
  padding: 16px 24px;
  font-size: 1.1rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  outline: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  text-align: center;
  color: #1d1d1f;
}

.todo-input:focus {
  border-color: #007aff;
  background: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 122, 255, 0.2);
}

.todo-input::placeholder {
  color: #86868b;
  text-align: center;
}

/* 添加按钮 - 苹果风格 */
.add-button {
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
  background: linear-gradient(135deg, #007aff 0%, #0051d5 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 20px rgba(0, 122, 255, 0.3);
  min-width: 120px;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 122, 255, 0.4);
}

.add-button:active {
  transform: translateY(0);
}

.add-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Todo列表容器 */
.todoListContainer {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todoListContainer ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

/* Todo项目样式 - 苹果卡片风格 */
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  margin-bottom: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  width: 100%;
}

.todo-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
}

/* Todo内容区域 */
.todo-content {
  flex: 1;
  text-align: center;
  margin: 0 24px;
}

.todo-content span {
  font-size: 1.2rem;
  font-weight: 400;
  color: #1d1d1f;
  display: block;
  margin-bottom: 8px;
  line-height: 1.4;
}

.todo-time {
  font-size: 0.9rem;
  color: #86868b;
  font-weight: 300;
  text-align: center;
}

.completed-text {
  text-decoration: line-through;
  color: #86868b;
  opacity: 0.6;
}

/* 完成按钮 - 圆形苹果风格 */
.completed-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #d1d1d6;
  background: white;
  color: #86868b;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.completed-button:hover {
  border-color: #34c759;
  transform: scale(1.1);
}

.completed-button.completed {
  background: linear-gradient(135deg, #34c759 0%, #30d158 100%);
  border-color: #34c759;
  color: white;
  box-shadow: 0 4px 20px rgba(52, 199, 89, 0.3);
}

/* 删除按钮 - 苹果风格 */
.delete-button {
  padding: 12px 24px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #ff3b30;
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.2);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  flex-shrink: 0;
}

.delete-button:hover {
  background: rgba(255, 59, 48, 0.2);
  transform: scale(1.05);
}

/* 加载和空状态 */
.loading, .empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #86868b;
  font-size: 1.2rem;
  font-weight: 300;
}

.loading {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }

  .todo-container {
    flex-direction: column;
    gap: 20px;
  }

  .todo-input, .add-button {
    width: 100%;
    max-width: 400px;
  }

  .todo-item {
    padding: 20px;
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .todo-content {
    margin: 0;
    order: 1;
  }

  .completed-button {
    order: 0;
  }

  .delete-button {
    order: 2;
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  .app-container {
    padding: 40px 16px;
  }

  .title {
    font-size: 2rem;
  }

  .todo-item {
    padding: 16px;
  }
}
</style>

