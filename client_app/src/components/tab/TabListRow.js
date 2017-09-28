import React, {PropTypes} from 'react';

const TabListRow = ({tab, active, changeTab, deleteTab}) => {

    return (
        <li key={tab.id} className={active? "active my-tab" : "my-tab"}>
            <a
                href="" data-toggle="tab"
                aria-expanded={active? "active" : ""}
                value={tab.id}
                onClick={changeTab}>
                {tab.title?tab.title:"(Nameless)"}
            </a>
            <div className="close" onClick={deleteTab} value={tab.id}></div>
        </li>
    );
};

TabListRow.propTypes = {
    tab: PropTypes.object.isRequired,
    deleteTab: PropTypes.func
};

export default TabListRow;
