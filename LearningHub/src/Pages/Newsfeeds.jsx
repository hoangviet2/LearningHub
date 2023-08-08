import React, { useState, useEffect } from 'react';
import { Header } from '../dashboardComponents';
import "../dashBoard/dashboard.css"

const Newsfeed = () => {
  const [data, setData] = useState([]);
  const [selectedFeed, setSelectedFeed] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch('https://feeds.xiganglive.vip/api/get_posts')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    // Make a DELETE request to the API to delete the feed with the given id
    fetch(`https://feeds.xiganglive.vip/api/post_delete/${id}`, {
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
    setEditing(true);
  };

  const handleSave = () => {
    // Make a POST or PUT request to the API to add or update the feed
    const method = selectedFeed.id ? 'PUT' : 'POST';
    const url = selectedFeed.id
      ? `https://feeds.xiganglive.vip/api/post_update/${selectedFeed.id}`
      : 'https://feeds.xiganglive.vip/api/add_post';
      
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
      <button type="button" class="btn btn-outline-danger" onClick={handleAdd}>Add New Feed</button>
      {editing && (
        <div>
          <h2>{selectedFeed.id ? 'Edit Feed' : 'Add New Feed'}</h2>
          <input
            type="text"
            placeholder="Title"
            value={selectedFeed.title || ''}
            onChange={(e) => setSelectedFeed({ ...selectedFeed, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Content"
            value={selectedFeed.content || ''}
            onChange={(e) => setSelectedFeed({ ...selectedFeed, content: e.target.value })}
          />
          <button  type="button" class="btn btn-outline-success" onClick={handleSave}>Save</button>
        </div>
      )}
      <div class="container px-4">
          <table classname='table' >
        <thead>
          <tr>
            <th row mt-8 scope="col">ID</th>
            <th row mt-8 scope="col">Title</th>
            <th row mt-8 scope="col">Content</th>
            <th row mt-8 scope="col">Action</th>
          </tr>
          </thead>
      <tbody>
          {data.map(item => (
            <tr scope="col" key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.content}</td>
              <td>
                <button type="button" class="btn btn-outline-primary" onClick={() => handleEdit(item)}>Edit</button>
                <button type="button" class="btn btn-outline-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Newsfeed;