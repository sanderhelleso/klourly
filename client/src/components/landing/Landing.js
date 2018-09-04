import React, { Component } from 'react';

// import component styles
import './styles/landing.css';
import './styles/discoverMenu.css';

// import Main navigation component
import MainNav from '../navigation/main/MainNav';

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
        if ((window.scrollY + 200) > (this.state.activeSection.offsetTop + this.state.activeSection.offsetHeight)) {
            this.updateMenu(this.state.activeSection, this.state.activeMenu);
        }
    }

    updateMenu(currentSection, currentMenu) {
        console.log(this.state.menuSections.indexOf(this.state.activeMenu) + 1);
        this.setState({
            activeMenu: this.state.menuSections[this.state.menuSections.indexOf(currentMenu) + 1],
            activeSection: this.state.landingSections[this.state.landingSections.indexOf(currentSection) + 1]
        });

        for (let i = 0; i < this.state.menuSections.length; i++) {
            this.state.menuSections[i].className = 'discover-menu-section';
        }

        this.state.activeMenu.className = 'discover-menu-section active';
    }

    render() {
        return (
            <main>
                <MainNav />
                <section id="landing">
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
