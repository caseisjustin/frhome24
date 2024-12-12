import React, { useState } from 'react';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';

const App = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleAddCategory = () => {
    setIsFormVisible(true);
    setCategoryToEdit(null);
  };

  const handleEditCategory = (category) => {
    setIsFormVisible(true);
    setCategoryToEdit(category);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setCategoryToEdit(null);
  };

  return (
    <div>
      <h1>Category CRUD with Redux Toolkit</h1>
      <button onClick={handleAddCategory}>Add Category</button>
      {isFormVisible && (
        <CategoryForm categoryToEdit={categoryToEdit} onCancel={handleCancel} />
      )}
      <CategoryList />
    </div>
  );
};

export default App;
