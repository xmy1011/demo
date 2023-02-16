import { LockOutlined, UserOutlined } from '@ant-design/icons';
import md5 from "js-md5";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { login } from '@/api/serviceApi';
import { setToken } from '@/redux/modules/golbal/action';
// import { store } from '@/redux';
import { connect } from 'react-redux'
import { HOME_URL } from '@/config/config';


const LoginForm = (props:any)=> {
  
  const { setToken } = props;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handlesubmit = () => {
    form.validateFields().then((params) => {
      params.password = md5(params.password)
      login(params).then(res => {
        console.log(res);
        if(res.data?.access_token){
          // store.dispatch(setToken(res.data.access_token)) 
          setToken(res.data.access_token)
          message.success("登录成功！");
          navigate(HOME_URL)
        }
      })
    }).catch(()=> {}); 
  }

  const handleReset = () => {
    form.resetFields();
  }

  return (
    <div>
      <Form
        form={form}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input 
            prefix={<UserOutlined className="site-form-item-icon" />} 
            placeholder="用户名：admin/user" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="密码：123456"
          />
        </Form.Item>
        <div className='loginBtns'>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handlesubmit} type="primary">Login</Button>
        </div>
      </Form>

    </div>
  )
}

// 用来建立UI组件的参数到 store.dispatch 方法的映射。
// 该方法允许我们将action 作为props 绑定到组件中，用于建立组件跟store.dispatch的映射关系，可以是一个object，也可以是一个函数
// 如果是个对象，那么每个定义在该对象上的函数，都将被当做 Redux action Creater ，对象所定义的方法名作为属性名
// 若每个方法将返回一个新的函数，函数中的dispath方法会将 action creator 的返回值作为参数执行。
const mapDispatchToProps = { setToken }

export default connect(null, mapDispatchToProps)(LoginForm);