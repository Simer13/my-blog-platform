import Header from '../components/Header'
import Hero from '../components/Hero'
import Blog from '../components/Blog'
import Featured from '../components/Featured'
import Bento from '../components/Bento'
import About from '../pages/About'
import Footer from '../components/Footer'


export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Blog />
      <Featured />
      <Bento />
      <About />
      <Footer />
    </div>
  );
}
