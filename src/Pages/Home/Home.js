import { Link } from 'react-router-dom';

import './Home.css';
import HeroImg from '../../assets/imgs/hero.webp';

const Home = () => {
    return (
        <main>
            <div className='container'>
                <div className='section-hero row'>
                    <div className='title-hero align-self-center col-lg-6 col-sm-12'>
                        <h1>
                            Transform Tasks into Triumphs with
                            <span>To-Do List!</span>
                        </h1>
                        <h3>
                            Boost productivity with our intuitive to-do list
                            app. Organize tasks, set priorities, and achieve
                            your goals effortlessly.
                        </h3>
                        <Link to='/login'>Log in</Link>
                    </div>
                    <div className='hero-img col-lg-6 col-sm-12'>
                        <img src={HeroImg} alt='heroImage' />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
