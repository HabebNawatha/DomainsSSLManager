import '../assets/HomePageStyle.css';
import CustomizedButton from '../components/ui/CustomizedButton';
export default function HomePage() {
    return (
        <div className="home-page-container">
            <div className="home-page-introduction-container">
                <h1 className="home-page-inroduction-h1">Simplify SSL Certificate Management </h1>
                <h1>Easy Links, Simple as It Gets!</h1>
                <div className="home-page-link-container">
                    <input className="home-page-input-field" placeholder="Enter your Domain URL" />
                    <CustomizedButton buttonText='Submit' />
                </div>
            </div>
        </div>
    )
}