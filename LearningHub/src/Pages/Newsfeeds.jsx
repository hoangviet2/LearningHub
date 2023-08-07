import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../dashboardComponents';
import "../dashBoard/dashboard.css"

import { useState, useEffect } from 'react';

const Newsfeed = () => {
  const [editingg,setEditingg] =  useState(false);

  const [data, setData] = useState([]);
  const [selectedFeed, setSelectedFeed] = useState({});
  const [editing, setEditing] = useState(false);
  useEffect(() => {    
    fetch('https://feeds.xiganglive.vip/addpost')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    // Make a DELETE request to the API to delete the feed with the given id
    fetch(`https://feeds.xiganglive.vip/deletepost/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      // Update the state to remove the deleted feed
      setData(data.filter(item => item.id !== id));
    })
    .catch(error => console.error('Error deleting data:', error));
  };

  const handleEdit = (feed) => {
    setSelectedFeed(feed);
    setEditing(true);
  };

  const handleAdd = () => {
    setSelectedFeed({});
    setEditingg(true);
  };

  const handleSave = () => {
    setEditingg(false);
    // Make a POST or PUT request to the API to add or update the feed
    const method = selectedFeed.id ? 'PUT' : 'POST';
    const url = selectedFeed.id
      ? `https://feeds.xiganglive.vip/editpost${selectedFeed.id}`
      : 'https://feeds.xiganglive.vip/postadd';
      
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedFeed),
    })
    .then(response => response.json())
    .then(newFeed => {
      if (selectedFeed.id) {
        // Update existing feed
        setData(data.map(item => (item.id === newFeed.id ? newFeed : item)));
      } else {
        // Add new feed
        setData([...data, newFeed]);
      }
      setEditing(false);
      setSelectedFeed({});
    })
    .catch(error => console.error('Error saving data:', error));
  };

  
  return (
    <div classnameName="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="News Feed" />
   
      <h1>POSTS</h1>
      <button classname='btn btn-primary' onClick={handleAdd}>Add New Feed</button>

      {editingg && (
          <div>
          <h1>{selectedFeed.id ? 'Edit Feed' : 'Add New Feed'}</h1>
          <span>Title:</span>
          <input
            type="text"
            placeholder="Title"
            value={selectedFeed.title || ''}
            onChange={(e) => setSelectedFeed({ ...selectedFeed, title: e.target.value })}
          />
          <h2></h2>
          <span>Content:</span>
          <input
            type="text"
            placeholder="Content"
            value={selectedFeed.content || ''}
            onChange={(e) => setSelectedFeed({ ...selectedFeed, content: e.target.value })}
          />
           <h2></h2>
          <button classname="btn btn-primary" onClick={handleSave}>Save</button>
          <h2></h2>
        </div>

      )}

        <table classname='table' >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th >Action</th>
            </tr>
            </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.content}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Newsfeed;