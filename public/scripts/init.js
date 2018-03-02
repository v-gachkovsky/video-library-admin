(function() {
  const API = 'http://localhost:9000/api'
  const selectorForFetchVideos = document.getElementById('select-course-videos');
  
  function fetchCourses() {
    axios.get(`${API}/courses`).then(({ data: courses }) => {
      const coursesList = document.getElementById('courses-list');
      coursesList.innerHTML = '';

      if (courses.length) {
        fillList(coursesList, courses);
        fillCourseSelect(courses);

        const courseId = selectorForFetchVideos.firstChild.value;
        fetchVideosOfCourse(courseId);
      } else {
        hideVideoManagement();
      }
    }).catch(err => {
      console.log('error', err);
    });
  }

  function fetchVideosOfCourse(courseId) {
    axios.get(`${API}/videos/${courseId}`).then(({ data: { videos } }) => {
      const videosList = document.getElementById('videos-list');
      videosList.innerHTML = '';

      fillList(videosList, videos);
    }).catch(error => {
      console.log('error', error);
    });
  }

  function fillList(list, entities) {
    list.innerHTML = '';
    
    entities.forEach(entity => {
      const listItem = document.createElement('li');
      const deleteIcon = document.createElement('span');

      deleteIcon.className = 'fa fa-trash delete-btn';
      
      listItem.innerHTML = `${entity.title} `;
      listItem.appendChild(deleteIcon);
      list.appendChild(listItem);

      deleteIcon.addEventListener('click', () => {
        const isVideo = !!entity.courseId
        const linkToDelete = isVideo
          ? `${API}/videos/${entity.id}` 
          : `${API}/courses/${entity.id}`;

        const answer = confirm('Вы действительно хотите удалить это?');

        if (!answer) return;

        axios.delete(linkToDelete).then(() => {
          fetchCourses();
        }).catch(error => console.log(error));
      });
    });
  }

  function fillCourseSelect(courses) {
    const select = document.getElementById('select-course');

    selectorForFetchVideos.innerHTML = '';
    select.innerHTML = '';
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
    fetchCourses();
  }

  init();

})();