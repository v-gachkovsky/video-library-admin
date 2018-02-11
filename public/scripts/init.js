(function() {
  const API = 'http://localhost:9000/api'
  
  function fetchCourses() {
    axios.get(`${API}/courses`).then(({ data: courses }) => {
      console.log('courses', courses);
      const coursesList = document.getElementById('courses-list');

      if (courses.length) {
        fillList(coursesList, courses);
        fillCourseSelect(courses);
      } else {
        hideVideoManagement();
      }
    }).catch(err => {
      console.log('error', err);
    });
  }

  function fetchVideos() {
    axios.get(`${API}/videos`).then(({ data: videos }) => {
      console.log('videos', videos);
      const videosList = document.getElementById('videos-list');

      fillList(videosList, videos);
    }).catch(err => {
      console.log('error', err);
    });
  }  

  function fillList(list, entities) {
    entities.forEach(entity => {
      const listItem = document.createElement('li');

      listItem.innerHTML = entity.title;
      list.appendChild(listItem);
    });
  }

  function fillCourseSelect(courses) {
    const select = document.getElementById('select-course');

    courses.forEach(course => {
      const option = document.createElement('option');
      option.innerHTML = course.title;
      option.value = course.id;

      select.appendChild(option);
    });
  }

  function hideVideoManagement() {
    const videoManagement = document.getElementById('video-management');
    videoManagement.className = 'hidden';
  }

  function init() {
    fetchVideos();
    fetchCourses();
  }

  init();

})();