import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'https://localhost/shoppinglist/';

function App() {
  const [itemDesc, setItemDesc] = useState('');
  const [itemAmount, setItemAmount] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      })
  }, [])

  function add(e) {
    e.preventDefault();
    const json = JSON.stringify({description:itemDesc, amount:itemAmount});
    axios.post(URL + 'add.php', json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setItems(items => [...items, response.data]);
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'remove.php', json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      const tempList = items.filter((item) => item.id !== id);
      setItems(tempList);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    })
  }

  return (
    <div>
      <form onSubmit={add}>
        <p>Add item</p>
        <label>Item description </label>
        <input value={itemDesc} onChange={e => setItemDesc(e.target.value)}></input>
        <input type='number' value={itemAmount} onChange={e => setItemAmount(e.target.value)}></input>
        <button>Add</button>
      </form>
      <p>Shopping list</p>
      <ol>
        {items.map(item => (
          <li key={item.id}>
            {item.description}, {item.amount}kpl
            <a href='#' className='remove' onClick={() => remove(item.id)}>remove</a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
