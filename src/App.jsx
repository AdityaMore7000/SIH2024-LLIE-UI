import DropZone from "./components/DropZone"
import axios from 'axios'
import  Hero  from "./components/Hero"
import ImagePreview from "./components/ImagePreview"

function App() {
  axios.get('http://localhost:8000/').then((res) => {
    console.log(res.data)
  }
  ).catch((err) => {
    console.log(err)
  } 
  )
  return (
    <>
    <section>
    <Hero />
    </section>
    <section className="mt-2 p-4 relative flex h-[80vh] gap-2 ">
    <DropZone />
    {/* <ImagePreview /> */}
    </section>
    </>
  )
}

export default App
