(function () {
  const API = 'http://localhost:9000/api';
  let selectedUserId = null;
  let allCourses = [];

  function fetchUsers() {
    axios.get(`${API}/users`).then(({ data: { users } }) => {
      const usersList = document.getElementById('users-list');
      usersList.innerHTML = '';

      if (users.length) {
        fillUsersList(usersList, users);
      } else {
        hideCourseManagement();
      }
    }).catch(err => {
      console.log('error', err);
    });
  }

  function fetchCourses() {
    axios.get(`${API}/all-courses`).then(({ data: courses }) => {
      allCourses = courses;
      const coursesList = document.getElementById('courses-list');
      coursesList.innerHTML = '';

      if (courses.length) {
        fillCoursesList(coursesList, courses);
      }
    }).catch(err => {
      console.log('error', err);
    });
  }

  function fetchUserCourses(id) {
    axios.get(`${API}/courses/${id}`).then(({ data: { courses } }) => {
      initialActiveCoursesForUser(courses);
    }).catch(err => {
      console.log('error', err);
    });
  }

  function fillUsersList(list, entities) {
    list.innerHTML = '';

    entities.forEach(entity => {
      const listItem = document.createElement('li');

      listItem.innerHTML = `${entity.firstName} ${entity.lastName} <br /> ${entity.email} `;
      listItem.addEventListener('click', () => {
        selectedUserId = entity.id;
        applyStylesForSelectedUser(listItem, list);
        fetchUserCourses(entity.id);
      });
      list.appendChild(listItem);
    });
  }

  function fillCoursesList(list, entities) {
    list.innerHTML = '';

    entities.forEach(entity => {
      const listItem = document.createElement('li');

      listItem.innerHTML = `${entity.title} `;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      listItem.appendChild(checkbox);

      list.appendChild(listItem);
    });
  }


  function applyStylesForSelectedUser(item, list) {
    list.childNodes.forEach(listItem => {
      listItem.className = '';
    });

    item.className = 'active-user';
  }

  function hideCourseManagement() {
    const courseManagement = document.getElementById('course-management');
    courseManagement.className = 'hidden';
  }

  function initialActiveCoursesForUser(courses) {
    const coursesList = document.getElementById('courses-list');
    coursesList.innerHTML = '';

    console.log('allCourses', allCourses);

    allCourses.forEach(c => {
      const listItem = document.createElement('li');

      listItem.innerHTML = `${c.title} `;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = c.id;
      checkbox.addEventListener('click', toggleCourseToUser);

      listItem.appendChild(checkbox);

      coursesList.appendChild(listItem);

      courses.forEach(userCourse => {
        if (userCourse.id === c.id) {
          checkbox.checked = true;
        }
      });
    });
  }

  function toggleCourseToUser({ target: { checked: isChecked, value: courseId } }) {
    axios.post(`${API}/courses/${selectedUserId}`, { courseId, isChecked }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    })
  }

  fetchUsers();
  fetchCourses();
})();