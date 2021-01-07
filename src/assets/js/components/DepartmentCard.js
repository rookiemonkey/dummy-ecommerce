import Calzada from '../main';

export default function HTMLDepartmentCard(department) {
    const { department_id, department_name, department_numProducts } = department
    const list_department = document.getElementById('department_list');
    const card = document.createElement('li');

    card.setAttribute('deptId', department_id);
    card.setAttribute('deptName', department_name);
    card.classList.add('department_list_item');

    card.innerHTML = `
            <img src="${require(`../../images/icon_${department_id}.svg`).default}" />
            ${department_name}
            <p>${department_numProducts} Items!</p>
        `

    card.onclick = event => Calzada.toDepartment(event);

    list_department.appendChild(card);
}