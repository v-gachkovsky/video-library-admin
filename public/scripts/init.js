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

  function fetchVideosOfCourse(courseId) {
    axios.get(`${API}/videos/${courseId}`).then(({ data }) => {
      const videosList = document.getElementById('videos-list');

      fillList(videosList, data.videos);
    }).catch(error => {
      console.log('error', error);
    });
  }

  function fillList(list, entities) {
    list.innerHTML = '';
    
    entities.forEach(entity => {
      const listItem = document.createElement('li');
      const deleteIcon = document.createElement('i');

      deleteIcon.className = 'fa fa-trash delete-btn';
      
      listItem.innerHTML = `${entity.title} `;
      listItem.appendChild(deleteIcon);
      list.appendChild(listItem);

      deleteIcon.addEventListener('click', () => {
        const linkToDelete = entity.courseId
          ? `${API}/videos/${entity.id}` 
          : `${API}/courses/${entity.id}`;

        axios.delete(linkToDelete).then(() => {
          location.reload();
        });
      });
    });
  }

  function fillCourseSelect(courses) {
    const select = document.getElementById('select-course');
    const selectorForFetchVideos = document.getElementById('select-course-videos');

    courses.forEach(course => {
      const option = document.createElement('option');
      option.innerHTML = course.title;
      option.value = course.id;

      const clone = option.cloneNode(true);
      select.appendChild(option);
      selectorForFetchVideos.appendChild(clone);
    });

    selectorForFetchVideos.addEventListener('change', () => {
      fetchVideosOfCourse(selectorForFetchVideos.value);
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