import { Button, Drawer, Table, Form, Space, Input, InputNumber, message } from 'antd';
import { useState, useEffect } from 'react';
import { getVipList, createVip, deleteVip } from '@/api/serviceApi';

export default function Home() {

  const [form] = Form.useForm();

  const [open,setOpen] = useState(false);
  const [datalist, setDatalist] = useState([]);


  const setDataList = () => {
    getVipList().then(res => {
      setDatalist(res?.data);
    })
  } 

  useEffect(()=> {
    setDataList()
  }, [])

  const handleDelete = (key: number) => {
    deleteVip({key}).then(res => {
      console.log(res);
      setDataList();
    })
  }
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      dataIndex: 'key',
      render: (key: number) => {
        return <Button onClick={() => {handleDelete(key)}} type="primary">删除</Button>
      }
    },
  ];

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  }

  const handleSubmit = () => {
    form.validateFields().then(value => {
      createVip(value).then(res => {
        console.log(res);
        message.success("新增成功")
        setOpen(false)
        setDataList();
      })
    })
  }
  
  
  return (
    <div style={{
      padding: "24px 24px",
      marginTop: "24px",
    }}>
      <Button type='primary' style={{
        position: 'absolute',
        right: 24,
      }}
        onClick = {() => {setOpen(true)}}
      >新增会员</Button>
      <Table 
        dataSource={datalist} 
        columns={columns} 
        style={{
          marginTop: '48px'
        }}
      />
      <Drawer 
        title="新增会员"
        placement='right'
        onClose={
          () => {setOpen(false)}
        }
        open={open}
        width={560}
        footer={
          <Space>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit} type="primary">
            Submit
          </Button>
        </Space>
        }
      >
        <Form
          form={form}
        >
          <Form.Item
            name={"name"}
            label="姓名"
            rules={[
              {
                required: true,
                message: '请输入姓名'
              }
            ]}
          >
            <Input  placeholder='请输入姓名' />
          </Form.Item>
          <Form.Item
            name={"age"}
            label="年龄"
            rules={[
              {
                required: true,
                message: '请输入年龄'
              }
            ]}
          >
            <InputNumber  placeholder='请输入年龄' />
          </Form.Item>

          <Form.Item
            name={"address"}
            label="住址"
            rules={[
              {
                required: true,
                message: '请输入住址'
              }
            ]}
          >
            <Input  placeholder='请输入住址' />
          </Form.Item>

        </Form>

      </Drawer>
    </div>
  )
}
