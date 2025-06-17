import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const initTodos = () => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  };

  const [todos, setTodos] = useState(initTodos);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!title.trim() || !desc.trim()) {
      alert("Please fill in both title and description!");
      return;
    }
    let sno = todos.length === 0 ? 1 : todos[todos.length - 1].sno + 1;
    const myTodo = { 
      sno, 
      title: title.trim(), 
      desc: desc.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, myTodo]);
    setTitle("");
    setDesc("");
  };

  const deleteTodo = (todoToDelete) => {
    setTodos(todos.filter((todo) => todo !== todoToDelete));
  };

  const toggleComplete = (todoToToggle) => {
    setTodos(todos.map(todo => 
      todo.sno === todoToToggle.sno 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  // Inline styles for modern design
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    },
    header: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '20px 0',
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: 'white',
      margin: 0,
      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    },
    time: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '14px',
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '32px 24px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      marginBottom: '32px',
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transition: 'transform 0.3s ease',
      cursor: 'default',
    },
    statCardHover: {
      transform: 'translateY(-5px)',
    },
    statLabel: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '8px',
    },
    statValue: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: 'white',
      margin: '8px 0',
    },
    statSubtext: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '12px',
    },
    addSection: {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '32px',
      marginBottom: '32px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
    },
    inputGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: 'white',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: 'white',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s ease',
      resize: 'none',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
    },
    addButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      color: 'white',
      fontWeight: '600',
      padding: '16px 24px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    },
    filterContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      marginBottom: '24px',
    },
    filterButton: {
      padding: '12px 24px',
      borderRadius: '25px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
    },
    filterActive: {
      background: 'white',
      color: '#667eea',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      transform: 'scale(1.05)',
    },
    filterInactive: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
    },
    todoList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    todoCard: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s ease',
      cursor: 'default',
    },
    todoCardHover: {
      transform: 'translateY(-2px)',
      background: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    },
    todoContent: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
    },
    checkbox: {
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      border: '2px solid rgba(255, 255, 255, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      flexShrink: 0,
      marginTop: '4px',
    },
    checkboxCompleted: {
      background: '#10b981',
      borderColor: '#10b981',
      color: 'white',
    },
    todoText: {
      flex: 1,
    },
    todoTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '8px',
    },
    todoTitleCompleted: {
      textDecoration: 'line-through',
      color: 'rgba(255, 255, 255, 0.6)',
    },
    todoDesc: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '12px',
      lineHeight: '1.5',
    },
    todoDescCompleted: {
      textDecoration: 'line-through',
      color: 'rgba(255, 255, 255, 0.5)',
    },
    todoMeta: {
      fontSize: '12px',
      color: 'rgba(255, 255, 255, 0.6)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    deleteButton: {
      padding: '12px',
      color: '#ef4444',
      background: 'rgba(239, 68, 68, 0.2)',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '16px',
    },
    emptyState: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '48px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    emptyIcon: {
      fontSize: '64px',
      marginBottom: '16px',
      animation: 'bounce 2s infinite',
    },
    emptyTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '8px',
    },
    emptyText: {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    progressSection: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '24px',
      marginTop: '32px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
    },
    progressBar: {
      width: '100%',
      height: '12px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '6px',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)',
      borderRadius: '6px',
      transition: 'width 0.5s ease',
    },
    footer: {
      textAlign: 'center',
      marginTop: '64px',
    },
    footerCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}> Todo List</h1>
          <div style={styles.time}>
            {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        </div>
      </header>

      <div style={styles.main}>
        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={styles.statLabel}>Total Tasks</div>
            <div style={styles.statValue}>{todos.length}</div>
            <div style={styles.statSubtext}>📋 All your tasks</div>
          </div>
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={styles.statLabel}>Completed</div>
            <div style={{...styles.statValue, color: '#10b981'}}>{completedCount}</div>
            <div style={styles.statSubtext}>✅ Well done!</div>
          </div>
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={styles.statLabel}>Pending</div>
            <div style={{...styles.statValue, color: '#fbbf24'}}>{pendingCount}</div>
            <div style={styles.statSubtext}>⏳ Keep going!</div>
          </div>
        </div>

        {/* Add Todo Section */}
        <div style={styles.addSection}>
          <h2 style={styles.sectionTitle}>
            <span style={{marginRight: '12px'}}>✍️</span>
            Add New Task
          </h2>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done? "
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Add some details... 📝"
              rows="3"
              style={styles.textarea}
              onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
            />
          </div>
          <button
            onClick={addTodo}
            style={styles.addButton}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1.02)'}
          >
            + Add Task   
            
          </button>
        </div>

        {/* Filter Buttons */}
        <div style={styles.filterContainer}>
          {[
            { key: "all", label: "All Tasks", count: todos.length, emoji: "📋" },
            { key: "pending", label: "Pending", count: pendingCount, emoji: "⏳" },
            { key: "completed", label: "Completed", count: completedCount, emoji: "✅" }
          ].map((filterType) => (
            <button
              key={filterType.key}
              onClick={() => setFilter(filterType.key)}
              style={{
                ...styles.filterButton,
                ...(filter === filterType.key ? styles.filterActive : styles.filterInactive)
              }}
              onMouseEnter={(e) => {
                if (filter !== filterType.key) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== filterType.key) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                }
              }}
            >
              <span style={{marginRight: '8px'}}>{filterType.emoji}</span>
              {filterType.label} ({filterType.count})
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div style={styles.todoList}>
          {filteredTodos.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                {filter === "all" ? "📝" : filter === "completed" ? "🎉" : "⏳"}
              </div>
              <h3 style={styles.emptyTitle}>
                {filter === "all" ? "No tasks yet!" : `No ${filter} tasks`}
              </h3>
              <p style={styles.emptyText}>
                {filter === "all" 
                  ? "Add your first task above to get started! 🚀" 
                  : filter === "completed"
                  ? "Complete some tasks to see them here! "
                  : "All tasks are completed! Great job! "}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.sno}
                style={styles.todoCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={styles.todoContent}>
                  <button
                    onClick={() => toggleComplete(todo)}
                    style={{
                      ...styles.checkbox,
                      ...(todo.completed ? styles.checkboxCompleted : {})
                    }}
                    onMouseEnter={(e) => {
                      if (!todo.completed) {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!todo.completed) {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                        e.target.style.background = 'transparent';
                      }
                    }}
                  >
                    {todo.completed && '✓'}
                  </button>
                  <div style={styles.todoText}>
                    <h3 style={{
                      ...styles.todoTitle,
                      ...(todo.completed ? styles.todoTitleCompleted : {})
                    }}>
                      {todo.title}
                    </h3>
                    <p style={{
                      ...styles.todoDesc,
                      ...(todo.completed ? styles.todoDescCompleted : {})
                    }}>
                      {todo.desc}
                    </p>
                    <div style={styles.todoMeta}>
                      <span>📅 {new Date(todo.createdAt).toLocaleDateString()}</span>
                      <span>🕐 {new Date(todo.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      {todo.completed && <span style={{color: '#10b981'}}>✅ Completed</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo)}
                    style={styles.deleteButton}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(239, 68, 68, 0.3)';
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Progress Bar */}
        {todos.length > 0 && (
          <div style={styles.progressSection}>
            <div style={styles.progressHeader}>
              <span style={{color: 'white', fontWeight: '500'}}>Progress</span>
              <span style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                {Math.round((completedCount / todos.length) * 100)}%
              </span>
            </div>
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progressFill,
                  width: `${(completedCount / todos.length) * 100}%`
                }}
              />
            </div>
            <p style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', marginTop: '12px', margin: '12px 0 0 0'}}>
              {completedCount} of {todos.length} tasks completed
            </p>
          </div>
        )}

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerCard}>
            <p style={{color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 8px 0'}}>
              Made with ❤️ • {todos.length} total tasks • {completedCount} completed
            </p>
            <p style={{color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', margin: 0}}>
              Stay productive and achieve your goals! ✨
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -10px, 0);
          }
          70% {
            transform: translate3d(0, -5px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
        
        input::placeholder, textarea::placeholder {
          color: rgba(255, 255, 255, 0.6) !important;
        }
      `}</style>
    </div>
  );
};

export default TodoApp;