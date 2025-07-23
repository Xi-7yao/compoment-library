import Button from "./compoments/Button"
import './App.scss'
import { useState } from "react"

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
      <Button type="primary" loading={loading} onClick={() => setLoading(!loading)}>
        Primary Button
      </Button>
      <Button type="dashed">
        Dashed Button
      </Button>
      <Button type="text">
        Text Button
      </Button>
      <Button type="link">
        Link Button
      </Button>
    </div>
  )
}

export default App
