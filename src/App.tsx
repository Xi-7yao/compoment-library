import Button from "./compoments/Button"
import './App.scss'

function App() {
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
      <Button type="primary" size="small">
        Primary Button
      </Button>
    </div>
  )
}

export default App
