import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../dashboardComponents';
import "../dashBoard/dashboard.css"

import { useState, useEffect } from 'react';

const botChat = () => {
  const [editingg,setEditingg] =  useState(false);

  const [data, setData] = useState([]);
  const [selectedFeed, setSelectedFeed] = useState({});
  const [editing, setEditing] = useState(false);
  useEffect(() => {    
    fetch('https://feeds.xiganglive.vip/chatbot')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []) ; }