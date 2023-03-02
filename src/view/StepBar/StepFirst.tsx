import "./index.less";
import { Form, Input, Select, Space } from 'antd';
import { useEffect, useState } from "react";
import { getStep1List } from '@/api/serviceApi';



const StepFirst = () => {

  const [options, setOptions] = useState<any>();

  useEffect(() => {
    getStep1List().then((res) => {
      console.log(res);
      let newArr = [];
      res.data.map((item:{id: string, name: string}) => {
        newArr.push({
          label: item.name,
          value: item.id
        })
      })
      console.log(newArr);
      
      setOptions(newArr);
    })
  }, [])

    return (
      <div className="contain">
          <Form.Item
            name={"projectName"}
            label={"请输入项目名"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"param1"}
            label={"请选择一个选项"}
          >
            <Select
              options={options}
            />
          </Form.Item>
          <Form.Item
            name={"param2"}
            label={"请选择一个选项"}
          >
            <Select 
              options={options}
            />
          </Form.Item>
          <Form.Item
            name={"label"}
            label={"请输入标签"}
          >
            <Input />
          </Form.Item>
      </div>
    )
}

export default StepFirst;