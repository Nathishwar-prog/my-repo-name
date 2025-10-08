import React, { useState, useEffect } from 'react';
import { PlusCircle, XCircle, CheckCircle } from 'lucide-react';

// Main Functional Component: App
const App = () => {
  // 1. State for the list of to-do items
  const [todos, setTodos] = useState([]);
  
  // 2. State for the text input field
  const [inputTask, setInputTask] = useState('');
  
  // 3. State for custom alert/message display
  const [message, setMessage] = useState({ text: '', type: '' });

  // Custom Message Display Handler (replaces window.alert)
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    // Automatically clear the message after 3 seconds
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Function to add a new to-do item
  const handleAddTodo = () => {
    // Requirement: Show alert if input is empty
    if (inputTask.trim() === '') {
      showMessage('Please enter a task title.', 'error');
      return;
    }

    // Create the new todo item object
    const newTodo = {
      id: Date.now(), // Use timestamp as a unique ID
      title: inputTask.trim(),
      completed: false,
    };

    // Add the new todo to the list
    setTodos(prevTodos => [...prevTodos, newTodo]);
    
    // Clear the input field and show success message
    setInputTask('');
    showMessage('Task successfully added!', 'success');
  };

  // Function to toggle the completion status of a todo item
  const handleToggleComplete = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Determine the Tailwind class for the message box
  const getMessageClass = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-500';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-500';
      default:
        return 'hidden';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 font-inter">
      
      {/* Main Heading */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 mt-8 sm:text-5xl text-center">
        Assignment-2 To-Do List Application
      </h1>

      {/* Main Card Container */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl w-full max-w-2xl">
        
        {/* Custom Message/Alert Box */}
        {message.text && (
          <div className={`p-3 mb-6 rounded-lg border-l-4 font-medium ${getMessageClass(message.type)} transition-opacity duration-300`}>
            {message.type === 'error' ? <XCircle className="w-5 h-5 inline mr-2 align-text-bottom" /> : <CheckCircle className="w-5 h-5 inline mr-2 align-text-bottom" />}
            {message.text}
          </div>
        )}

        {/* Input and Add Button (Display in ROW) */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 items-stretch">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
            className="flex-grow p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 text-gray-700 shadow-md"
            aria-label="New task title"
          />
          <button
            onClick={handleAddTodo}
            className="flex items-center justify-center p-3 text-white font-semibold rounded-xl bg-indigo-600 
                       hover:bg-indigo-700 transition duration-200 shadow-lg transform hover:scale-[1.01] 
                       focus:outline-none focus:ring-4 focus:ring-indigo-300 sm:w-32"
          >
            <PlusCircle className="w-5 h-5 sm:mr-2" />
            <span className="hidden sm:inline">Add Todo</span>
          </button>
        </div>

        {/* List of To-Do Tasks */}
        <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">
          Your Tasks ({todos.length})
        </h2>
        
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 italic p-4">You have no tasks! Start adding some above.</p>
          ) : (
            todos.map(todo => (
              <div 
                key={todo.id} 
                className={`flex items-center justify-between p-4 rounded-xl shadow-md transition duration-200 
                            ${todo.completed ? 'bg-green-50 border-l-4 border-green-500' : 'bg-white border-l-4 border-indigo-500 hover:shadow-lg'}`}
              >
                <div className="flex items-center flex-grow">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                    className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    aria-label={`Mark ${todo.title} as complete`}
                  />
                  <span 
                    className={`ml-4 text-lg font-medium text-gray-800 break-words w-full 
                               ${todo.completed ? 'line-through text-gray-500 italic' : 'text-gray-900'}`}
                  >
                    {todo.title}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <p className="mt-8 text-sm text-gray-400">
        Built with React and Tailwind CSS.
      </p>

    </div>
  );
};

export default App;
