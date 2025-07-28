import Button from "./compoments/Button"
import './App.scss'
import { useState } from "react"
import { SearchOutlined } from '@ant-design/icons';

function App() {
  const [ loading, setLoading ] = useState(false);

  return (
    <div className="test">
      <Button>
        Default Button
      </Button>
      <Button disabled>
        Default Button(Disabled)
      </Button>
      <Button type="primary" disabled>
        Primary Button(Disabled)
      </Button>
      <Button type="primary">
        Primary Button
      </Button>
      <Button size="large">
        Default Button
      </Button>
      <Button size="middle" block>
        Default Button
      </Button>
      <Button type="primary" size="small" onClick={() => console.log(1)}>
        Primary Button
      </Button>
      <Button type="primary" icon={<SearchOutlined/>} loading={loading} onClick={() => setLoading(!loading)} danger iconPosition="end">
        Primary Button
      </Button>
      <Button type="dashed">
        Dashed Button
      </Button>
      <Button type="link" loading={loading} onClick={() => setLoading(!loading)} target="_blank" href="https://www.baidu.com">
        Link Button
      </Button>
      <Button type="text">
        Text Button
      </Button>
      <Button type="primary" ghost>
        Primary Button
      </Button>
      <Button type="default" ghost>
        Primary Button
      </Button>
      <Button type="dashed" ghost danger>
        Primary Button
      </Button>
    </div>
  )
}

export default App
