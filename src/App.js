import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'https://localhost/shoppinglist/';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      })
  }, [])

  return (
    <div>
      <ol>
        {items.map(item => (
          <li key={item.id}>
            {item.description} {item.amount}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
