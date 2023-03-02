
import "./index.less";
import { useState } from  "react";
import { TimePicker, Form, Upload, message } from 'antd';
import type { Dayjs } from 'dayjs';
import { RcFile } from 'antd/lib/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import {  LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { upload } from '@/api/serviceApi';


const StepSecond = () => {

  const [value, setValue] = useState<Dayjs | null>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<UploadFile>();

  const onChange = (time: Dayjs) => {
    setValue(time);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    setFile(file);
    return true;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file as RcFile);
    setLoading(true);
    // You can use any AJAX library you like
    upload(formData).then(res => {
      console.log(res?.res);
      setImageUrl("http://localhost:8080/images/"+res.res)
      setLoading(false);
    })
  };

  return (
    <div className="contain">
      <Form.Item
        label="开始时间"
        name="startTime"
      >
        <TimePicker value={value} onChange={onChange} />
      </Form.Item>
      <Form.Item name="filename"  noStyle>
        <Upload
          name="file"
          listType="picture-card"
          showUploadList={false}
          customRequest={handleUpload}
          beforeUpload={beforeUpload}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>
    </div>
  )
}

export default StepSecond;