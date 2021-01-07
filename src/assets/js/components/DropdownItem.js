import Calzada from '../main';
import variables from '../utilities/_variables';
const { navIcons } = variables;

export default function HTMLDropDownItem(department) {
    const { department_id, department_name } = department
    const nav_dropdown = document.querySelector('.nav-dropdown');
    const dropdown_item = document.createElement('li');

    dropdown_item.setAttribute('deptId', department_id);
    dropdown_item.setAttribute('deptName', department_name);

    dropdown_item.innerHTML = `
            <span><i class="${navIcons[department_name]}"></i></span>
            ${department_name}
        `

    // mount an onclick listener
    dropdown_item.onclick = event => Calzada.toDepartment(event);

    // mount to dom
    nav_dropdown.appendChild(dropdown_item);
}