import React, { useState } from 'react';
import { Dropdown, NavItem, NavLink } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import AddCrew from './AddCrew';
import CrewSetting from './CrewSetting';

function ModalLayout({}) {
    let [tab, setTab] = useState(0);

    function TabContent() {
        if (tab === 0) return <CrewSetting />
        else if (tab === 1) return <AddCrew />
        else return <div>2</div>
      }
      
    return (
        <>
      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => setTab(0)}>
            정보
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => setTab(1)}>
            멤버
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => setTab(2)}>
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent />
        </>
    );

    
}

export default ModalLayout;