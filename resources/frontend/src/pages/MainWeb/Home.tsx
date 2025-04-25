import Header from './NavBar/Header';
import HeroSection from './Component/HeroSection';
import Footer from './Footer/Footer';

const Home = () => {
    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            <Header />
            <main>
                <HeroSection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
