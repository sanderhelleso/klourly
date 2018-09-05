import React, { Component } from 'react';

// import component styles
import './styles/landing.css';
import './styles/discoverMenu.css';

// import Main navigation component
import MainNav from '../navigation/main/MainNav';

// global to keep track if user scrolls down or up
let previousPosition = window.pageYOffset || document.documentElement.scrollTop;
export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
          menuSections: null,
          landingSections: null,
          activeMenu: null,
          activeSection: null
        };

        // bind function to class
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        const menuSections = Array.from(document.querySelectorAll('.discover-menu-section'));
        const landingSections = Array.from(document.querySelectorAll('section'));

        // set initial state of landing page
        this.setState({ 
            menuSections: menuSections,
            landingSections: landingSections,
            activeMenu: menuSections[0],
            activeSection: landingSections[0]
        });
        
        // add scroll event
        window.addEventListener('scroll', this.handleScroll);
    }

    // remove scroll event on umount
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    
    handleScroll() {

        let down = true;

        if (previousPosition > currentPosition) {
            down = false;
        }
        
        else {
            down = true;
        }

        previousPosition = currentPosition;

        // variables to keep state, shorten down names
        const menuItems = this.state.menuSections;
        const sections = this.state.landingSections;

        // current position of page
        let currentPosition = window.pageYOffset || document.documentElement.scrollTop;

        if ((currentPosition + 200) < (sections[0].offsetTop + sections[0].offsetHeight)) {
            this.setState({
                activeMenu: menuItems[0],
                activeSection: sections[0]
            });
        }

        else if ((currentPosition + 200) < (sections[1].offsetTop + sections[1].offsetHeight)) {
            this.setState({
                activeMenu: menuItems[1],
                activeSection: sections[1]
            });
        }

        else if ((currentPosition + 200) < (sections[2].offsetTop + sections[2].offsetHeight)) {
            this.setState({
                activeMenu: menuItems[2],
                activeSection: sections[2]
            });
        }

        else if ((currentPosition) < (sections[3].offsetTop + sections[3].offsetHeight)) {
            this.setState({
                activeMenu: menuItems[3],
                activeSection: sections[3]
            });
        }

        // remove old style of menu items
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].className = 'discover-menu-section animated';
        }

        // update current menu item with active class
        this.state.activeMenu.className = 'discover-menu-section active animated fadeIn';
    }

    render() {
        return (
            <main>
                <MainNav />
                <section id="landing">
                    <div className="container">
                        <div className="row">
                            <div className="col l6 m6 s12">
                                <h1 id="landing-heading" className="long-shadow">Create.<br />Simplify.<br />Control.<br /></h1>
                            </div>
                            <div className="col l6 m6 s12">
                                <img id="mockup" className="z-depth-5" src="../img/mockup.png" alt="mockup" />
                            </div>
                        </div>
                    </div>
                    <div id="discover-menu">
                        <ul>
                            <li id="prev">Prev</li>
                            <li className="discover-menu-section active">01</li>
                            <li className="discover-menu-section">02</li>
                            <li className="discover-menu-section">03</li>
                            <li className="discover-menu-section">04</li>
                            <li id="next">Next</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2>Section One</h2>
                </section>
                <section>
                    <h2>Section Two</h2>
                </section>
                <section>
                    <h2>Section Three</h2>
                </section>
            </main>
        )
    }
}
