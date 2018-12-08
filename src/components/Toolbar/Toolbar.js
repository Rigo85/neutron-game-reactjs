import React from "react";
import { NavItem, Navbar, Icon } from "react-materialize";
import "./Toolbar.css";

const Toolbar = (props) => {
    Navbar.prototype.renderSideNav = function () {
        const children = (this.props.children || []).map(child => {
            if (child.props.sidenavtext) {
                return {
                    ...child,
                    props: {
                        ...child.props,
                        children: [].concat(child.props.children, child.props.sidenavtext)
                    }
                };
            }
            return child;
        });

        return (
            <ul id="nav-mobile" className="side-nav">
                {children}
            </ul>
        );
    };

    return (
        <Navbar brand='Neutron Game' right>
            <NavItem href='/' sidenavtext="New game"><Icon>add_box</Icon></NavItem>
            <NavItem href='/' sidenavtext="Save game"><Icon>save</Icon></NavItem>
            <NavItem href='/' sidenavtext="Load game"><Icon>file_upload</Icon></NavItem>
            <NavItem href='https://en.wikipedia.org/wiki/Neutron_(game)' sidenavtext="About"><Icon>help</Icon></NavItem>
            <NavItem href='/' sidenavtext="Source code"><Icon>code</Icon></NavItem>
        </Navbar>
    );
};

export default Toolbar;
