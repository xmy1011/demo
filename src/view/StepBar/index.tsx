import React, { useState } from 'react';
import { Button, message, Steps, theme, Form } from 'antd';
import StepFirst from './StepFirst';
import StepSecond from './StepSecond';


const Step = () => {

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const [form] = Form.useForm();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = [
    {
      key: 'first',
      title: "请选择和填写"
    },
    {
      key: 'Second',
      title: "请选择和填写2"
    },
]

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div style={{
      padding: "48px",
    }}>

      <Steps current={current} items={items}/>
      
      <div style={contentStyle}>
        <Form
          form={form}
          layout={"vertical"}
        >
          {
            current === 0 && <StepFirst />
          }
          {
            current === 1 && <StepSecond />
          }
        </Form>
      </div>
      
      <div style={{ marginTop: 24 }}>
        {current < 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  )
}

export default Step;
