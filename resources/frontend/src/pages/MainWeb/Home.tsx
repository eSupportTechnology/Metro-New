import Header from './NavBar/Header';
import HeroSection from './Component/HeroSection';
import Footer from './Footer/Footer';
import Profile from './Component/Profile';
import Benefits from './Component/Benefits';

const Home = () => {
    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            <Header />
            <main>
                <HeroSection />
                <Profile />
                <Benefits />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
