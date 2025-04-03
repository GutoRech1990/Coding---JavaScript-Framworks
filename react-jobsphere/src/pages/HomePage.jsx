import Hero from "../components/Hero";
import Carts from "../components/Carts";
import JoblistItem from "../components/JoblistItem";

const HomePage = () => {
    return <div>
        <Hero />
        <Carts />
        <JoblistItem isHome="true" />
    </div>;
};

export default HomePage;
