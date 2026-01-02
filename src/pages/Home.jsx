import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser } from '../redux/userSlice';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, setDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';

function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tickedoff'), (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(logout());
      navigate('/');
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (name.trim() === '' || genre.trim() === '') {
      alert('Name and genre cannot be empty');
      return;
    }
    try {
      const newId = uuidv4();
      await setDoc(doc(db, 'tickedoff', newId), { name, genre });
      setName('');
      setGenre('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tickedoff", id));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <div className="container">
      <h1>Welcome, {user ? (user.displayName || user.email) : 'Guest'}</h1>
      <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>

      <div className="add-form">
        <h3>Add a new item</h3>
        <form onSubmit={handleAdd}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary">Add</button>
        </form>
      </div>

      <hr />

      <div className="item-list">
        <ul>
          {items.map(item => (
            <li key={item.id} className="item">
              <strong>{item.id}</strong>
              <div>{item.name}</div>
              <div>{item.genre}</div>
              <button onClick={() => handleDelete(item.id)} className="delete-button">
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
