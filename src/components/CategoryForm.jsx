import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory, updateCategory } from '../redux/slices/CategorySlice';

const CategoryForm = ({ categoryToEdit, onCancel }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(categoryToEdit ? categoryToEdit.name : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = { name };
    if (categoryToEdit) {
      dispatch(updateCategory({ ...category, id: categoryToEdit.id }));
    } else {
      dispatch(addCategory(category));
    }
    setName('');
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
        required
      />
      <button type="submit">{categoryToEdit ? 'Update' : 'Add'} Category</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default CategoryForm;
