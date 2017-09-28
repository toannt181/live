import React, {PropTypes} from 'react';

const TabRoomRow = ({tab, active, changeTab}) => {

    return (
        <li key={tab.id} className={active? "active" : ""}>
            <a
                href="" data-toggle="tab"
                aria-expanded={active? "active" : ""}
                value={tab.id}
                onClick={changeTab}>
                {tab.title}
            </a>

        </li>
    );
};

TabRoomRow.propTypes = {
    tab: PropTypes.object.isRequired
};

export default TabRoomRow;
