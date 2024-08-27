import DropZone from "./components/DropZone"
import  Hero  from "./components/Hero"
import ImagePreview from "./components/ImagePreview"

function App() {
  return (
    <>
    <section>
    <Hero />
    </section>
    <section className="mt-2 p-4 relative flex h-[80vh] gap-2 ">
    <DropZone />
    <ImagePreview />
    </section>
    </>
  )
}

export default App
