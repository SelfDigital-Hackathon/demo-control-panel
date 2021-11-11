import logo from './logo.svg';
import './App.css';
import React, { Component,useEffect, useRef } from 'react';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import { Table, Tag,Input, Button, Space } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';

function App() {

  useEffect(() => {
    document.title = "Control Panel";  
  }, []);

  const columns = [
    {
      title: 'Dátum',
      dataIndex: 'date',
      key: 'date',
      render: text => <a>{text}</a>,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Meno',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Adresa',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Rodné číslo',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Číslo občianskeho',
      dataIndex: 'document_id',
      key: 'document_id',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'Daňový doklad') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
            <Button
            type="default"
            //onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            //onClick={handlePrint()}
            icon={<PrinterOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tlač
          </Button>
        </Space>
      ),
    },
  ];

  // PCR, AG, Daňový doklad, Príjem
  const data = [
    {
      date : '11/11/2011 9:20',
      name: 'William Brown',
      address: 'New York No. 1 Lake Park',
      id: '211111/2232',
      document_id: '2312783213217321',
      tags: ['Daňový doklad', 'AG'],
    },
    {
      date : '11/11/2011 11:20',
      name: 'Filip Green',
      address: 'Bratislava, Ružinov, Opálková 99',
      id: '211111/2242',
      document_id: '2312783213217321',
      tags: ['Daňový doklad', 'PCR'],
    },
    {
      date : '11/11/2011 15:20',
      name: 'Adam Red',
      address: 'Bratislava, Staré mesto, XY 22',
      id: '211111/2252',
      document_id: '2312783213217321',
      tags: ['Daňový doklad', 'Príjem'],
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  const componentRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="App" ref={componentRef}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/selfdigitalmini.png"
              width="35"
              height="40"
              className="d-inline-block align-middle"
            />{' '}
            <code >Control Panel</code>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Card>
        <Card.Body>
          <div className="table" style={{'marginTop' : '1%'}}>
            <Container>
              <Card.Title style={{'textAlign':'left'}} >ID Stanoviska - Mlynská dolina</Card.Title>
              <Table columns={columns} dataSource={data} onChange={onChange} />
            </Container>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
