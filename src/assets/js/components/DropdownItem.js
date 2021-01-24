import Calzada from '../main';
import variables from '../utilities/_variables';
import toToggleSideBar from '../utilities/toToggleSidebar';
const { navIcons } = variables;

export default function HTMLDropDownItem(department) {
    const { department_id, department_name } = department
    const nav_dropdown_desktop = document.querySelector('.nav-dropdown');
    const nav_dropdown_mobile = document.querySelector('.nav-dropdown-mobile');
    const dropdown_item_desktop = document.createElement('li');

    dropdown_item_desktop.setAttribute('deptId', department_id);
    dropdown_item_desktop.setAttribute('deptName', department_name);

    dropdown_item_desktop.innerHTML = `
            <span><i class="${navIcons[department_name]}"></i></span>
            ${department_name}
        `

    // clone for mobile, however, events are not included
    const dropdown_item_mobile = dropdown_item_desktop.cloneNode(true)

    // mount an onclick listeners
    dropdown_item_desktop.onclick = event =>
        Calzada.toDepartment(event);

    dropdown_item_mobile.onclick = event => {
        Calzada.toDepartment(event);
        toToggleSideBar('close');
    };

    // mount to dom for desktop/mobile
    nav_dropdown_desktop.appendChild(dropdown_item_desktop);
    nav_dropdown_mobile.appendChild(dropdown_item_mobile);
}