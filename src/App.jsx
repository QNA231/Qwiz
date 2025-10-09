import Quiz from "./components/Quiz"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <div className="min-h-screen w-full relative bg-white">
        {/* Cool Blue Glow Right */}
        <div
          style={{
            zIndex: 0,
            position: "absolute",
            inset: 0,
            background: "#ffffff",
            backgroundImage: `
        radial-gradient(
          circle at top right,
          rgba(70, 130, 180, 0.5),
          transparent 70%
        )
      `,
            filter: "blur(80px)",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Your Content/Components */}
        <div
          className="container"
          style={{
            height: "fit-content",
            zIndex: 10,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <h1>Qwiz it. Know more</h1>
          <Quiz />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
