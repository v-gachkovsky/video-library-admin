(function() {
  const API = 'http://localhost:9000/api';

  function createVideo() {
    const title = document.getElementById('video-title-input').value;
    const description = document.getElementById('video-description-input').value;
    const videoCode = document.getElementById('video-id-input').value;
    const courseId = document.getElementById('select-course').value;

    if (!title || !videoCode || !courseId) return;

    axios.post(`${API}/videos`, { title, description, videoCode, courseId }).then(({ data: result }) => {
      console.log('video added');

      if (result.success) {
        location.reload();
      }
    }).catch(err => {
      console.log('error', err);
    });
  }

  function createCourse() {
    const title = document.getElementById('course-title-input').value;
    const description = document.getElementById('course-description-input').value;

    if (!title) return;

    axios.post(`${API}/courses`, { title, description }).then(({ data: result }) => {
      console.log('course added');

      if (result.success) {
        location.reload();
      }
    }).catch(err => {
      console.log('error', err);
    });
  }

  const addVideoButton = document.getElementById('add-video-btn');
  const addCourseButton = document.getElementById('add-course-btn');

  addVideoButton.addEventListener('click', createVideo);
  addCourseButton.addEventListener('click', createCourse);

})();